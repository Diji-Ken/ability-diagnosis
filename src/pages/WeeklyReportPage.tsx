import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { useTrack } from '@/providers/TrackProvider'
import { getGamificationState } from '@/lib/api/gamification'
import type { GamificationState } from '@/lib/api/gamification'
import { getRecentMoods } from '@/lib/api/journal'
import { MoodTrendChart } from '@/components/analysis/MoodTrendChart'
import { WeeklyStatsCards } from '@/components/analysis/WeeklyStatsCards'
import { supabase } from '@/lib/supabase'
import { PageHeader } from '@/components/layout/PageHeader'
import { BarChart3, Swords } from 'lucide-react'

export function WeeklyReportPage() {
  const { user } = useAuth()
  const { track } = useTrack()
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
        getGamificationState(user.id, track),
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
  }, [user, track])

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
  const moodTrend = avgMood >= 4 ? '\u30dd\u30b8\u30c6\u30a3\u30d6' : avgMood >= 3 ? '\u5b89\u5b9a' : avgMood >= 2 ? '\u3084\u3084\u4e0d\u8abf' : '\u8981\u6ce8\u610f'
  const trendColor = avgMood >= 4 ? 'text-green-400' : avgMood >= 3 ? 'text-gold' : avgMood >= 2 ? 'text-orange-400' : 'text-red-400'

  return (
    <>
      <PageHeader>
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-gold" />
          <h1 className="text-gold font-bold text-lg">{'\u9031\u9593\u30ec\u30dd\u30fc\u30c8'}</h1>
        </div>
      </PageHeader>

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
          <h2 className="text-gold font-bold mb-1">{'\u6c17\u5206\u306e\u8a18\u9332'}</h2>
          <p className={`text-sm ${trendColor} font-medium mb-4`}>
            {'\u4eca\u9031\u306e\u50be\u5411: '}{moodTrend}
            {avgMood > 0 && ` (\u5e73\u5747: ${avgMood.toFixed(1)})`}
          </p>
          <MoodTrendChart data={moods} />
        </div>

        {/* Summary */}
        <div className="rpg-frame p-6">
          <h2 className="text-gold font-bold mb-3">{'\u4eca\u9031\u306e\u307e\u3068\u3081'}</h2>
          <div className="space-y-3 text-foreground text-sm">
            {activeDays >= 5 ? (
              <p>{'\u7d20\u6674\u3089\u3057\u3044\uff01\u4eca\u9031\u306f'}{activeDays}{'\u65e5\u9593\u30a2\u30af\u30c6\u30a3\u30d6\u3067\u3057\u305f\u3002\u3053\u306e\u8abf\u5b50\u3092\u7dad\u6301\u3057\u307e\u3057\u3087\u3046\u3002'}</p>
            ) : activeDays >= 3 ? (
              <p>{'\u4eca\u9031\u306f'}{activeDays}{'\u65e5\u9593\u30a2\u30af\u30c6\u30a3\u30d6\u3067\u3057\u305f\u3002\u3082\u3046\u5c11\u3057\u9811\u5f35\u308c\u3070\u7fd2\u6163\u5316\u3067\u304d\u307e\u3059\u3002'}</p>
            ) : (
              <p>{'\u4eca\u9031\u306e\u30a2\u30af\u30c6\u30a3\u30d6\u65e5\u6570\u306f'}{activeDays}{'\u65e5\u3067\u3057\u305f\u3002\u5c11\u3057\u305a\u3064\u7fd2\u6163\u3092\u4f5c\u3063\u3066\u3044\u304d\u307e\u3057\u3087\u3046\u3002'}</p>
            )}

            {gamification && gamification.current_streak >= 3 && (
              <p className="text-orange-400">
                {gamification.current_streak}{'\u65e5\u9023\u7d9a\u30ed\u30b0\u30a4\u30f3\u4e2d\uff01\u30b9\u30c8\u30ea\u30fc\u30af\u3092\u9014\u5207\u308c\u3055\u305b\u306a\u3044\u3088\u3046\u306b\u3057\u307e\u3057\u3087\u3046\u3002'}
              </p>
            )}

            {weeklyExp > 0 && (
              <p>{'\u4eca\u9031'}{weeklyExp}{'EXP\u3092\u7372\u5f97\u3057\u307e\u3057\u305f\u3002\u7740\u5b9f\u306b\u30ec\u30d9\u30eb\u30a2\u30c3\u30d7\u3057\u3066\u3044\u307e\u3059\uff01'}</p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
