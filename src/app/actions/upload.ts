'use server'

import { createClient } from '@/utils/supabase/server'

export async function uploadImageToStorage(formData: FormData): Promise<{ url?: string; error?: string }> {
  const file = formData.get('file') as File | null;

  if (!file || file.size === 0) {
    return { error: 'Aucun fichier fourni' };
  }

  const supabase = await createClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  // Upload file to Supabase Storage in 'galerie' bucket (or a new 'uploads' bucket, but 'galerie' already exists)
  const { error: uploadError } = await supabase.storage
    .from('galerie')
    .upload(filePath, file)

  if (uploadError) {
    console.error('Error uploading file:', uploadError)
    return { error: uploadError.message };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('galerie')
    .getPublicUrl(filePath)

  return { url: publicUrl };
}
