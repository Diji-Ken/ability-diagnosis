import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { getDiagnosisHistory } from '@/lib/api/diagnosis'
import type { DiagnosisRecord } from '@/lib/api/diagnosis'
import { JOBS } from '@/data/jobs'
import { Swords, Sparkles, ArrowRight, Clock } from 'lucide-react'

const tierConfig: Record<string, { label: string; color: string }> = {
  legend: { label: 'S', color: 'text-yellow-400 border-yellow-400' },
  expert: { label: 'A', color: 'text-violet-400 border-violet-400' },
  standard: { label: 'B', color: 'text-blue-400 border-blue-400' },
  basic: { label: 'C', color: 'text-emerald-400 border-emerald-400' },
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
}

export function HistoryPage() {
  const { user } = useAuth()
  const [history, setHistory] = useState<DiagnosisRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    getDiagnosisHistory(user.id).then(({ data }) => {
      if (data) setHistory(data)
      setLoading(false)
    })
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Swords className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
          <p className="text-text-secondary">履歴を読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <header className="border-b border-border-rpg/30 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Clock className="w-6 h-6 text-gold" />
          <h1 className="text-gold font-bold text-lg">診断履歴</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {history.length === 0 ? (
          <div className="rpg-frame p-8 text-center">
            <Sparkles className="w-12 h-12 text-gold mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gold mb-2">まだ診断していません</h2>
            <p className="text-text-secondary text-sm mb-4">あなたのRPGジョブを見つけましょう</p>
            <Link to="/diagnosis" className="rpg-button inline-block px-6 py-2">
              診断をはじめる
            </Link>
          </div>
        ) : (
          history.map((record) => {
            const job = JOBS.find(j => j.id === record.primary_job_id)
            const tier = job ? tierConfig[job.tier] || tierConfig.basic : null

            return (
              <Link key={record.id} to={`/jobs/${record.primary_job_id}`} className="block">
                <div className="rpg-frame p-4 hover:border-gold transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-secondary text-sm">{formatDate(record.created_at)}</span>
                    <div className="flex items-center gap-2">
                      {record.is_latest && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-gold/20 text-gold border border-gold/40">
                          最新
                        </span>
                      )}
                      {tier && (
                        <span className={`text-xs font-bold border px-1.5 py-0.5 rounded ${tier.color}`}>
                          Tier {tier.label}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gold text-glow truncate">
                        {record.primary_job_name}
                      </h3>
                      <p className="text-text-secondary text-sm">{record.animal_name}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-text-secondary flex-shrink-0" />
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 bg-bg-secondary rounded-full h-2">
                      <div
                        className="bg-gold rounded-full h-2 transition-all"
                        style={{ width: `${record.match_score}%` }}
                      />
                    </div>
                    <span className="text-gold text-sm font-bold">{record.match_score}%</span>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </main>
    </>
  )
}
