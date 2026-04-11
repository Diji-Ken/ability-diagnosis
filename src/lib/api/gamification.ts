import { supabase } from '@/lib/supabase'
import type { Track } from '@/types/diagnosis'

export interface GamificationState {
  id: string
  user_id: string
  track: Track
  level: number
  current_exp: number
  total_exp: number
  current_streak: number
  longest_streak: number
  last_active_date: string | null
  points: number
  journal_streak: number
  longest_journal_streak: number
  last_journal_date: string | null
  current_job_id: string | null
  job_tier: string
  created_at: string
  updated_at: string
}

// Tier level requirements
export const TIER_LEVEL_REQUIREMENTS = {
  basic: 1,
  standard: 20,
  expert: 50,
  legend: 80,
} as const

export type TierName = keyof typeof TIER_LEVEL_REQUIREMENTS

export function getTierForLevel(level: number): TierName {
  if (level >= 80) return 'legend'
  if (level >= 50) return 'expert'
  if (level >= 20) return 'standard'
  return 'basic'
}

// Level titles (5-level intervals)
const LEVEL_TITLES: Record<number, string> = {
  1: '見習い',
  5: '探求者',
  10: '冒険者',
  15: '戦士',
  20: '熟練者',
  25: '達人',
  30: '覚醒者',
  35: '挑戦者',
  40: '英雄',
  45: '勇者',
  50: '伝説の始まり',
  55: '不屈の闘士',
  60: '神話の継承者',
  65: '天空の翼',
  70: '超越者',
  75: '運命の導き手',
  80: '万物の理解者',
  85: '世界の目撃者',
  90: '時代の旗手',
  95: '次元の渡り人',
  100: '万能の賢者',
}

function getLevelTitle(level: number): string {
  for (let l = level; l >= 1; l--) {
    if (LEVEL_TITLES[l]) return LEVEL_TITLES[l]
  }
  return '見習い'
}

// Generate 100-level EXP curve
// Formula: cumulative(L) = round((L-1)^2.4 * 0.55)
export interface LevelThreshold {
  level: number
  exp: number
  title: string
  tier: TierName
}

function generateLevelThresholds(): LevelThreshold[] {
  const thresholds: LevelThreshold[] = []
  for (let level = 1; level <= 100; level++) {
    const exp = level === 1 ? 0 : Math.round(Math.pow(level - 1, 2.4) * 0.55)
    thresholds.push({
      level,
      exp,
      title: getLevelTitle(level),
      tier: getTierForLevel(level),
    })
  }
  return thresholds
}

export const LEVEL_THRESHOLDS = generateLevelThresholds()

export const MILESTONE_LEVELS = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

export function getLevelFromExp(totalExp: number) {
  let current: LevelThreshold = LEVEL_THRESHOLDS[0]
  for (const threshold of LEVEL_THRESHOLDS) {
    if (totalExp >= threshold.exp) {
      current = threshold
    } else {
      break
    }
  }
  const nextLevel = LEVEL_THRESHOLDS.find(t => t.level === current.level + 1)
  const expForNext = nextLevel ? nextLevel.exp - current.exp : 0
  const expInLevel = totalExp - current.exp
  const progress = nextLevel ? Math.min(expInLevel / expForNext, 1) : 1

  return {
    level: current.level,
    title: current.title,
    tier: current.tier,
    expInLevel,
    expForNext,
    progress,
    isMaxLevel: !nextLevel,
  }
}

// EXP = ability growth (login does NOT give EXP)
export const EXP_REWARDS = {
  first_diagnosis: 50,
  rediagnosis: 200,
  journal_entry: 15,
  journal_streak_3: 20,
  journal_streak_7: 50,
  evolution_achieved: 1000,
} as const

// Points = engagement rewards
export const POINT_REWARDS = {
  daily_login: 10,
  login_streak_3: 20,
  login_streak_7: 50,
  login_streak_30: 150,
  share_result: 20,
  compatibility_check: 10,
  view_profile: 5,
  journal_entry: 10,
  evolution_achieved: 200,
} as const

export async function getGamificationState(userId: string, track: Track = 'job') {
  const { data, error } = await supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', userId)
    .eq('track', track)
    .single()

  return { data: data as GamificationState | null, error }
}

export async function recordActivity(
  userId: string,
  activityType: string,
  points: number = 0,
  exp: number = 0,
  metadata?: Record<string, unknown>,
  track: Track = 'job',
) {
  const { error } = await supabase.rpc('record_activity', {
    p_user_id: userId,
    p_activity_type: activityType,
    p_points: points,
    p_exp: exp,
    p_metadata: metadata ?? null,
    p_track: track,
  })
  return { error }
}

// Login streak: awards POINTS only (shared across tracks — login is global)
// Writes to BOTH track rows so streak AND points counts show everywhere
export async function updateStreak(userId: string) {
  // Use 'job' row as canonical streak record (it's global, but we need a row to update)
  const { data: state } = await getGamificationState(userId, 'job')
  if (!state) return

  const today = new Date().toISOString().split('T')[0]
  const lastActive = state.last_active_date

  if (lastActive === today) return

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const newStreak = lastActive === yesterday ? state.current_streak + 1 : 1
  const longestStreak = Math.max(newStreak, state.longest_streak)

  // Update BOTH track rows so streak shows in both dashboards
  await supabase
    .from('user_gamification')
    .update({
      current_streak: newStreak,
      longest_streak: longestStreak,
      last_active_date: today,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)

  // Points only (EXP = 0) — credit to BOTH tracks so login rewards are track-agnostic
  let bonusPoints = POINT_REWARDS.daily_login
  if (newStreak === 3) bonusPoints += POINT_REWARDS.login_streak_3
  if (newStreak === 7) bonusPoints += POINT_REWARDS.login_streak_7
  if (newStreak === 30) bonusPoints += POINT_REWARDS.login_streak_30

  await recordActivity(userId, 'daily_login', bonusPoints, 0, { streak: newStreak }, 'job')
  await recordActivity(userId, 'daily_login', bonusPoints, 0, { streak: newStreak }, 'love')
}

// Journal streak: awards BOTH EXP + Points (affirmation = growth)
export async function updateJournalStreak(userId: string, track: Track = 'job') {
  const { data: state } = await getGamificationState(userId, track)
  if (!state) return { journalStreak: 0, alreadyRecorded: true }

  const today = new Date().toISOString().split('T')[0]
  const lastJournal = state.last_journal_date

  if (lastJournal === today) {
    return { journalStreak: state.journal_streak, alreadyRecorded: true }
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const newStreak = lastJournal === yesterday ? state.journal_streak + 1 : 1
  const longestJournalStreak = Math.max(newStreak, state.longest_journal_streak)

  await supabase
    .from('user_gamification')
    .update({
      journal_streak: newStreak,
      longest_journal_streak: longestJournalStreak,
      last_journal_date: today,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .eq('track', track)

  let exp = EXP_REWARDS.journal_entry
  let points = POINT_REWARDS.journal_entry

  if (newStreak === 3) exp += EXP_REWARDS.journal_streak_3
  if (newStreak === 7) exp += EXP_REWARDS.journal_streak_7

  await recordActivity(
    userId,
    'journal_entry',
    points,
    exp,
    { journal_streak: newStreak },
    track,
  )

  return { journalStreak: newStreak, alreadyRecorded: false, exp, points }
}
