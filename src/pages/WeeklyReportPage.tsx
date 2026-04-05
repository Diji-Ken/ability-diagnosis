import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { getGamificationState } from '@/lib/api/gamification'
import type { GamificationState } from '@/lib/api/gamification'
import { getRecentMoods } from '@/lib/api/journal'
import { MoodTrendChart } from '@/components/analysis/MoodTrendChart'
import { WeeklyStatsCards } from '@/components/analysis/WeeklyStatsCards'
import { supabase } from '@/lib/supabase'
import { BarChart3, Swords } from 'lucide-react'

export function WeeklyReportPage() {
  const { user } = useAuth()
  const [gamification, setGamification] = useState<GamificationState | null>(null)
  const [moods, setMoods] = useState<Array<{ date: string; mood: number | null }>>([])
  const [journalCount, setJournalCount] = useState(0)
  const [activeDays, setActiveDays] = useState(0)
  const [weeklyExp, setWeeklyExp] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const loadData = async () => {
      const [gamRes, moodRes] = await Promise.all([
        getGamificationState(user.id),
        getRecentMoods(user.id, 7),
      ])

      if (gamRes.data) setGamification(gamRes.data)

      if (moodRes.data) {
        setMoods(moodRes.data.map(m => ({
          date: m.entry_date,
          mood: m.mood,
        })))
        setJournalCount(moodRes.data.length)
        setActiveDays(moodRes.data.filter(m => m.mood !== null).length)
      }

      // Get weekly EXP from activity log
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const { data: activities } = await supabase
        .from('user_activity_log')
        .select('exp_earned')
        .eq('user_id', user.id)
        .gte('created_at', weekAgo.toISOString())

      if (activities) {
        setWeeklyExp(activities.reduce((sum, a) => sum + (a.exp_earned || 0), 0))
      }

      setLoading(false)
    }

    loadData()
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Swords className="w-12 h-12 text-gold animate-pulse" />
      </div>
    )
  }

  // Determine mood trend
  const moodValues = moods.filter(m => m.mood !== null).map(m => m.mood!)
  const avgMood = moodValues.length > 0
    ? moodValues.reduce((a, b) => a + b, 0) / moodValues.length
    : 0
  const moodTrend = avgMood >= 4 ? 'ポジティブ' : avgMood >= 3 ? '安定' : avgMood >= 2 ? 'やや不調' : '要注意'
  const trendColor = avgMood >= 4 ? 'text-green-400' : avgMood >= 3 ? 'text-gold' : avgMood >= 2 ? 'text-orange-400' : 'text-red-400'

  return (
    <>
      <header className="border-b border-border-rpg/30 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-gold" />
          <h1 className="text-gold font-bold text-lg">週間レポート</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Weekly Stats */}
        <WeeklyStatsCards
          streak={gamification?.current_streak ?? 0}
          journalCount={journalCount}
          expEarned={weeklyExp}
          activeDays={activeDays}
        />

        {/* Mood Trend */}
        <div className="rpg-frame p-6">
          <h2 className="text-gold font-bold mb-1">ムードトレンド</h2>
          <p className={`text-sm ${trendColor} font-medium mb-4`}>
            今週の傾向: {moodTrend}
            {avgMood > 0 && ` (平均: ${avgMood.toFixed(1)})`}
          </p>
          <MoodTrendChart data={moods} />
        </div>

        {/* Summary */}
        <div className="rpg-frame p-6">
          <h2 className="text-gold font-bold mb-3">今週のまとめ</h2>
          <div className="space-y-3 text-foreground text-sm">
            {activeDays >= 5 ? (
              <p>素晴らしい！今週は{activeDays}日間アクティブでした。この調子を維持しましょう。</p>
            ) : activeDays >= 3 ? (
              <p>今週は{activeDays}日間アクティブでした。もう少し頑張れば習慣化できます。</p>
            ) : (
              <p>今週のアクティブ日数は{activeDays}日でした。少しずつ習慣を作っていきましょう。</p>
            )}

            {gamification && gamification.current_streak >= 3 && (
              <p className="text-orange-400">
                {gamification.current_streak}日連続ログイン中！ストリークを途切れさせないようにしましょう。
              </p>
            )}

            {weeklyExp > 0 && (
              <p>今週{weeklyExp}EXPを獲得しました。着実にレベルアップしています！</p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
