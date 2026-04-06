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
import { PageHeader } from '@/components/layout/PageHeader'
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
  communication: '\u30b3\u30df\u30e5\u529b',
  specialist: '\u5c02\u9580\u30b9\u30ad\u30eb',
  marketing: '\u30de\u30fc\u30b1\u529b',
  ai: 'AI\u30b9\u30ad\u30eb',
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
          <p className="text-text-secondary">{'\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u8aad\u307f\u8fbc\u307f\u4e2d...'}</p>
        </div>
      </div>
    )
  }

  const displayName =
    profile?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    '\u5192\u967a\u8005'

  const levelInfo = gamification
    ? getLevelFromExp(gamification.total_exp)
    : { level: 1, title: '\u898b\u7fd2\u3044', progress: 0, expInLevel: 0, expForNext: 100, isMaxLevel: false }

  const job = diagnosis ? JOBS.find(j => j.id === diagnosis.primary_job_id) : null
  const tier = job ? tierConfig[job.tier] || tierConfig.basic : null

  return (
    <>
      {/* Header */}
      <PageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-gold font-bold text-xl">{'\u30de\u30a4\u30da\u30fc\u30b8'}</h1>
          <Link to="/settings" className="text-text-secondary hover:text-gold transition-colors">
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </PageHeader>

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
                    <span className="text-xs text-text-secondary">{'\u3042\u306a\u305f\u306e\u30b8\u30e7\u30d6'}</span>
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
            <h3 className="text-xl font-bold text-gold mb-2">{'\u307e\u3060\u8a3a\u65ad\u3057\u3066\u3044\u307e\u305b\u3093'}</h3>
            <p className="text-text-secondary text-sm mb-4">{'\u3042\u306a\u305f\u306eRPG\u30b8\u30e7\u30d6\u3092\u898b\u3064\u3051\u307e\u3057\u3087\u3046'}</p>
            <Link to="/diagnosis" className="rpg-button inline-block px-6 py-2">
              {'\u8a3a\u65ad\u3092\u306f\u3058\u3081\u308b'}
            </Link>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rpg-frame p-4 text-center">
            <Trophy className="w-6 h-6 text-gold mx-auto mb-1" />
            <div className="text-2xl font-black text-gold">{levelInfo.level}</div>
            <div className="text-text-secondary text-xs">{'\u30ec\u30d9\u30eb'}</div>
          </div>
          <div className="rpg-frame p-4 text-center">
            <Flame className="w-6 h-6 text-orange-400 mx-auto mb-1" />
            <div className="text-2xl font-black text-orange-400">
              {gamification?.current_streak ?? 0}
            </div>
            <div className="text-text-secondary text-xs">{'\u9023\u7d9a\u30ed\u30b0\u30a4\u30f3'}</div>
          </div>
          <div className="rpg-frame p-4 text-center">
            <Star className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-2xl font-black text-purple-400">
              {gamification?.points ?? 0}
            </div>
            <div className="text-text-secondary text-xs">{'\u30dd\u30a4\u30f3\u30c8'}</div>
          </div>
        </div>

        {/* Skill Params */}
        {diagnosis && (
          <div className="rpg-frame p-6">
            <h3 className="text-gold font-bold text-center mb-4">{'\u30b9\u30ad\u30eb\u30d1\u30e9\u30e1\u30fc\u30bf'}</h3>
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
                <span className="text-foreground font-medium">{'\u8a2d\u5b9a'}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-text-secondary" />
            </div>
          </Link>
          <Link to="/history" className="block">
            <div className="rpg-frame p-4 flex items-center justify-between hover:border-gold transition-colors">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-green-400" />
                <span className="text-foreground font-medium">{'\u8a3a\u65ad\u5c65\u6b74'}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-text-secondary" />
            </div>
          </Link>
          <Link to="/growth" className="block">
            <div className="rpg-frame p-4 flex items-center justify-between hover:border-gold transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-foreground font-medium">{'\u6210\u9577\u8a18\u9332'}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-text-secondary" />
            </div>
          </Link>
        </div>
      </main>
    </>
  )
}
