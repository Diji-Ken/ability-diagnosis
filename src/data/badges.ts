export interface BadgeDefinition {
  id: string
  name: string
  description: string
  icon: string // lucide icon name
  color: string // tailwind color class
  condition: string // human-readable condition
}

export const BADGES: BadgeDefinition[] = [
  // Diagnosis
  { id: 'first_diagnosis', name: '冒険の始まり', description: '初めての診断を完了した', icon: 'Sparkles', color: 'text-gold', condition: 'diagnosis_count >= 1' },
  { id: 'three_diagnoses', name: '探求者', description: '3回の診断を完了した', icon: 'Search', color: 'text-blue-400', condition: 'diagnosis_count >= 3' },
  // Login streak
  { id: 'streak_3', name: '3日の炎', description: '3日連続でログインした', icon: 'Flame', color: 'text-orange-400', condition: 'longest_streak >= 3' },
  { id: 'streak_7', name: '週間戦士', description: '7日連続でログインした', icon: 'Flame', color: 'text-red-400', condition: 'longest_streak >= 7' },
  { id: 'streak_30', name: '月の守護者', description: '30日連続でログインした', icon: 'Shield', color: 'text-purple-400', condition: 'longest_streak >= 30' },
  // Level milestones (Tier gates)
  { id: 'level_20', name: 'Standard到達', description: 'レベル20に到達した', icon: 'Award', color: 'text-blue-400', condition: 'level >= 20' },
  { id: 'level_50', name: 'Expert到達', description: 'レベル50に到達した', icon: 'Crown', color: 'text-violet-400', condition: 'level >= 50' },
  { id: 'level_80', name: 'Legend到達', description: 'レベル80に到達した', icon: 'Gem', color: 'text-yellow-300', condition: 'level >= 80' },
  // Journal
  { id: 'journal_first', name: '記録者', description: '初めてのジャーナルを書いた', icon: 'BookOpen', color: 'text-emerald-400', condition: 'journal_count >= 1' },
  { id: 'journal_7', name: '習慣の力', description: '7つのジャーナルを書いた', icon: 'Notebook', color: 'text-teal-400', condition: 'journal_count >= 7' },
  { id: 'journal_streak_3', name: '3日連続記録', description: '3日連続で日誌を記入した', icon: 'Flame', color: 'text-emerald-400', condition: 'journal_streak >= 3' },
  { id: 'journal_streak_7', name: '7日連続記録', description: '7日連続で日誌を記入した', icon: 'Flame', color: 'text-teal-400', condition: 'journal_streak >= 7' },
  // Points
  { id: 'points_100', name: 'ポイントハンター', description: '100ポイントを獲得した', icon: 'Star', color: 'text-purple-400', condition: 'points >= 100' },
  { id: 'points_500', name: 'ポイントマスター', description: '500ポイントを獲得した', icon: 'Zap', color: 'text-yellow-400', condition: 'points >= 500' },
  // Share
  { id: 'share_first', name: '伝道者', description: '診断結果をシェアした', icon: 'Share2', color: 'text-blue-400', condition: 'share_count >= 1' },
  // Evolution
  { id: 'first_evolution', name: '進化の証', description: '初めてのジョブ進化を達成した', icon: 'Zap', color: 'text-yellow-400', condition: 'evolution_count >= 1' },
]
