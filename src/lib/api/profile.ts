import { supabase } from '@/lib/supabase'

export interface UserProfile {
  id: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return { data: data as UserProfile | null, error }
}

export async function updateProfile(
  userId: string,
  updates: Partial<Pick<UserProfile, 'display_name' | 'bio' | 'is_public'>>
) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()

  return { data: data as UserProfile | null, error }
}

export async function getPublicProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .eq('is_public', true)
    .single()

  return { data: data as UserProfile | null, error }
}
