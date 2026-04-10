import { useEffect, useState } from 'react'
import { TrendingUp, Loader2, ChevronRight, Zap } from 'lucide-react'
import { useAuth } from '@/providers/AuthProvider'
import { useTrack } from '@/providers/TrackProvider'
import { useTrackJobs } from '@/hooks/useTrackJobs'
import { getGamificationState, getLevelFromExp, LEVEL_THRESHOLDS, MILESTONE_LEVELS, TIER_LEVEL_REQUIREMENTS } from '@/lib/api/gamification'
import { getDiagnosisHistory } from '@/lib/api/diagnosis'
import { getUserBadges } from '@/lib/api/badges'
import { getEvolutionHistory } from '@/lib/api/evolution'
import { SkillTrendChart } from '@/components/growth/SkillTrendChart'
import { BadgeGallery } from '@/components/gamification/BadgeGallery'
import { PageHeader } from '@/components/layout/PageHeader'
import type { GamificationState } from '@/lib/api/gamification'
import type { UserBadge } from '@/lib/api/badges'
import type { CoreParams } from '@/types/diagnosis'

const tierColors: Record<string, string> = {
  basic: 'text-emerald-400 border-emerald-400',
  standard: 'text-blue-400 border-blue-400',
  expert: 'text-violet-400 border-violet-400',
  legend: 'text-yellow-400 border-yellow-400',
}

const tierLabels: Record<string, string> = {
  basic: 'Basic',
  standard: 'Standard',
  expert: 'Expert',
  legend: 'Legend',
}

interface EvolutionRecord {
  id: string
  from_job_id: string
  to_job_id: string
  trigger_type: string
  evolved_at: string
  exp_awarded: number
}

