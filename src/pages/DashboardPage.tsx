import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { useTrack } from '@/providers/TrackProvider'
import { useTrackJobs, useTrackConfig } from '@/hooks/useTrackJobs'
import { getLatestDiagnosis } from '@/lib/api/diagnosis'
import type { DiagnosisRecord } from '@/lib/api/diagnosis'
import { getGamificationState, getLevelFromExp } from '@/lib/api/gamification'
import type { GamificationState } from '@/lib/api/gamification'
import { getEvolutionOptions, executeEvolution } from '@/lib/api/evolution'
import type { EvolutionOption } from '@/lib/api/evolution'
import type { CoreParams } from '@/types/diagnosis'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  Swords, RefreshCw, Share2, Heart,
  Flame, Star, Trophy, ArrowRight,
  Sparkles, Brain, BookOpen, BarChart3,
  Zap, TrendingUp,
} from 'lucide-react'

const tierConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  legend: { label: 'S', color: 'text-yellow-400 border-yellow-400', bgColor: 'bg-yellow-400/10' },
  expert: { label: 'A', color: 'text-violet-400 border-violet-400', bgColor: 'bg-violet-400/10' },
  standard: { label: 'B', color: 'text-blue-400 border-blue-400', bgColor: 'bg-blue-400/10' },
  basic: { label: 'C', color: 'text-emerald-400 border-emerald-400', bgColor: 'bg-emerald-400/10' },
}

