import { supabase } from '@/lib/supabase'

export interface JournalEntry {
  id: string
  user_id: string
  entry_date: string
  content: string
  mood: number | null
  created_at: string
  updated_at: string
}

export async function getJournalEntries(userId: string, year: number, month: number) {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = month === 12
    ? `${year + 1}-01-01`
    : `${year}-${String(month + 1).padStart(2, '0')}-01`

  const { data, error } = await supabase
    .from('user_journals')
    .select('*')
    .eq('user_id', userId)
    .gte('entry_date', startDate)
    .lt('entry_date', endDate)
    .order('entry_date', { ascending: true })

  return { data: data as JournalEntry[] | null, error }
}

export async function getJournalEntry(userId: string, date: string) {
  const { data, error } = await supabase
    .from('user_journals')
    .select('*')
    .eq('user_id', userId)
    .eq('entry_date', date)
    .single()

  return { data: data as JournalEntry | null, error }
}

export async function saveJournalEntry(userId: string, date: string, content: string, mood: number | null) {
  const { data, error } = await supabase
    .from('user_journals')
    .upsert({
      user_id: userId,
      entry_date: date,
      content,
      mood,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,entry_date' })
    .select()
    .single()

  return { data: data as JournalEntry | null, error }
}

export async function getRecentMoods(userId: string, days: number = 7) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from('user_journals')
    .select('entry_date, mood')
    .eq('user_id', userId)
    .gte('entry_date', startDate.toISOString().split('T')[0])
    .order('entry_date', { ascending: true })

  return { data: data as Pick<JournalEntry, 'entry_date' | 'mood'>[] | null, error }
}
