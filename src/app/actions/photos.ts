'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getPhotos() {
  const supabase = await createClient()
  // Fetch photos with category name
  const { data, error } = await supabase
    .from('photos')
    .select(`
      *,
      categories (
        nom
      )
    `)
    .order('date_creation', { ascending: false })

  if (error) {
    console.error('Error fetching photos:', error)
    throw new Error(error.message)
  }

  return data
}

export async function uploadPhoto(formData: FormData) {
  const files = formData.getAll('file') as File[]
  const category_id = formData.get('category_id') as string
  const texte_alternatif = formData.get('texte_alternatif') as string

  if (!files || files.length === 0 || !category_id) {
    throw new Error('Le fichier et la catégorie sont requis')
  }

  const supabase = await createClient()
  
  for (const file of files) {
    if (file.size === 0) continue

    // 1. Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('galerie')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      throw new Error(uploadError.message)
    }

    // 2. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('galerie')
      .getPublicUrl(filePath)

    // 3. Insert record into database
    const { error: insertError } = await supabase.from('photos').insert({
      category_id,
      url: publicUrl,
      texte_alternatif: texte_alternatif || null,
    })

    if (insertError) {
      console.error('Error inserting photo to database:', insertError)
      await supabase.storage.from('galerie').remove([filePath])
      throw new Error(insertError.message)
    }
  }

  revalidatePath('/admin')
  revalidatePath('/')
}

export async function deletePhoto(id: string, fileUrl: string) {
  const supabase = await createClient()
  
  // 1. Delete record from database
  const { error: dbError } = await supabase.from('photos').delete().eq('id', id)

  if (dbError) {
    console.error('Error deleting photo from database:', dbError)
    throw new Error(dbError.message)
  }

  // 2. Delete file from storage
  // Extract path from public URL. E.g. https://<project>.supabase.co/storage/v1/object/public/galerie/filename.jpg
  // This simplistic approach assumes the URL ends with the file path
  const urlParts = fileUrl.split('/galerie/')
  if (urlParts.length > 1) {
    const filePath = urlParts[1]
    const { error: storageError } = await supabase.storage
      .from('galerie')
      .remove([filePath])

    if (storageError) {
      console.error('Error deleting file from storage:', storageError)
      // We don't return error here because the DB record is already deleted, but logging it is good
    }
  }

  revalidatePath('/admin')
  revalidatePath('/')
}
