import { Flame, BookOpen, Star, TrendingUp } from 'lucide-react'

interface WeeklyStatsCardsProps {
  streak: number
  journalCount: number
  expEarned: number
  activeDays: number
}

export function WeeklyStatsCards({ streak, journalCount, expEarned, activeDays }: WeeklyStatsCardsProps) {
  const stats = [
    { icon: Flame, label: '連続ログイン', value: `${streak}日`, color: 'text-orange-400' },
    { icon: BookOpen, label: '日誌記録', value: `${journalCount}回`, color: 'text-emerald-400' },
    { icon: Star, label: '獲得EXP', value: `${expEarned}`, color: 'text-gold' },
    { icon: TrendingUp, label: 'アクティブ日数', value: `${activeDays}/7`, color: 'text-blue-400' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="rpg-frame p-4 text-center">
          <Icon className={`w-6 h-6 ${color} mx-auto mb-1`} />
          <div className={`text-xl font-black ${color}`}>{value}</div>
          <div className="text-text-secondary text-xs">{label}</div>
        </div>
      ))}
    </div>
  )
}