export function GrowthPage() {
  const { user } = useAuth()
  const { track } = useTrack()
  const jobs = useTrackJobs()
  const [loading, setLoading] = useState(true)
  const [gamification, setGamification] = useState<GamificationState | null>(null)
  const [skillHistory, setSkillHistory] = useState<Array<{ date: string; params: CoreParams }>>([])
  const [userBadges, setUserBadges] = useState<UserBadge[]>([])
  const [earnedBadgeIds, setEarnedBadgeIds] = useState<Set<string>>(new Set())
  const [evolutions, setEvolutions] = useState<EvolutionRecord[]>([])

  useEffect(() => {
    if (!user) return

    async function loadData() {
      setLoading(true)
      try {
        const [gamRes, diagRes, badgeRes, evoRes] = await Promise.all([
          getGamificationState(user!.id, track),
          getDiagnosisHistory(user!.id, track),
          getUserBadges(user!.id, track),
          getEvolutionHistory(user!.id, track),
        ])

        if (gamRes.data) setGamification(gamRes.data)

        if (diagRes.data) {
          const history = diagRes.data
            .filter((d) => d.core_params)
            .map((d) => ({
              date: d.created_at || '',
              params: d.core_params,
            }))
            .reverse()
          setSkillHistory(history)
        }

        if (badgeRes.data) {
          setUserBadges(badgeRes.data)
          setEarnedBadgeIds(new Set(badgeRes.data.map((b) => b.badge_id)))
        }

        if (evoRes.data) {
          setEvolutions(evoRes.data as EvolutionRecord[])
        }
      } catch (err) {
        console.error('Failed to load growth data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user, track])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-gold w-8 h-8" />
      </div>
    )
  }

  const levelInfo = gamification ? getLevelFromExp(gamification.total_exp) : null

  // Filter thresholds to show milestones + current level
  const visibleThresholds = LEVEL_THRESHOLDS.filter(
    t => MILESTONE_LEVELS.includes(t.level) || t.level === levelInfo?.level
  )

  return (
    <>
      {/* Header */}
      <PageHeader>
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-gold" />
          <h1 className="text-gold font-bold text-lg">{'\u6210\u9577\u8a18\u9332'}</h1>
        </div>
      </PageHeader>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Level Progress Card */}
        {levelInfo && gamification && (
          <div className="rpg-frame p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-text-secondary text-sm">{'\u73fe\u5728\u306e\u30ec\u30d9\u30eb'}</p>
                <p className="text-2xl font-bold text-gold">Lv.{levelInfo.level}</p>
              </div>
              <div className="text-right">
                <p className="text-text-secondary text-sm">{'\u79f0\u53f7'}</p>
                <p className="text-lg font-bold text-foreground">{levelInfo.title}</p>
              </div>
            </div>

            {/* Tier badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold border px-2 py-0.5 rounded ${tierColors[levelInfo.tier]}`}>
                {tierLabels[levelInfo.tier]}
              </span>
              {levelInfo.level < TIER_LEVEL_REQUIREMENTS.standard && (
                <span className="text-xs text-text-secondary">Lv.{TIER_LEVEL_REQUIREMENTS.standard}{'\u3067Standard\u89e3\u653e'}</span>
              )}
              {levelInfo.level >= TIER_LEVEL_REQUIREMENTS.standard && levelInfo.level < TIER_LEVEL_REQUIREMENTS.expert && (
                <span className="text-xs text-text-secondary">Lv.{TIER_LEVEL_REQUIREMENTS.expert}{'\u3067Expert\u89e3\u653e'}</span>
              )}
              {levelInfo.level >= TIER_LEVEL_REQUIREMENTS.expert && levelInfo.level < TIER_LEVEL_REQUIREMENTS.legend && (
                <span className="text-xs text-text-secondary">Lv.{TIER_LEVEL_REQUIREMENTS.legend}{'\u3067Legend\u89e3\u653e'}</span>
              )}
            </div>

            {!levelInfo.isMaxLevel && (
              <div>
                <div className="flex justify-between text-xs text-text-secondary mb-1">
                  <span>EXP: {levelInfo.expInLevel} / {levelInfo.expForNext}</span>
                  <span>{'\u6b21\u306e\u30ec\u30d9\u30eb\u307e\u3067 '}{levelInfo.expForNext - levelInfo.expInLevel}{' EXP'}</span>
                </div>
                <div className="w-full h-3 bg-bg-primary rounded-full overflow-hidden border border-border-rpg">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-600 to-gold rounded-full transition-all duration-500"
                    style={{ width: `${levelInfo.progress * 100}%` }}
                  />
                </div>
              </div>
            )}

            {levelInfo.isMaxLevel && (
              <p className="text-gold text-sm text-center mt-2">{'\u6700\u9ad8\u30ec\u30d9\u30eb\u306b\u5230\u9054\u3057\u307e\u3057\u305f\uff01'}</p>
            )}

            <div className="flex justify-between mt-4 text-sm">
              <div className="text-center">
                <p className="text-text-secondary">{'\u7dcfEXP'}</p>
                <p className="text-foreground font-bold">{gamification.total_exp}</p>
              </div>
              <div className="text-center">
                <p className="text-text-secondary">{'\u30dd\u30a4\u30f3\u30c8'}</p>
                <p className="text-foreground font-bold">{gamification.points}</p>
              </div>
              <div className="text-center">
                <p className="text-text-secondary">{'\u9023\u7d9a\u65e5\u6570'}</p>
                <p className="text-foreground font-bold">{gamification.current_streak}{'\u65e5'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Evolution History */}
        {evolutions.length > 0 && (
          <div className="rpg-frame p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-bold text-foreground">{'\u9032\u5316\u5c65\u6b74'}</h2>
            </div>
            <div className="space-y-3">
              {evolutions.map((evo) => {
                const fromJob = jobs.find(j => j.id === evo.from_job_id)
                const toJob = jobs.find(j => j.id === evo.to_job_id)
                return (
                  <div key={evo.id} className="flex items-center gap-3 p-3 bg-bg-secondary/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-secondary">{fromJob?.name ?? evo.from_job_id}</span>
                        <span className="text-gold">{'\u2192'}</span>
                        <span className="text-gold font-bold">{toJob?.name ?? evo.to_job_id}</span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">
                        {evo.trigger_type === 'level_up' ? '\u30ec\u30d9\u30eb\u30a2\u30c3\u30d7\u9032\u5316' : '\u518d\u8a3a\u65ad\u9032\u5316'}
                        {'\u30fb+'}
                        {evo.exp_awarded}{' EXP'}
                      </p>
                    </div>
                    <div className="text-xs text-text-secondary">
                      {new Date(evo.evolved_at).toLocaleDateString('ja-JP')}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Skill Trend Chart */}
        {skillHistory.length >= 2 && (
          <div className="rpg-frame p-5">
            <h2 className="text-lg font-bold text-foreground mb-4">{'\u30b9\u30ad\u30eb\u63a8\u79fb'}</h2>
            <SkillTrendChart history={skillHistory} />
          </div>
        )}

        {skillHistory.length === 1 && (
          <div className="rpg-frame p-5">
            <h2 className="text-lg font-bold text-foreground mb-2">{'\u30b9\u30ad\u30eb\u63a8\u79fb'}</h2>
            <p className="text-text-secondary text-sm">{'\u8a3a\u65ad\u30922\u56de\u4ee5\u4e0a\u884c\u3046\u3068\u30b9\u30ad\u30eb\u63a8\u79fb\u30b0\u30e9\u30d5\u304c\u8868\u793a\u3055\u308c\u307e\u3059\u3002'}</p>
          </div>
        )}

        {/* Badge Gallery */}
        <div className="rpg-frame p-5">
          <BadgeGallery earnedBadgeIds={earnedBadgeIds} userBadges={userBadges} />
        </div>

        {/* Level Roadmap (Milestone-based for 100 levels) */}
        <div className="rpg-frame p-5">
          <h2 className="text-lg font-bold text-foreground mb-4">{'\u30ec\u30d9\u30eb\u30ed\u30fc\u30c9\u30de\u30c3\u30d7'}</h2>
          <div className="space-y-2">
            {visibleThresholds.map((threshold) => {
              const isCurrent = levelInfo?.level === threshold.level
              const isReached = (levelInfo?.level ?? 0) >= threshold.level
              const isTierGate = threshold.level === TIER_LEVEL_REQUIREMENTS.standard ||
                threshold.level === TIER_LEVEL_REQUIREMENTS.expert ||
                threshold.level === TIER_LEVEL_REQUIREMENTS.legend

              return (
                <div
                  key={threshold.level}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isCurrent
                      ? 'bg-bg-secondary border border-gold/50'
                      : isTierGate && !isReached
                        ? 'bg-bg-secondary/30 border border-border-rpg/50'
                        : isReached
                          ? 'bg-bg-secondary/50'
                          : 'opacity-40'
                  }`}
                >
                  {isCurrent && <ChevronRight className="text-gold shrink-0 w-4 h-4" />}
                  {!isCurrent && <div className="w-4 shrink-0" />}

                  <div className={`w-12 text-center font-bold text-sm ${isCurrent ? 'text-gold' : isReached ? 'text-foreground' : 'text-text-secondary'}`}>
                    Lv.{threshold.level}
                  </div>

                  <div className="flex-1 flex items-center gap-2">
                    <span className={`text-sm ${isCurrent ? 'text-gold font-bold' : isReached ? 'text-foreground' : 'text-text-secondary'}`}>
                      {threshold.title}
                    </span>
                    {isTierGate && (
                      <span className={`text-xs font-bold border px-1.5 py-0.5 rounded ${tierColors[threshold.tier]}`}>
                        {tierLabels[threshold.tier]}{'\u89e3\u653e'}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-text-secondary">
                    {threshold.exp.toLocaleString()} EXP
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}
