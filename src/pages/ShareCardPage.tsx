import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { getLatestDiagnosis } from '@/lib/api/diagnosis'
import type { DiagnosisRecord } from '@/lib/api/diagnosis'
import { JOBS } from '@/data/jobs'
import { ShareCardCanvas } from '@/components/social/ShareCardCanvas'
import { PageHeader } from '@/components/layout/PageHeader'
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

    const text = `ABILITY JOB DIAGNOSIS\n\u79c1\u306e\u30b8\u30e7\u30d6\u306f\u300c${diagnosis.primary_job_name}\u300d\uff08\u30de\u30c3\u30c1\u5ea6${diagnosis.match_score}%\uff09\n\n#AbilityJob #RPG\u8a3a\u65ad`

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
        <h2 className="text-xl font-bold text-gold mb-2">{'\u307e\u3060\u8a3a\u65ad\u3057\u3066\u3044\u307e\u305b\u3093'}</h2>
        <p className="text-text-secondary text-sm mb-4">{'\u8a3a\u65ad\u3092\u5b8c\u4e86\u3059\u308b\u3068\u30b7\u30a7\u30a2\u30ab\u30fc\u30c9\u3092\u4f5c\u6210\u3067\u304d\u307e\u3059'}</p>
        <Link to="/diagnosis" className="rpg-button inline-block px-6 py-2">
          {'\u8a3a\u65ad\u3092\u306f\u3058\u3081\u308b'}
        </Link>
      </div>
    )
  }

  const job = JOBS.find(j => j.id === diagnosis.primary_job_id)
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '\u5192\u967a\u8005'

  return (
    <>
      <PageHeader>
        <div className="flex items-center gap-3">
          <Share2 className="w-6 h-6 text-gold" />
          <h1 className="text-gold font-bold text-lg">{'\u30b7\u30a7\u30a2\u30ab\u30fc\u30c9'}</h1>
        </div>
      </PageHeader>

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
            <span>{'\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9'}</span>
          </button>
          <button
            onClick={handleShare}
            disabled={!cardDataUrl}
            className="rpg-frame py-3 flex items-center justify-center gap-2 text-gold hover:border-gold transition-colors disabled:opacity-50"
          >
            <Share2 className="w-5 h-5" />
            <span>{'\u30b7\u30a7\u30a2\u3059\u308b'}</span>
          </button>
        </div>

        <p className="text-text-secondary text-xs text-center">
          {'\u30ab\u30fc\u30c9\u3092\u4fdd\u5b58\u3057\u3066SNS\u3067\u30b7\u30a7\u30a2\u3057\u3088\u3046\uff01'}
        </p>
      </main>
    </>
  )
}