export function DashboardPage() {
  const { user } = useAuth()
  const { track, basePath, isLove } = useTrack()
  const jobs = useTrackJobs()
  const trackConfig = useTrackConfig()
  const [diagnosis, setDiagnosis] = useState<DiagnosisRecord | null>(null)
  const [gamification, setGamification] = useState<GamificationState | null>(null)
  const [evolutionOptions, setEvolutionOptions] = useState<EvolutionOption[]>([])
  const [evolving, setEvolving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    Promise.all([
      getLatestDiagnosis(user.id, track),
      getGamificationState(user.id, track),
    ]).then(([diagRes, gamRes]) => {
      if (diagRes.data) setDiagnosis(diagRes.data)
      if (gamRes.data) {
        setGamification(gamRes.data)

        // Check evolution options (Trigger A: level threshold)
        const currentJobId = gamRes.data.current_job_id || diagRes.data?.primary_job_id
        if (currentJobId) {
          const levelInfo = getLevelFromExp(gamRes.data.total_exp)
          const options = getEvolutionOptions(currentJobId, levelInfo.level, track)
          setEvolutionOptions(options)
        }
      }
      setLoading(false)
    })
  }, [user, track])

  const handleEvolution = async (option: EvolutionOption) => {
    if (!user || !gamification) return
    setEvolving(true)
    const currentJobId = gamification.current_job_id || diagnosis?.primary_job_id
    if (!currentJobId) return

    await executeEvolution(user.id, currentJobId, option.job.id, 'level_up', track)

    // Reload state
    const [diagRes, gamRes] = await Promise.all([
      getLatestDiagnosis(user.id, track),
      getGamificationState(user.id, track),
    ])
    if (diagRes.data) setDiagnosis(diagRes.data)
    if (gamRes.data) setGamification(gamRes.data)
    setEvolutionOptions([])
    setEvolving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Swords className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
          <p className="text-text-secondary">{'\u30b9\u30c6\u30fc\u30bf\u30b9\u3092\u8aad\u307f\u8fbc\u307f\u4e2d...'}</p>
        </div>
      </div>
    )
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '\u5192\u967a\u8005'
  const levelInfo = gamification ? getLevelFromExp(gamification.total_exp) : { level: 1, title: '\u898b\u7fd2\u3044', tier: 'basic' as const, progress: 0, expInLevel: 0, expForNext: 100, isMaxLevel: false }

  const currentJobId = gamification?.current_job_id || diagnosis?.primary_job_id
  const job = currentJobId ? jobs.find(j => j.id === currentJobId) : (diagnosis ? jobs.find(j => j.id === diagnosis.primary_job_id) : null)
  const tier = job ? tierConfig[job.tier] || tierConfig.basic : null
  const paramLabels = trackConfig.paramLabels
  const accentClass = isLove ? 'text-fire' : 'text-gold'
  const hoverBorderClass = isLove ? 'hover:border-fire' : 'hover:border-gold'

  return (
    <>
      {/* Header */}
      <PageHeader>
        <div>
          <h1 className={`font-bold ${accentClass}`}>
            {trackConfig.productName}
          </h1>
          <p className="text-text-secondary text-sm">{displayName}</p>
        </div>
      </PageHeader>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6 animate-fade-in-up">

        {/* Evolution Banner */}
        {evolutionOptions.length > 0 && (
          <div className="rpg-frame p-5 border-2 border-yellow-500/50 bg-yellow-500/5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-bold text-yellow-400">{'\u9032\u5316\u53ef\u80fd\uff01'}</h3>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              {'\u30ec\u30d9\u30eb\u304c'}{levelInfo.tier === 'basic' ? 'Standard' : levelInfo.tier === 'standard' ? 'Expert' : 'Legend'}{'\u306e\u57fa\u6e96\u306b\u9054\u3057\u307e\u3057\u305f\u3002\u8ee2\u8077\u5148\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002'}
            </p>
            <div className="space-y-2">
              {evolutionOptions.map((option) => {
                const optionTier = tierConfig[option.job.tier]
                return (
                  <button
                    key={option.job.id}
                    onClick={() => handleEvolution(option)}
                    disabled={evolving}
                    className="w-full rpg-frame p-4 hover:border-gold transition-colors flex items-center gap-4 text-left"
                  >
                    <img src={option.job.imageUrl} alt={option.job.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gold font-bold">{option.job.name}</span>
                        {optionTier && (
                          <span className={`text-xs font-bold border px-1.5 py-0.5 rounded ${optionTier.color}`}>
                            Tier {optionTier.label}
                          </span>
                        )}
                      </div>
                      <p className="text-text-secondary text-xs mt-1">{option.reason}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gold flex-shrink-0" />
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-text-secondary mt-3">{'\u8ee2\u8077\u3059\u308b\u3068 +1,000 EXP +200 pt \u3092\u7372\u5f97\u3057\u307e\u3059'}</p>
          </div>
        )}

        {/* Job Card */}
        {diagnosis && job ? (
          <Link to={`${basePath}/jobs/${job.id}`} className="block">
            <div className="rpg-frame p-6">
              <div className="flex items-start gap-4">
                <img
                  src={job.imageUrl}
                  alt={job.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-text-secondary">{'\u3042\u306a\u305f\u306e\u30b8\u30e7\u30d6'}</span>
                    {tier && (
                      <span className={`text-xs font-bold border px-1.5 py-0.5 rounded ${tier.color}`}>
                        Tier {tier.label}
                      </span>
                    )}
                  </div>
                  <h2 className={`text-2xl font-black text-glow ${accentClass}`}>{job.name}</h2>
                  <p className="text-text-secondary text-sm mt-1">{job.mascot.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-bg-secondary rounded-full h-2">
                      <div
                        className={`rounded-full h-2 transition-all ${isLove ? 'bg-fire' : 'bg-gold'}`}
                        style={{ width: `${diagnosis.match_score}%` }}
                      />
                    </div>
                    <span className={`text-sm font-bold ${accentClass}`}>{diagnosis.match_score}%</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-text-secondary flex-shrink-0 mt-2" />
              </div>
            </div>
          </Link>
        ) : (
          <div className="rpg-frame p-6 text-center">
            <Sparkles className={`w-12 h-12 mx-auto mb-3 ${accentClass}`} />
            <h2 className={`text-xl font-bold mb-2 ${accentClass}`}>{'\u307e\u3060\u8a3a\u65ad\u3057\u3066\u3044\u307e\u305b\u3093'}</h2>
            <p className="text-text-secondary text-sm mb-4">
              {isLove
                ? '\u3042\u306a\u305f\u306e\u604b\u611b\u30b8\u30e7\u30d6\u3092\u898b\u3064\u3051\u307e\u3057\u3087\u3046'
                : '\u3042\u306a\u305f\u306eRPG\u30b8\u30e7\u30d6\u3092\u898b\u3064\u3051\u307e\u3057\u3087\u3046'}
            </p>
            <Link to={`${basePath}/diagnosis`} className="rpg-button inline-block px-6 py-2">
              {'\u8a3a\u65ad\u3092\u306f\u3058\u3081\u308b'}
            </Link>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rpg-frame p-4 text-center">
            <Trophy className={`w-6 h-6 mx-auto mb-1 ${accentClass}`} />
            <div className={`text-2xl font-black ${accentClass}`}>{levelInfo.level}</div>
            <div className="text-text-secondary text-xs">{levelInfo.title}</div>
          </div>
          <div className="rpg-frame p-4 text-center">
            <Flame className="w-6 h-6 text-orange-400 mx-auto mb-1" />
            <div className="text-2xl font-black text-orange-400">{gamification?.current_streak ?? 0}</div>
            <div className="text-text-secondary text-xs">{'\u9023\u7d9a\u30ed\u30b0\u30a4\u30f3'}</div>
          </div>
          <div className="rpg-frame p-4 text-center">
            <Star className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-2xl font-black text-purple-400">{gamification?.points ?? 0}</div>
            <div className="text-text-secondary text-xs">{'\u30dd\u30a4\u30f3\u30c8'}</div>
          </div>
        </div>

        {/* EXP Bar */}
        <div className="rpg-frame p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-text-secondary">
              Lv.{levelInfo.level} {levelInfo.title}
            </span>
            <span className={accentClass}>
              {levelInfo.isMaxLevel ? 'MAX' : `${levelInfo.expInLevel} / ${levelInfo.expForNext} EXP`}
            </span>
          </div>
          <div className="bg-bg-secondary rounded-full h-3">
            <div
              className={`rounded-full h-3 transition-all duration-500 ${isLove ? 'bg-gradient-to-r from-fire to-pink-300' : 'bg-gradient-to-r from-gold to-yellow-300'}`}
              style={{ width: `${levelInfo.progress * 100}%` }}
            />
          </div>
          {!levelInfo.isMaxLevel && (
            <p className="text-xs text-text-secondary mt-1">
              {'\u6b21\u306e\u30ec\u30d9\u30eb\u307e\u3067 '}{levelInfo.expForNext - levelInfo.expInLevel}{' EXP'}
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Link to={`${basePath}/diagnosis`} className={`rpg-frame p-4 text-center transition-colors ${hoverBorderClass}`}>
            <RefreshCw className={`w-7 h-7 mx-auto mb-2 ${accentClass}`} />
            <span className="text-foreground text-xs font-medium">Re-diagnose</span>
          </Link>
          <Link to={`${basePath}/analysis`} className={`rpg-frame p-4 text-center transition-colors ${hoverBorderClass}`}>
            <Brain className={`w-7 h-7 mx-auto mb-2 ${isLove ? 'text-pink-400' : 'text-thunder'}`} />
            <span className="text-foreground text-xs font-medium">AI Analysis</span>
          </Link>
          <Link to={`${basePath}/share-card`} className={`rpg-frame p-4 text-center transition-colors ${hoverBorderClass}`}>
            <Share2 className="w-7 h-7 text-blue-400 mx-auto mb-2" />
            <span className="text-foreground text-xs font-medium">Share</span>
          </Link>
          <Link to={`${basePath}/journal`} className={`rpg-frame p-4 text-center transition-colors ${hoverBorderClass}`}>
            <BookOpen className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
            <span className="text-foreground text-xs font-medium">Journal</span>
          </Link>
          <Link to={`${basePath}/growth`} className={`rpg-frame p-4 text-center transition-colors ${hoverBorderClass}`}>
            <TrendingUp className={`w-7 h-7 mx-auto mb-2 ${accentClass}`} />
            <span className="text-foreground text-xs font-medium">Growth</span>
          </Link>
          {isLove ? (
            <Link to={`${basePath}/compatibility`} className={`rpg-frame p-4 text-center transition-colors ${hoverBorderClass}`}>
              <Heart className="w-7 h-7 text-fire mx-auto mb-2" />
              <span className="text-foreground text-xs font-medium">Match</span>
            </Link>
          ) : (
            <Link to={`${basePath}/weekly-report`} className={`rpg-frame p-4 text-center transition-colors ${hoverBorderClass}`}>
              <BarChart3 className="w-7 h-7 text-ice mx-auto mb-2" />
              <span className="text-foreground text-xs font-medium">Weekly</span>
            </Link>
          )}
        </div>

        {/* Skill Params (if diagnosis exists) */}
        {diagnosis && (
          <div className="rpg-frame p-6">
            <h3 className={`font-bold text-center mb-4 ${accentClass}`}>{'\u30b9\u30ad\u30eb\u30d1\u30e9\u30e1\u30fc\u30bf'}</h3>
            <div className="space-y-3">
              {(Object.entries(diagnosis.core_params) as [keyof CoreParams, number][]).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">{paramLabels[key] || key}</span>
                    <span className={`font-bold ${accentClass}`}>{value}</span>
                  </div>
                  <div className="bg-bg-secondary rounded-full h-2">
                    <div
                      className={`rounded-full h-2 transition-all ${isLove ? 'bg-fire' : 'bg-gold'}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
