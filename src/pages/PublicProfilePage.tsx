import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPublicProfile } from '@/lib/api/profile'
import type { UserProfile } from '@/lib/api/profile'
import { getLatestDiagnosis } from '@/lib/api/diagnosis'
import type { DiagnosisRecord } from '@/lib/api/diagnosis'
import { getGamificationState, getLevelFromExp } from '@/lib/api/gamification'
import type { GamificationState } from '@/lib/api/gamification'
import { JOBS } from '@/data/jobs'
import type { CoreParams } from '@/types/diagnosis'
import { Swords, ShieldOff, ArrowRight, Trophy } from 'lucide-react'

const tierConfig: Record<string, { label: string; color: string }> = {
  legend: { label: 'S', color: 'text-yellow-400 border-yellow-400' },
  expert: { label: 'A', color: 'text-violet-400 border-violet-400' },
  standard: { label: 'B', color: 'text-blue-400 border-blue-400' },
  basic: { label: 'C', color: 'text-emerald-400 border-emerald-400' },
}

const paramLabels: Record<keyof CoreParams, string> = {
  communication: 'コミュ力',
  specialist: '専門スキル',
  marketing: 'マーケ力',
  ai: 'AIスキル',
}

export function PublicProfilePage() {
  const { userId } = useParams<{ userId: string }>()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [diagnosis, setDiagnosis] = useState<DiagnosisRecord | null>(null)
  const [gamification, setGamification] = useState<GamificationState | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!userId) return

    getPublicProfile(userId).then(({ data, error }) => {
      if (error || !data) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setProfile(data)

      Promise.all([
        getLatestDiagnosis(userId),
        getGamificationState(userId),
      ]).then(([diagRes, gamRes]) => {
        if (diagRes.data) setDiagnosis(diagRes.data)
        if (gamRes.data) setGamification(gamRes.data)
        setLoading(false)
      })
    })
  }, [userId])

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <Swords className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
          <p className="text-text-secondary">プロフィールを読み込み中...</p>
        </div>
      </div>
    )
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <ShieldOff className="w-12 h-12 text-text-secondary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">このプロフィールは非公開です</h2>
          <p className="text-text-secondary text-sm mb-4">このユーザーのプロフィールは表示できません</p>
          <Link to="/" className="text-gold hover:underline">
            トップへ戻る
          </Link>
        </div>
      </div>
    )
  }

  const job = diagnosis ? JOBS.find(j => j.id === diagnosis.primary_job_id) : null
  const tier = job ? tierConfig[job.tier] || tierConfig.basic : null
  const levelInfo = gamification
    ? getLevelFromExp(gamification.total_exp)
    : { level: 1, title: '見習い', progress: 0, expInLevel: 0, expForNext: 100, isMaxLevel: false }

  return (
    <div className="min-h-screen bg-bg-primary py-8 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Profile Header */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-bg-secondary border-2 border-border-rpg flex items-center justify-center overflow-hidden">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.display_name || ''} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl text-gold font-bold">
                {(profile.display_name || '?')[0].toUpperCase()}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-black text-gold text-glow">
            {profile.display_name || '冒険者'}
          </h1>
          {profile.bio && (
            <p className="text-text-secondary text-sm mt-2 max-w-xs mx-auto">{profile.bio}</p>
          )}
        </div>

        {/* Level Card */}
        <div className="rpg-frame p-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-gold flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-foreground font-bold">
                  Lv.{levelInfo.level} {levelInfo.title}
                </span>
                <span className="text-gold text-xs">
                  {levelInfo.isMaxLevel ? 'MAX' : `${levelInfo.expInLevel} / ${levelInfo.expForNext} EXP`}
                </span>
              </div>
              <div className="bg-bg-secondary rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-gold to-yellow-300 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${levelInfo.progress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Job Card */}
        {diagnosis && job ? (
          <div className="rpg-frame p-6">
            <div className="flex items-start gap-4">
              <img
                src={job.imageUrl}
                alt={job.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-text-secondary">ジョブ</span>
                  {tier && (
                    <span className={`text-xs font-bold border px-1.5 py-0.5 rounded ${tier.color}`}>
                      Tier {tier.label}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-black text-gold text-glow">{job.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 bg-bg-secondary rounded-full h-2">
                    <div
                      className="bg-gold rounded-full h-2 transition-all"
                      style={{ width: `${diagnosis.match_score}%` }}
                    />
                  </div>
                  <span className="text-gold text-sm font-bold">{diagnosis.match_score}%</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Skill Params */}
        {diagnosis && (
          <div className="rpg-frame p-6">
            <h3 className="text-gold font-bold text-center mb-4">スキルパラメータ</h3>
            <div className="space-y-3">
              {(Object.entries(diagnosis.core_params) as [keyof CoreParams, number][]).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">{paramLabels[key] || key}</span>
                    <span className="text-gold font-bold">{value}</span>
                  </div>
                  <div className="bg-bg-secondary rounded-full h-2">
                    <div
                      className="bg-gold rounded-full h-2 transition-all"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className="text-center pt-4">
          <p className="text-text-secondary text-sm mb-4">あなたも診断してみる？</p>
          <Link to="/diagnosis" className="rpg-button inline-flex items-center gap-2 px-6 py-2">
            診断をはじめる <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
