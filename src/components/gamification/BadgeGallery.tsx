import { Trophy } from 'lucide-react'
import { BADGES } from '@/data/badges'
import type { UserBadge } from '@/lib/api/badges'
import { BadgeCard } from './BadgeCard'

interface BadgeGalleryProps {
  earnedBadgeIds: Set<string>
  userBadges: UserBadge[]
}

export function BadgeGallery({ earnedBadgeIds, userBadges }: BadgeGalleryProps) {
  const badgeMap = new Map(userBadges.map(b => [b.badge_id, b]))

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-gold" size={20} />
        <h2 className="text-lg font-bold text-foreground">
          {earnedBadgeIds.size} / {BADGES.length} 実績解除
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {BADGES.map((badge) => {
          const earned = earnedBadgeIds.has(badge.id)
          const userBadge = badgeMap.get(badge.id)

          return (
            <BadgeCard
              key={badge.id}
              badge={badge}
              earned={earned}
              earnedAt={userBadge?.earned_at}
            />
          )
        })}
      </div>
    </div>
  )
}
