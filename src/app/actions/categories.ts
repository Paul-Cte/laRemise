'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getCategories() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('date_creation', { ascending: false })

  if (error) {
    console.error('Error fetching categories:', error)
    throw new Error(error.message)
  }

  return data
}

export async function createCategory(formData: FormData) {
  const nom = formData.get('nom') as string
  if (!nom) {
    throw new Error('Le nom de la catégorie est requis')
  }

  const supabase = await createClient()
  const { error } = await supabase.from('categories').insert({ nom })

  if (error) {
    console.error('Error creating category:', error)
    throw new Error(error.message)
  }

  revalidatePath('/admin')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()

  // 1. Récupérer toutes les photos associées à cette catégorie
  const { data: photos, error: fetchError } = await supabase
    .from('photos')
    .select('id, url')
    .eq('category_id', id)

  if (fetchError) {
    console.error('Error fetching photos for category:', fetchError)
    throw new Error(fetchError.message)
  }

  // 2. Supprimer les fichiers physiques du bucket Storage
  if (photos && photos.length > 0) {
    const filePaths = photos.map(photo => {
      const urlParts = photo.url.split('/galerie/')
      return urlParts.length > 1 ? urlParts[1] : null
    }).filter(Boolean) as string[]

    if (filePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('galerie')
        .remove(filePaths)

      if (storageError) {
        console.error('Error deleting files from storage:', storageError)
      }
    }
    
    // Supprimer les entrées de la table photos (au cas où ON DELETE CASCADE n'est pas configuré)
    await supabase.from('photos').delete().eq('category_id', id)
  }

  // 3. Supprimer la catégorie
  const { error } = await supabase.from('categories').delete().eq('id', id)

  if (error) {
    console.error('Error deleting category:', error)
    throw new Error(error.message)
  }

  revalidatePath('/admin')
}
