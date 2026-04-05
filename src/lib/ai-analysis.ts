import type { CoreParams } from '@/types/diagnosis'
import type { AnimalCharacter } from '@/data/animals'
import type { Job } from '@/types/diagnosis'

export interface AnalysisResult {
  summary: string
  strengths: string[]
  weaknesses: string[]
  careerAdvice: string[]
  growthSuggestions: string[]
  dailyTip: string
}

// Get the dominant and weakest params
function getParamRanking(params: CoreParams): { strongest: keyof CoreParams; weakest: keyof CoreParams } {
  const keys: (keyof CoreParams)[] = ['communication', 'specialist', 'marketing', 'ai']
  let strongest = keys[0]
  let weakest = keys[0]

  for (const key of keys) {
    if (params[key] > params[strongest]) strongest = key
    if (params[key] < params[weakest]) weakest = key
  }

  return { strongest, weakest }
}

const paramNames: Record<keyof CoreParams, string> = {
  communication: 'コミュニケーション力',
  specialist: '専門スキル',
  marketing: 'マーケティング力',
  ai: 'AI活用力',
}

const strengthTemplates: Record<keyof CoreParams, string[]> = {
  communication: [
    '人との対話や関係構築に優れ、チームの潤滑油として機能できる',
    '相手の意図を素早く汲み取り、適切なレスポンスを返せる',
    'プレゼンテーションや交渉の場で力を発揮できる',
  ],
  specialist: [
    '深い専門知識を持ち、複雑な問題を論理的に解決できる',
    '技術的な課題に対して粘り強く取り組める',
    '他の人が見落とす細部まで注意を払える',
  ],
  marketing: [
    '市場の動向を読み、顧客ニーズを的確に捉えられる',
    'ブランディングやストーリーテリングのセンスがある',
    'データに基づいた戦略的な意思決定ができる',
  ],
  ai: [
    'AI技術の可能性と限界を理解し、効果的に活用できる',
    '新しいテクノロジーへの適応力が高い',
    '自動化やプロンプト設計で業務効率を大幅に向上させられる',
  ],
}

const weaknessTemplates: Record<keyof CoreParams, string[]> = {
  communication: [
    '自分の考えを言語化するのに時間がかかることがある',
    '大人数の場での発言に苦手意識がある可能性がある',
  ],
  specialist: [
    '特定分野の深掘りよりも幅広い知識を好む傾向がある',
    '技術的な詳細に没頭することに抵抗を感じることがある',
  ],
  marketing: [
    '自分やプロダクトを売り込むことに抵抗を感じやすい',
    '市場分析やデータドリブンな判断に不慣れな面がある',
  ],
  ai: [
    'AI技術の進歩についていくのに課題を感じている',
    'テクノロジーの活用に対して慎重すぎる面がある',
  ],
}

const careerTemplates: Record<keyof CoreParams, string[]> = {
  communication: [
    'プロジェクトマネージャーやチームリーダーとして才能を発揮できる',
    'カスタマーサクセスやコンサルティングの分野で活躍できる',
  ],
  specialist: [
    'テックリードやアーキテクトとしてチームを技術面で牽引できる',
    '研究開発やR&Dの分野でイノベーションを起こせる',
  ],
  marketing: [
    'グロースハッカーやプロダクトマーケターとして成果を出せる',
    '起業家やフリーランスとして独立する素質がある',
  ],
  ai: [
    'AIエンジニアやデータサイエンティストへの道が開けている',
    'DXコンサルタントとして組織のAI活用を推進できる',
  ],
}

export function generateAnalysis(
  animal: AnimalCharacter | undefined,
  job: Job | undefined,
  coreParams: CoreParams,
  lifePathName: string,
): AnalysisResult {
  const { strongest, weakest } = getParamRanking(coreParams)

  const summary = [
    animal ? `あなたは「${animal.character}」の性質を持ち、` : '',
    job ? `「${job.name}」のジョブに最も適性があります。` : '独自のキャリアパスを歩んでいます。',
    `${paramNames[strongest]}が突出しており、`,
    `${lifePathName}としての特性も活かせるポジションで輝けるでしょう。`,
  ].join('')

  const strengths = [
    ...strengthTemplates[strongest],
    ...(animal?.workStyle ? [`${animal.character}ならではの特徴: ${animal.workStyle}`] : []),
  ]

  const weaknesses = weaknessTemplates[weakest]

  const careerAdvice = [
    ...careerTemplates[strongest],
    ...(job?.actionPlan?.slice(0, 2) || []),
  ]

  const growthSuggestions = [
    `${paramNames[weakest]}を伸ばすことで、より総合力の高いプロフェッショナルになれます`,
    animal?.growthAdvice || '日々の小さな挑戦を積み重ねていきましょう',
    `${paramNames[strongest]}をさらに磨き、他の追随を許さない専門性を築きましょう`,
  ]

  const tips = [
    '今日は新しいスキルに15分だけ投資してみよう',
    '今週学んだことを誰かに教えてみよう',
    '自分の強みを活かせるプロジェクトに手を挙げてみよう',
    '専門分野の最新トレンドを1つ調べてみよう',
    'チームメンバーに感謝の言葉を伝えてみよう',
    'AIツールを1つ試してみよう',
    '自分のキャリアビジョンを5分間だけ考えてみよう',
  ]
  const dailyTip = tips[new Date().getDay()]

  return { summary, strengths, weaknesses, careerAdvice, growthSuggestions, dailyTip }
}
