import { supabase } from '@/lib/supabase'
import { JOBS } from '@/data/jobs'
import { TIER_LEVEL_REQUIREMENTS, EXP_REWARDS, POINT_REWARDS, recordActivity } from './gamification'
import type { TierName } from './gamification'
import type { Job } from '@/types/diagnosis'

export interface EvolutionOption {
  job: Job
  reason: string
}

export interface EvolutionResult {
  evolved: boolean
  fromJob: Job | null
  toJob: Job | null
  trigger: 'level_up' | 'rediagnosis'
  expAwarded: number
  pointsAwarded: number
}

const TIER_ORDER: Record<string, number> = { basic: 0, standard: 1, expert: 2, legend: 3 }

/**
 * Trigger A: Level reached tier threshold -> return available evolution options
 */
export function getEvolutionOptions(currentJobId: string, userLevel: number): EvolutionOption[] {
  const currentJob = JOBS.find(j => j.id === currentJobId)
  if (!currentJob || currentJob.advancedJobs.length === 0) return []

  return currentJob.advancedJobs
    .map(id => JOBS.find(j => j.id === id))
    .filter((j): j is Job => {
      if (!j) return false
      const requiredLevel = TIER_LEVEL_REQUIREMENTS[j.tier as TierName]
      return userLevel >= requiredLevel
    })
    .map(job => ({
      job,
      reason: `Lv.${TIER_LEVEL_REQUIREMENTS[job.tier as TierName]}到達により解放`,
    }))
}

/**
 * Trigger B: Re-diagnosis matched a higher tier job
 */
export function checkRediagnosisEvolution(
  currentJobId: string,
  newMatchedJobId: string,
  userLevel: number
): EvolutionOption | null {
  if (currentJobId === newMatchedJobId) return null

  const currentJob = JOBS.find(j => j.id === currentJobId)
  const newJob = JOBS.find(j => j.id === newMatchedJobId)

  if (!currentJob || !newJob) return null

  const currentTierRank = TIER_ORDER[currentJob.tier] ?? 0
  const newTierRank = TIER_ORDER[newJob.tier] ?? 0

  // Higher tier match AND level requirement met
  if (newTierRank > currentTierRank) {
    const requiredLevel = TIER_LEVEL_REQUIREMENTS[newJob.tier as TierName]
    if (userLevel >= requiredLevel) {
      return {
        job: newJob,
        reason: '再診断によりスキルが上位ジョブの要件を満たしました',
      }
    }
  }

  return null
}

/**
 * Execute evolution
 */
export async function executeEvolution(
  userId: string,
  fromJobId: string,
  toJobId: string,
  trigger: 'level_up' | 'rediagnosis'
): Promise<EvolutionResult> {
  const fromJob = JOBS.find(j => j.id === fromJobId)
  const toJob = JOBS.find(j => j.id === toJobId)

  if (!fromJob || !toJob) {
    return { evolved: false, fromJob: null, toJob: null, trigger, expAwarded: 0, pointsAwarded: 0 }
  }

  const expAwarded = EXP_REWARDS.evolution_achieved
  const pointsAwarded = POINT_REWARDS.evolution_achieved

  // Record evolution history
  await supabase.from('user_evolutions').insert({
    user_id: userId,
    from_job_id: fromJobId,
    to_job_id: toJobId,
    trigger_type: trigger,
    exp_awarded: expAwarded,
    points_awarded: pointsAwarded,
  })

  // Update current job
  await supabase
    .from('user_gamification')
    .update({
      current_job_id: toJobId,
      job_tier: toJob.tier,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)

  // Award EXP + Points
  await recordActivity(userId, 'evolution_achieved', pointsAwarded, expAwarded, {
    from_job: fromJobId,
    to_job: toJobId,
    trigger,
  })

  return { evolved: true, fromJob, toJob, trigger, expAwarded, pointsAwarded }
}

/**
 * Get evolution history
 */
export async function getEvolutionHistory(userId: string) {
  const { data, error } = await supabase
    .from('user_evolutions')
    .select('*')
    .eq('user_id', userId)
    .order('evolved_at', { ascending: false })

  return { data, error }
}
