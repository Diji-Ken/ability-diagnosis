import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { useTrack } from '@/providers/TrackProvider'
import { getLatestDiagnosis } from '@/lib/api/diagnosis'
import type { DiagnosisRecord } from '@/lib/api/diagnosis'
import type { Group3 } from '@/types/diagnosis'
import { calculateCompatibility, getCompatibilityLabel } from '@/lib/compatibility'
import type { CompatibilityResult } from '@/lib/compatibility'
import { ComparisonRadarChart } from '@/components/social/ComparisonRadarChart'
import { PageHeader } from '@/components/layout/PageHeader'
import { Swords, Heart, Sparkles, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export function CompatibilityPage() {
  const { user } = useAuth()
  const { track, basePath } = useTrack()
  const [myDiagnosis, setMyDiagnosis] = useState<DiagnosisRecord | null>(null)
  const [partnerDiagnosis, setPartnerDiagnosis] = useState<DiagnosisRecord | null>(null)
  const [result, setResult] = useState<CompatibilityResult | null>(null)
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getLatestDiagnosis(user.id, track).then(({ data }) => {
      if (data) setMyDiagnosis(data)
      setLoading(false)
    })
  }, [user, track])

  const handleSearch = async () => {
    if (!myDiagnosis) return
    setSearching(true)
    setSearchError(null)
    setPartnerDiagnosis(null)
    setResult(null)

    // Find user by email via profiles
    const { data: profiles } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('is_public', true)

    if (!profiles || profiles.length === 0) {
      setSearchError('\u516c\u958b\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093')
      setSearching(false)
      return
    }

    // Search through diagnosis results for public users
    let found = false
    for (const profile of profiles) {
      if (profile.id === user?.id) continue

      const { data: diag } = await supabase
        .from('diagnosis_results')
        .select('*')
        .eq('user_id', profile.id)
        .eq('track', track)
        .eq('is_latest', true)
        .single()

      if (diag) {
        const partnerDiag = diag as DiagnosisRecord
        setPartnerDiagnosis(partnerDiag)

        const compat = calculateCompatibility(
          {
            group: myDiagnosis.animal_group as Group3,
            coreParams: myDiagnosis.core_params,
            jobName: myDiagnosis.primary_job_name,
            animalName: myDiagnosis.animal_name,
          },
          {
            group: partnerDiag.animal_group as Group3,
            coreParams: partnerDiag.core_params,
            jobName: partnerDiag.primary_job_name,
            animalName: partnerDiag.animal_name,
          }
        )
        setResult(compat)
        found = true
        break
      }
    }

    if (!found) {
      setSearchError('\u8a3a\u65ad\u7d50\u679c\u3092\u6301\u3064\u516c\u958b\u30e6\u30fc\u30b6\u30fc\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093')
    }
    setSearching(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Swords className="w-12 h-12 text-gold animate-pulse" />
      </div>
    )
  }

  if (!myDiagnosis) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <Sparkles className="w-12 h-12 text-gold mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gold mb-2">{'\u307e\u3060\u8a3a\u65ad\u3057\u3066\u3044\u307e\u305b\u3093'}</h2>
        <p className="text-text-secondary text-sm mb-4">{'\u76f8\u6027\u30c1\u30a7\u30c3\u30af\u306b\u306f\u8a3a\u65ad\u304c\u5fc5\u8981\u3067\u3059'}</p>
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
          <Heart className="w-6 h-6 text-fire" />
          <h1 className="text-gold font-bold text-lg">{'\u76f8\u6027\u30c1\u30a7\u30c3\u30af'}</h1>
        </div>
      </PageHeader>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* My info */}
        <div className="rpg-frame p-4">
          <span className="text-text-secondary text-xs">{'\u3042\u306a\u305f'}</span>
          <h3 className="text-gold font-bold text-lg">{myDiagnosis.primary_job_name}</h3>
          <p className="text-text-secondary text-sm">{myDiagnosis.animal_name} / {myDiagnosis.animal_group}</p>
        </div>

        {/* Search partner */}
        <div className="rpg-frame p-6">
          <h3 className="text-gold font-bold mb-3">{'\u76f8\u624b\u3092\u63a2\u3059'}</h3>
          <p className="text-text-secondary text-sm mb-4">
            {'\u516c\u958b\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u6301\u3064\u30e6\u30fc\u30b6\u30fc\u3068\u76f8\u6027\u3092\u30c1\u30a7\u30c3\u30af\u3067\u304d\u307e\u3059'}
          </p>
          <button
            onClick={handleSearch}
            disabled={searching}
            className="rpg-button w-full py-2 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            <span>{searching ? '\u691c\u7d22\u4e2d...' : '\u516c\u958b\u30e6\u30fc\u30b6\u30fc\u3068\u76f8\u6027\u30c1\u30a7\u30c3\u30af'}</span>
          </button>
          {searchError && (
            <p className="text-red-400 text-sm mt-2 text-center">{searchError}</p>
          )}
        </div>

        {/* Results */}
        {result && partnerDiagnosis && (
          <>
            {/* Partner info */}
            <div className="rpg-frame p-4">
              <span className="text-text-secondary text-xs">{'\u76f8\u624b'}</span>
              <h3 className="text-ice font-bold text-lg">{partnerDiagnosis.primary_job_name}</h3>
              <p className="text-text-secondary text-sm">{partnerDiagnosis.animal_name} / {partnerDiagnosis.animal_group}</p>
            </div>

            {/* Overall score */}
            <div className="rpg-frame p-6 text-center">
              <Heart className="w-10 h-10 text-fire mx-auto mb-2" />
              <div className={`text-4xl font-black ${getCompatibilityLabel(result.overallScore).color}`}>
                {result.overallScore}%
              </div>
              <div className={`text-lg font-bold mt-1 ${getCompatibilityLabel(result.overallScore).color}`}>
                {getCompatibilityLabel(result.overallScore).label}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <span className="text-text-secondary text-xs">{'\u30b0\u30eb\u30fc\u30d7\u76f8\u6027'}</span>
                  <div className="text-gold font-bold text-xl">{result.groupScore}%</div>
                </div>
                <div>
                  <span className="text-text-secondary text-xs">{'\u30b9\u30ad\u30eb\u76f8\u6027'}</span>
                  <div className="text-ice font-bold text-xl">{result.paramScore}%</div>
                </div>
              </div>
            </div>

            {/* Radar chart */}
            <div className="rpg-frame p-4">
              <h3 className="text-gold font-bold text-center mb-2">{'\u30b9\u30ad\u30eb\u6bd4\u8f03'}</h3>
              <ComparisonRadarChart
                paramsA={myDiagnosis.core_params}
                paramsB={partnerDiagnosis.core_params}
                nameA={myDiagnosis.primary_job_name}
                nameB={partnerDiagnosis.primary_job_name}
              />
            </div>

            {/* Strengths & Challenges */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rpg-frame p-4">
                <h4 className="text-green-400 font-bold mb-2">{'\u5f37\u307f'}</h4>
                <ul className="space-y-1">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="text-text-secondary text-sm flex gap-2">
                      <span className="text-green-400">+</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rpg-frame p-4">
                <h4 className="text-orange-400 font-bold mb-2">{'\u8ab2\u984c'}</h4>
                <ul className="space-y-1">
                  {result.challenges.map((c, i) => (
                    <li key={i} className="text-text-secondary text-sm flex gap-2">
                      <span className="text-orange-400">!</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  )
}
