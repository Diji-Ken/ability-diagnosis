import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { getLatestDiagnosis } from '@/lib/api/diagnosis'
import type { DiagnosisRecord } from '@/lib/api/diagnosis'
import { getGamificationState, getLevelFromExp } from '@/lib/api/gamification'
import type { GamificationState } from '@/lib/api/gamification'
import { getProfile } from '@/lib/api/profile'
import type { UserProfile } from '@/lib/api/profile'
import { JOBS } from '@/data/jobs'
import type { CoreParams } from '@/types/diagnosis'
import {
  User, Trophy, Flame, Star, ArrowRight,
  Settings, History, TrendingUp, Swords,
} from 'lucide-react'

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

export function ProfilePage() {
  const { user } = useAuth()
  const [diagnosis, setDiagnosis] = useState<DiagnosisRecord | null>(null)
  const [gamification, setGamification] = useState<GamificationState | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    Promise.all([
      getLatestDiagnosis(user.id),
      getGamificationState(user.id),
      getProfile(user.id),
    ]).then(([diagRes, gamRes, profRes]) => {
      if (diagRes.data) setDiagnosis(diagRes.data)
      if (gamRes.data) setGamification(gamRes.data)
      if (profRes.data) setProfile(profRes.data)
      setLoading(false)
    })
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Swords className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
          <p className="text-text-secondary">プロフィールを読み込み中...</p>
        </div>
      </div>
    )
  }

  const displayName =
    profile?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    '冒険者'

  const levelInfo = gamification
    ? getLevelFromExp(gamification.total_exp)
    : { level: 1, title: '見習い', progress: 0, expInLevel: 0, expForNext: 100, isMaxLevel: false }

  const job = diagnosis ? JOBS.find(j => j.id === diagnosis.primary_job_id) : null
  const tier = job ? tierConfig[job.tier] || tierConfig.basic : null

  return (
    <>
      {/* Header */}
      <header className="border-b border-border-rpg/30 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-gold font-bold text-xl">マイページ</h1>
          <Link to="/settings" className="text-text-secondary hover:text-gold transition-colors">
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="rpg-frame p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-bg-secondary border-2 border-border-rpg flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-black text-gold text-glow truncate">
                {displayName}
              </h2>
              {profile?.bio && (
                <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                  {profile.bio}
                </p>
              )}
              <p className="text-text-secondary text-xs mt-1">
                Lv.{levelInfo.level} {levelInfo.title}
              </p>
            </div>
          </div>
        </div>

        {/* Job Card */}
        {diagnosis && job ? (
          <Link to={`/jobs/${job.id}`} className="block">
            <div className="rpg-frame p-6">
              <div className="flex items-start gap-4">
                <img
                  src={job.imageUrl}
                  alt={job.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-text-secondary">あなたのジョブ</span>
                    {tier && (
                      <span className={`text-xs font-bold border px-1.5 py-0.5 rounded ${tier.color}`}>
                        Tier {tier.label}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-black text-gold text-glow">{job.name}</h3>
                  <p className="text-text-secondary text-sm mt-1">
                    {diagnosis.animal_name} / {diagnosis.animal_group}
                  </p>
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
                <ArrowRight className="w-5 h-5 text-text-secondary flex-shrink-0 mt-2" />
              </div>
            </div>
          </Link>
        ) : (
          <div className="rpg-frame p-6 text-center">
            <Swords className="w-12 h-12 text-gold mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gold mb-2">まだ診断していません</h3>
            <p className="text-text-secondary text-sm mb-4">あなたのRPGジョブを見つけましょう</p>
            <Link to="/diagnosis" className="rpg-button inline-block px-6 py-2">
              診断をはじめる
            </Link>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rpg-frame p-4 text-center">
            <Trophy className="w-6 h-6 text-gold mx-auto mb-1" />
            <div className="text-2xl font-black text-gold">{levelInfo.level}</div>
            <div className="text-text-secondary text-xs">レベル</div>
          </div>
          <div className="rpg-frame p-4 text-center">
            <Flame className="w-6 h-6 text-orange-400 mx-auto mb-1" />
            <div className="text-2xl font-black text-orange-400">
              {gamification?.current_streak ?? 0}
            </div>
            <div className="text-text-secondary text-xs">連続ログイン</div>
          </div>
          <div className="rpg-frame p-4 text-center">
            <Star className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-2xl font-black text-purple-400">
              {gamification?.points ?? 0}
            </div>
            <div className="text-text-secondary text-xs">ポイント</div>
          </div>
        </div>

        {/* Skill Params */}
        {diagnosis && (
          <div className="rpg-frame p-6">
            <h3 className="text-gold font-bold text-center mb-4">スキルパラメータ</h3>
            <div className="space-y-3">
              {(Object.entries(diagnosis.core_params) as [keyof CoreParams, number][]).map(
                ([key, value]) => (
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
                )
              )}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="space-y-3">
          <Link to="/settings" className="block">
            <div className="rpg-frame p-4 flex items-center justify-between hover:border-gold transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gold" />
                <span className="text-foreground font-medium">設定</span>
              </div>
              <ArrowRight className="w-4 h-4 text-text-secondary" />
            </div>
          </Link>
          <Link to="/history" className="block">
            <div className="rpg-frame p-4 flex items-center justify-between hover:border-gold transition-colors">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-green-400" />
                <span className="text-foreground font-medium">診断履歴</span>
              </div>
              <ArrowRight className="w-4 h-4 text-text-secondary" />
            </div>
          </Link>
          <Link to="/growth" className="block">
            <div className="rpg-frame p-4 flex items-center justify-between hover:border-gold transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-foreground font-medium">成長記録</span>
              </div>
              <ArrowRight className="w-4 h-4 text-text-secondary" />
            </div>
          </Link>
        </div>
      </main>
    </>
  )
}
