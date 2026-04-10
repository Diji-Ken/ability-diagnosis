import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { useTrack } from '@/providers/TrackProvider'
import { useTrackJobs } from '@/hooks/useTrackJobs'
import { getLatestDiagnosis } from '@/lib/api/diagnosis'
import type { DiagnosisRecord } from '@/lib/api/diagnosis'
import { ANIMAL_CHARACTERS } from '@/data/animals'
import { generateAnalysis } from '@/lib/ai-analysis'
import type { AnalysisResult } from '@/lib/ai-analysis'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  Brain, Sparkles, Swords, TrendingUp, Target,
  Lightbulb, AlertTriangle, ArrowRight,
} from 'lucide-react'

export function AnalysisPage() {
  const { user } = useAuth()
  const { track, basePath } = useTrack()
  const jobs = useTrackJobs()
  const [diagnosis, setDiagnosis] = useState<DiagnosisRecord | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getLatestDiagnosis(user.id, track).then(({ data }) => {
      if (data) {
        setDiagnosis(data)
        const animal = ANIMAL_CHARACTERS.find(a => a.number === data.animal_number)
        const job = jobs.find(j => j.id === data.primary_job_id)
        const result = generateAnalysis(animal, job, data.core_params, data.life_path_name)
        setAnalysis(result)
      }
      setLoading(false)
    })
  }, [user, track, jobs])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Swords className="w-12 h-12 text-gold animate-pulse" />
      </div>
    )
  }

  if (!diagnosis || !analysis) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <Sparkles className="w-12 h-12 text-gold mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gold mb-2">{'\u307e\u3060\u8a3a\u65ad\u3057\u3066\u3044\u307e\u305b\u3093'}</h2>
        <p className="text-text-secondary text-sm mb-4">{`AI\u5206\u6790\u306b\u306f\u8a3a\u65ad\u7d50\u679c\u304c\u5fc5\u8981\u3067\u3059`}</p>
        <Link to={`${basePath}/diagnosis`} className="rpg-button inline-block px-6 py-2">
          {'\u8a3a\u65ad\u3092\u306f\u3058\u3081\u308b'}
        </Link>
      </div>
    )
  }

  return (
    <>
      <PageHeader>
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-thunder" />
          <h1 className="text-gold font-bold text-lg">{`AI\u5206\u6790`}</h1>
        </div>
      </PageHeader>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Summary */}
        <div className="rpg-frame p-6">
          <h2 className="text-gold font-bold mb-3">{'\u7dcf\u5408\u5206\u6790'}</h2>
          <p className="text-foreground leading-relaxed">{analysis.summary}</p>
        </div>

        {/* Daily Tip */}
        <div className="rpg-frame p-4 border-gold/30">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-gold text-xs font-bold">{'\u4eca\u65e5\u306e\u30d2\u30f3\u30c8'}</span>
              <p className="text-foreground text-sm mt-1">{analysis.dailyTip}</p>
            </div>
          </div>
        </div>

        {/* Strengths */}
        <div className="rpg-frame p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h2 className="text-green-400 font-bold">{'\u3042\u306a\u305f\u306e\u5f37\u307f'}</h2>
          </div>
          <ul className="space-y-2">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="text-foreground text-sm flex gap-2">
                <span className="text-green-400 flex-shrink-0">+</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="rpg-frame p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h2 className="text-orange-400 font-bold">{'\u6210\u9577\u30dd\u30a4\u30f3\u30c8'}</h2>
          </div>
          <ul className="space-y-2">
            {analysis.weaknesses.map((w, i) => (
              <li key={i} className="text-foreground text-sm flex gap-2">
                <span className="text-orange-400 flex-shrink-0">!</span>
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Career Advice */}
        <div className="rpg-frame p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-gold" />
            <h2 className="text-gold font-bold">{'\u30ad\u30e3\u30ea\u30a2\u30a2\u30c9\u30d0\u30a4\u30b9'}</h2>
          </div>
          <ul className="space-y-2">
            {analysis.careerAdvice.map((a, i) => (
              <li key={i} className="text-foreground text-sm flex gap-2">
                <ArrowRight className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Growth Suggestions */}
        <div className="rpg-frame p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-thunder" />
            <h2 className="text-thunder font-bold">{'\u6210\u9577\u3078\u306e\u63d0\u6848'}</h2>
          </div>
          <ul className="space-y-2">
            {analysis.growthSuggestions.map((g, i) => (
              <li key={i} className="text-foreground text-sm flex gap-2">
                <span className="text-thunder flex-shrink-0">*</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
