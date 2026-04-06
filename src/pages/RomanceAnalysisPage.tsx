import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { getLatestDiagnosis } from '@/lib/api/diagnosis'
import type { DiagnosisRecord } from '@/lib/api/diagnosis'
import { JOBS } from '@/data/jobs'
import { ANIMAL_CHARACTERS } from '@/data/animals'
import type { CoreParams } from '@/types/diagnosis'
import type { AnimalCharacter } from '@/data/animals'
import type { Job } from '@/types/diagnosis'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  HeartHandshake, Sparkles, Heart, TrendingUp, Target,
  Lightbulb, AlertTriangle, ArrowRight, Star,
} from 'lucide-react'

// Romance-specific analysis
interface RomanceAnalysis {
  loveType: string
  summary: string
  charmPoints: string[]
  challenges: string[]
  idealPartner: string[]
  romanceTips: string[]
  dailyLoveTip: string
}

const PARAM_ROMANCE_MAP: Record<keyof CoreParams, { charm: string; challenge: string; partner: string }> = {
  communication: {
    charm: 'Empathetic listener who creates deep emotional connections',
    challenge: 'May over-communicate or overwhelm with intensity',
    partner: 'Someone who values open dialogue and emotional honesty',
  },
  specialist: {
    charm: 'Passionate dedication that inspires admiration',
    challenge: 'Can become absorbed in work, neglecting relationship time',
    partner: 'Someone who respects your craft and has their own passions',
  },
  marketing: {
    charm: 'Natural charisma and social magnetism that draws people in',
    challenge: 'May prioritize image over authentic vulnerability',
    partner: 'Someone who sees through the surface to your true self',
  },
  ai: {
    charm: 'Intellectual depth and future-oriented vision',
    challenge: 'May approach love too analytically, missing emotional cues',
    partner: 'Someone who balances logic with warmth and spontaneity',
  },
}

const LOVE_TYPES: Record<string, string> = {
  communication: 'Empathic Healer',
  specialist: 'Devoted Knight',
  marketing: 'Charismatic Star',
  ai: 'Visionary Sage',
}

function generateRomanceAnalysis(
  animal: AnimalCharacter | undefined,
  job: Job | undefined,
  params: CoreParams,
  lifePath: string,
): RomanceAnalysis {
  const keys: (keyof CoreParams)[] = ['communication', 'specialist', 'marketing', 'ai']
  let strongest = keys[0]
  let weakest = keys[0]
  for (const key of keys) {
    if (params[key] > params[strongest]) strongest = key
    if (params[key] < params[weakest]) weakest = key
  }

  const loveType = LOVE_TYPES[strongest]
  const animalName = animal?.character ?? 'Adventurer'
  const jobName = job?.name ?? 'Unknown'

  return {
    loveType,
    summary: `As a ${loveType}, your ${animalName} nature combined with ${jobName} skills creates a unique romantic presence. Your ${strongest} strength is your greatest charm in relationships.`,
    charmPoints: [
      PARAM_ROMANCE_MAP[strongest].charm,
      `${animalName} personality brings natural warmth and authenticity`,
      `${jobName} drive gives you purpose that partners find attractive`,
    ],
    challenges: [
      PARAM_ROMANCE_MAP[weakest].challenge,
      `Balancing ${jobName} ambition with relationship presence`,
      'Learning to be vulnerable beyond your comfort zone',
    ],
    idealPartner: [
      PARAM_ROMANCE_MAP[strongest].partner,
      `Someone who complements your ${weakest} with their own strengths`,
      `A partner who appreciates the ${animalName} spirit within you`,
    ],
    romanceTips: [
      `Use your ${strongest} to create meaningful date experiences`,
      'Practice active listening without trying to "solve" emotions',
      `Channel your ${jobName} creativity into romantic gestures`,
    ],
    dailyLoveTip: `Today, let your ${animalName} intuition guide a small act of affection for someone you care about.`,
  }
}

export function RomanceAnalysisPage() {
  const { user } = useAuth()
  const [diagnosis, setDiagnosis] = useState<DiagnosisRecord | null>(null)
  const [analysis, setAnalysis] = useState<RomanceAnalysis | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getLatestDiagnosis(user.id).then(({ data }) => {
      if (data) {
        setDiagnosis(data)
        const animal = ANIMAL_CHARACTERS.find(a => a.number === data.animal_number)
        const job = JOBS.find(j => j.id === data.primary_job_id)
        const result = generateRomanceAnalysis(animal, job, data.core_params, data.life_path_name)
        setAnalysis(result)
      }
      setLoading(false)
    })
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Heart className="w-12 h-12 text-fire animate-pulse" />
      </div>
    )
  }

  if (!diagnosis || !analysis) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <Sparkles className="w-12 h-12 text-fire mx-auto mb-3" />
        <h2 className="text-xl font-bold text-fire mb-2">No Diagnosis Yet</h2>
        <p className="text-text-secondary text-sm mb-4">Romance analysis requires a diagnosis result</p>
        <Link to="/diagnosis" className="rpg-button inline-block px-6 py-2">
          Start Diagnosis
        </Link>
      </div>
    )
  }

  return (
    <>
      <PageHeader>
        <div className="flex items-center gap-3">
          <HeartHandshake className="w-6 h-6 text-fire" />
          <h1 className="text-fire font-bold text-lg">Romance Analysis</h1>
        </div>
      </PageHeader>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Love Type */}
        <div className="rpg-frame p-6 border-fire/30">
          <div className="text-center mb-4">
            <Star className="w-8 h-8 text-fire mx-auto mb-2" />
            <p className="text-text-secondary text-xs">Your Love Type</p>
            <h2 className="text-2xl font-black text-fire">{analysis.loveType}</h2>
          </div>
          <p className="text-foreground leading-relaxed text-sm">{analysis.summary}</p>
        </div>

        {/* Daily Tip */}
        <div className="rpg-frame p-4 border-fire/30">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-fire flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-fire text-xs font-bold">Today's Love Tip</span>
              <p className="text-foreground text-sm mt-1">{analysis.dailyLoveTip}</p>
            </div>
          </div>
        </div>

        {/* Charm Points */}
        <div className="rpg-frame p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-pink-400" />
            <h2 className="text-pink-400 font-bold">Charm Points</h2>
          </div>
          <ul className="space-y-2">
            {analysis.charmPoints.map((s, i) => (
              <li key={i} className="text-foreground text-sm flex gap-2">
                <span className="text-pink-400 flex-shrink-0">+</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges */}
        <div className="rpg-frame p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h2 className="text-orange-400 font-bold">Growth Areas</h2>
          </div>
          <ul className="space-y-2">
            {analysis.challenges.map((w, i) => (
              <li key={i} className="text-foreground text-sm flex gap-2">
                <span className="text-orange-400 flex-shrink-0">!</span>
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Ideal Partner */}
        <div className="rpg-frame p-6">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-fire" />
            <h2 className="text-fire font-bold">Ideal Partner</h2>
          </div>
          <ul className="space-y-2">
            {analysis.idealPartner.map((a, i) => (
              <li key={i} className="text-foreground text-sm flex gap-2">
                <ArrowRight className="w-4 h-4 text-fire flex-shrink-0 mt-0.5" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Romance Tips */}
        <div className="rpg-frame p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <h2 className="text-pink-400 font-bold">Romance Tips</h2>
          </div>
          <ul className="space-y-2">
            {analysis.romanceTips.map((g, i) => (
              <li key={i} className="text-foreground text-sm flex gap-2">
                <span className="text-pink-400 flex-shrink-0">*</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
