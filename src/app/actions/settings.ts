'use server'

import { createClient } from '@/utils/supabase/server'

export async function getSetting(key: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single()

  if (error) {
    console.error(`Erreur lors de la récupération du paramètre ${key}:`, error.message)
    return null
  }

  return data?.value || null
}

export async function updateSetting(key: string, value: string) {
  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('settings')
    .select('id')
    .eq('key', key)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from('settings')
      .update({ value })
      .eq('key', key)

    if (error) {
      console.error(`Erreur lors de la mise à jour du paramètre ${key}:`, error.message)
      return { error: error.message }
    }
  } else {
    const { error } = await supabase
      .from('settings')
      .insert({ key, value })

    if (error) {
      console.error(`Erreur lors de l'insertion du paramètre ${key}:`, error.message)
      return { error: error.message }
    }
  }

  return { success: true }
}
