import type { CoreParams, Group3 } from '@/types/diagnosis'

// Group compatibility matrix
const GROUP_COMPAT: Record<Group3, Record<Group3, number>> = {
  MOON: { MOON: 80, EARTH: 90, SUN: 60 },
  EARTH: { MOON: 90, EARTH: 85, SUN: 70 },
  SUN: { MOON: 60, EARTH: 70, SUN: 95 },
}

// Calculate Euclidean distance between two CoreParams (0-100 scale)
function paramSimilarity(a: CoreParams, b: CoreParams): number {
  const keys: (keyof CoreParams)[] = ['communication', 'specialist', 'marketing', 'ai']
  const maxDist = Math.sqrt(keys.length * 100 * 100) // max possible distance
  const dist = Math.sqrt(
    keys.reduce((sum, k) => sum + (a[k] - b[k]) ** 2, 0)
  )
  return Math.round((1 - dist / maxDist) * 100)
}

export interface CompatibilityResult {
  overallScore: number
  groupScore: number
  paramScore: number
  strengths: string[]
  challenges: string[]
}

export function calculateCompatibility(
  userA: { group: Group3; coreParams: CoreParams; jobName: string; animalName: string },
  userB: { group: Group3; coreParams: CoreParams; jobName: string; animalName: string }
): CompatibilityResult {
  const groupScore = GROUP_COMPAT[userA.group]?.[userB.group] ?? 70
  const paramScore = paramSimilarity(userA.coreParams, userB.coreParams)

  // Weighted average: 40% group, 60% params
  const overallScore = Math.round(groupScore * 0.4 + paramScore * 0.6)

  const strengths: string[] = []
  const challenges: string[] = []

  // Determine strengths/challenges based on param comparison
  const keys: (keyof CoreParams)[] = ['communication', 'specialist', 'marketing', 'ai']
  const labels: Record<keyof CoreParams, string> = {
    communication: 'コミュニケーション',
    specialist: '専門スキル',
    marketing: 'マーケティング',
    ai: 'AI活用',
  }

  for (const key of keys) {
    const diff = Math.abs(userA.coreParams[key] - userB.coreParams[key])
    if (diff <= 15) {
      strengths.push(`${labels[key]}の感覚が近く、共感しやすい`)
    } else if (diff >= 40) {
      challenges.push(`${labels[key]}のレベル差が大きく、互いに学べる点が多い`)
    }
  }

  // Group-based insights
  if (userA.group === userB.group) {
    strengths.push('同じグループ同士、価値観が共有しやすい')
  } else if (
    (userA.group === 'MOON' && userB.group === 'EARTH') ||
    (userA.group === 'EARTH' && userB.group === 'MOON')
  ) {
    strengths.push('MOON×EARTHは安定感のあるパートナーシップ')
  } else if (
    (userA.group === 'SUN' && userB.group === 'MOON') ||
    (userA.group === 'MOON' && userB.group === 'SUN')
  ) {
    challenges.push('SUN×MOONは刺激的だが摩擦も生まれやすい')
  }

  if (strengths.length === 0) {
    strengths.push('バランスの取れた関係性')
  }
  if (challenges.length === 0) {
    challenges.push('大きな課題は見当たらない良好な相性')
  }

  return { overallScore, groupScore, paramScore, strengths, challenges }
}

export function getCompatibilityLabel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: '最高の相性', color: 'text-gold' }
  if (score >= 75) return { label: '良い相性', color: 'text-green-400' }
  if (score >= 60) return { label: '普通の相性', color: 'text-blue-400' }
  if (score >= 45) return { label: '刺激的な関係', color: 'text-orange-400' }
  return { label: '正反対の個性', color: 'text-red-400' }
}
