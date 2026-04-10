import { Home, Sparkles, TrendingUp, Brain, Heart, HeartHandshake, User } from 'lucide-react'
import type { Track } from '@/types/diagnosis'
import type { LucideIcon } from 'lucide-react'

export interface NavTab {
  to: string
  icon: LucideIcon
  label: string
}

const jobTabs: NavTab[] = [
  { to: '/job/dashboard', icon: Home, label: 'Home' },
  { to: '/job/diagnosis', icon: Sparkles, label: 'Diagnosis' },
  { to: '/job/growth', icon: TrendingUp, label: 'Growth' },
  { to: '/job/analysis', icon: Brain, label: 'AI' },
  { to: '/job/profile', icon: User, label: 'Profile' },
]

const loveTabs: NavTab[] = [
  { to: '/love/dashboard', icon: Home, label: 'Home' },
  { to: '/love/diagnosis', icon: Sparkles, label: 'Diagnosis' },
  { to: '/love/compatibility', icon: Heart, label: 'Match' },
  { to: '/love/analysis', icon: HeartHandshake, label: 'Love AI' },
  { to: '/love/profile', icon: User, label: 'Profile' },
]

export function getTabsForTrack(track: Track): NavTab[] {
  return track === 'love' ? loveTabs : jobTabs
}
