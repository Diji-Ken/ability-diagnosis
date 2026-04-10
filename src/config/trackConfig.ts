import type { Track, TrackConfig } from '@/types/diagnosis'
import { JOBS } from '@/data/jobs'
import { LOVE_JOBS } from '@/data/love-jobs'
import { SKILL_CATEGORIES, OCCUPATIONS } from '@/data/skills'
import { LOVE_SKILL_CATEGORIES, LOVE_OCCUPATIONS } from '@/data/love-skills'

export const JOB_TRACK: TrackConfig = {
  track: 'job',
  basePath: '/job',
  jobs: JOBS,
  skillCategories: SKILL_CATEGORIES,
  occupations: OCCUPATIONS,
  paramLabels: {
    communication: 'コミュニケーション力',
    specialist: '専門スキル',
    marketing: 'マーケティングスキル',
    ai: 'AIスキル',
  },
  axisColors: {
    communication: '#4fc3f7',
    specialist: '#ff6b35',
    marketing: '#66bb6a',
    ai: '#ab47bc',
  },
  themeAccent: 'gold',
  themeClass: 'theme-job',
  productName: 'ABILITY JOB',
  productTagline: 'スキルを磨き、キャリアを築く冒険',
}

export const LOVE_TRACK: TrackConfig = {
  track: 'love',
  basePath: '/love',
  jobs: LOVE_JOBS,
  skillCategories: LOVE_SKILL_CATEGORIES,
  occupations: LOVE_OCCUPATIONS,
  paramLabels: {
    communication: '共感力',
    specialist: 'アプローチ力',
    marketing: '関係構築力',
    ai: '自己表現力',
  },
  axisColors: {
    communication: '#ec4899',
    specialist: '#f97316',
    marketing: '#a855f7',
    ai: '#fb7185',
  },
  themeAccent: 'fire',
  themeClass: 'theme-love',
  productName: 'ABILITY LOVE',
  productTagline: '魅力を解き放ち、運命の出会いを掴む冒険',
}

export function getTrackConfig(track: Track): TrackConfig {
  return track === 'job' ? JOB_TRACK : LOVE_TRACK
}
