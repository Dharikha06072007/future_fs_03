import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseAnonKey } from '@/lib/api/config.server'

function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found, using mock client')
    return createClient(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    )
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()
