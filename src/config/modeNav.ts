import { Home, Sparkles, TrendingUp, Brain, Heart, HeartHandshake, User } from 'lucide-react'
import type { AppMode } from '@/types/mode'
import type { LucideIcon } from 'lucide-react'

export interface NavTab {
  to: string
  icon: LucideIcon
  label: string
}

const businessTabs: NavTab[] = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/diagnosis', icon: Sparkles, label: 'Diagnosis' },
  { to: '/growth', icon: TrendingUp, label: 'Growth' },
  { to: '/analysis', icon: Brain, label: 'AI' },
  { to: '/profile', icon: User, label: 'Profile' },
]

const romanceTabs: NavTab[] = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/diagnosis', icon: Sparkles, label: 'Diagnosis' },
  { to: '/compatibility', icon: Heart, label: 'Match' },
  { to: '/romance-analysis', icon: HeartHandshake, label: 'Love AI' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export function getTabsForMode(mode: AppMode): NavTab[] {
  return mode === 'romance' ? romanceTabs : businessTabs
}
