import { supabase } from '@/lib/supabase'
import type { CoreParams, SubParams, Track } from '@/types/diagnosis'

export interface DiagnosisRecord {
  id: string
  user_id: string
  track: Track
  birthday: string
  animal_number: number
  animal_name: string
  animal_group: string
  life_path_number: number
  life_path_name: string
  occupation: string | null
  skill_answers: Record<string, number>
  core_params: CoreParams
  sub_params: SubParams
  primary_job_id: string
  primary_job_name: string
  match_score: number
  runner_up_job_id: string | null
  runner_up_job_name: string | null
  is_latest: boolean
  version: number
  created_at: string
  updated_at: string
}

export async function saveDiagnosisResult(
  result: Omit<DiagnosisRecord, 'id' | 'created_at' | 'updated_at' | 'version' | 'is_latest'>,
) {
  // Get current version for this (user, track)
  const { data: prev } = await supabase
    .from('diagnosis_results')
    .select('version')
    .eq('user_id', result.user_id)
    .eq('track', result.track)
    .eq('is_latest', true)
    .single()

  const newVersion = prev ? prev.version + 1 : 1

  // Mark previous results as not latest (scoped to same track)
  await supabase
    .from('diagnosis_results')
    .update({ is_latest: false })
    .eq('user_id', result.user_id)
    .eq('track', result.track)
    .eq('is_latest', true)

  const { data, error } = await supabase
    .from('diagnosis_results')
    .insert({
      ...result,
      is_latest: true,
      version: newVersion,
    })
    .select()
    .single()

  return { data, error, isFirst: newVersion === 1 }
}

export async function getLatestDiagnosis(userId: string, track: Track = 'job') {
  const { data, error } = await supabase
    .from('diagnosis_results')
    .select('*')
    .eq('user_id', userId)
    .eq('track', track)
    .eq('is_latest', true)
    .single()

  return { data: data as DiagnosisRecord | null, error }
}

export async function getDiagnosisHistory(userId: string, track: Track = 'job') {
  const { data, error } = await supabase
    .from('diagnosis_results')
    .select('*')
    .eq('user_id', userId)
    .eq('track', track)
    .order('created_at', { ascending: false })

  return { data: data as DiagnosisRecord[] | null, error }
}
