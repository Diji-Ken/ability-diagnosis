import { supabase } from '@/lib/supabase'
import { BADGES } from '@/data/badges'
import type { BadgeDefinition } from '@/data/badges'

export interface UserBadge {
  id: string
  user_id: string
  badge_id: string
  earned_at: string
}

export async function getUserBadges(userId: string) {
  const { data, error } = await supabase
    .from('user_badges')
    .select('*')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false })

  return { data: data as UserBadge[] | null, error }
}

export async function awardBadge(userId: string, badgeId: string) {
  const { data, error } = await supabase
    .from('user_badges')
    .upsert({ user_id: userId, badge_id: badgeId }, { onConflict: 'user_id,badge_id' })
    .select()
    .single()

  return { data: data as UserBadge | null, error }
}

export async function checkAndAwardBadges(userId: string, stats: {
  diagnosisCount: number
  longestStreak: number
  level: number
  journalCount: number
  journalStreak: number
  points: number
  shareCount: number
  evolutionCount: number
}) {
  const { data: existing } = await getUserBadges(userId)
  const earnedIds = new Set(existing?.map(b => b.badge_id) || [])
  const newBadges: BadgeDefinition[] = []

  for (const badge of BADGES) {
    if (earnedIds.has(badge.id)) continue

    let earned = false
    switch (badge.id) {
      case 'first_diagnosis': earned = stats.diagnosisCount >= 1; break
      case 'three_diagnoses': earned = stats.diagnosisCount >= 3; break
      case 'streak_3': earned = stats.longestStreak >= 3; break
      case 'streak_7': earned = stats.longestStreak >= 7; break
      case 'streak_30': earned = stats.longestStreak >= 30; break
      case 'level_20': earned = stats.level >= 20; break
      case 'level_50': earned = stats.level >= 50; break
      case 'level_80': earned = stats.level >= 80; break
      case 'journal_first': earned = stats.journalCount >= 1; break
      case 'journal_7': earned = stats.journalCount >= 7; break
      case 'journal_streak_3': earned = stats.journalStreak >= 3; break
      case 'journal_streak_7': earned = stats.journalStreak >= 7; break
      case 'points_100': earned = stats.points >= 100; break
      case 'points_500': earned = stats.points >= 500; break
      case 'share_first': earned = stats.shareCount >= 1; break
      case 'first_evolution': earned = stats.evolutionCount >= 1; break
    }

    if (earned) {
      await awardBadge(userId, badge.id)
      newBadges.push(badge)
    }
  }

  return newBadges
}
