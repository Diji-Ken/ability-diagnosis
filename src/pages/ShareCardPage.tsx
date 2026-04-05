import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { getLatestDiagnosis } from '@/lib/api/diagnosis'
import type { DiagnosisRecord } from '@/lib/api/diagnosis'
import { JOBS } from '@/data/jobs'
import { ShareCardCanvas } from '@/components/social/ShareCardCanvas'
import { Download, Share2, Swords, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ShareCardPage() {
  const { user } = useAuth()
  const [diagnosis, setDiagnosis] = useState<DiagnosisRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [cardDataUrl, setCardDataUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    getLatestDiagnosis(user.id).then(({ data }) => {
      if (data) setDiagnosis(data)
      setLoading(false)
    })
  }, [user])

  const handleDownload = () => {
    if (!cardDataUrl) return
    const link = document.createElement('a')
    link.download = 'ability-job-card.png'
    link.href = cardDataUrl
    link.click()
  }

  const handleShare = async () => {
    if (!cardDataUrl || !diagnosis) return

    const text = `ABILITY JOB DIAGNOSIS\n私のジョブは「${diagnosis.primary_job_name}」（マッチ度${diagnosis.match_score}%）\n\n#AbilityJob #RPG診断`

    if (navigator.share) {
      try {
        const blob = await (await fetch(cardDataUrl)).blob()
        const file = new File([blob], 'ability-job-card.png', { type: 'image/png' })
        await navigator.share({ text, files: [file] })
      } catch {
        // Fallback: copy text
        await navigator.clipboard.writeText(text)
      }
    } else {
      await navigator.clipboard.writeText(text)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Swords className="w-12 h-12 text-gold animate-pulse" />
      </div>
    )
  }

  if (!diagnosis) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <Sparkles className="w-12 h-12 text-gold mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gold mb-2">まだ診断していません</h2>
        <p className="text-text-secondary text-sm mb-4">診断を完了するとシェアカードを作成できます</p>
        <Link to="/diagnosis" className="rpg-button inline-block px-6 py-2">
          診断をはじめる
        </Link>
      </div>
    )
  }

  const job = JOBS.find(j => j.id === diagnosis.primary_job_id)
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '冒険者'

  return (
    <>
      <header className="border-b border-border-rpg/30 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Share2 className="w-6 h-6 text-gold" />
          <h1 className="text-gold font-bold text-lg">シェアカード</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="rpg-frame p-4">
          <ShareCardCanvas
            jobName={diagnosis.primary_job_name}
            tier={job?.tier || 'basic'}
            matchScore={diagnosis.match_score}
            animalName={diagnosis.animal_name}
            group={diagnosis.animal_group}
            coreParams={diagnosis.core_params}
            displayName={displayName}
            onGenerated={setCardDataUrl}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDownload}
            disabled={!cardDataUrl}
            className="rpg-button py-3 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            <span>ダウンロード</span>
          </button>
          <button
            onClick={handleShare}
            disabled={!cardDataUrl}
            className="rpg-frame py-3 flex items-center justify-center gap-2 text-gold hover:border-gold transition-colors disabled:opacity-50"
          >
            <Share2 className="w-5 h-5" />
            <span>シェアする</span>
          </button>
        </div>

        <p className="text-text-secondary text-xs text-center">
          カードを保存してSNSでシェアしよう！
        </p>
      </main>
    </>
  )
}
