import { Sparkles, Search, Flame, Shield, Award, Crown, Gem, BookOpen, Notebook, Star, Zap, Share2, Lock } from 'lucide-react'
import type { BadgeDefinition } from '@/data/badges'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Sparkles,
  Search,
  Flame,
  Shield,
  Award,
  Crown,
  Gem,
  BookOpen,
  Notebook,
  Star,
  Zap,
  Share2,
}

interface BadgeCardProps {
  badge: BadgeDefinition
  earned: boolean
  earnedAt?: string
}

export function BadgeCard({ badge, earned, earnedAt }: BadgeCardProps) {
  const IconComponent = ICON_MAP[badge.icon]

  return (
    <div className={`rpg-frame p-4 relative transition-all duration-200 ${earned ? 'opacity-100' : 'opacity-50 grayscale'}`}>
      {!earned && (
        <div className="absolute top-2 right-2">
          <Lock className="text-text-secondary" size={14} />
        </div>
      )}

      <div className="flex flex-col items-center text-center gap-2">
        <div className={`p-3 rounded-full ${earned ? 'bg-bg-secondary' : 'bg-bg-primary'}`}>
          {IconComponent && (
            <IconComponent
              className={earned ? badge.color : 'text-text-secondary'}
              size={28}
            />
          )}
        </div>

        <h3 className={`font-bold text-sm ${earned ? 'text-foreground' : 'text-text-secondary'}`}>
          {badge.name}
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed">
          {earned ? badge.description : '???'}
        </p>

        {earned && earnedAt && (
          <p className="text-xs text-text-secondary mt-1">
            {new Date(earnedAt).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
          </p>
        )}
      </div>
    </div>
  )
}
