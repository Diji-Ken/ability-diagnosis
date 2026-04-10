import { Link } from 'react-router-dom'
import { Swords, Heart, ArrowLeftRight } from 'lucide-react'
import { useTrack } from '@/providers/TrackProvider'

export function TrackSwitcher() {
  const { track } = useTrack()
  const otherTrack = track === 'job' ? 'love' : 'job'
  const otherPath = track === 'job' ? '/love/dashboard' : '/job/dashboard'
  const OtherIcon = track === 'job' ? Heart : Swords
  const otherColor = track === 'job' ? 'text-fire' : 'text-gold'
  const otherLabel = track === 'job' ? '恋愛へ' : 'ビジネスへ'

  return (
    <Link
      to={otherPath}
      aria-label={`${otherTrack} trackへ切り替え`}
      className={`flex items-center gap-1 px-3 h-8 text-xs font-bold bg-bg-secondary border border-border-rpg rounded-lg hover:border-border-rpg/80 transition-colors ${otherColor}`}
    >
      <ArrowLeftRight className="w-3.5 h-3.5" />
      <OtherIcon className="w-3.5 h-3.5" />
      <span>{otherLabel}</span>
    </Link>
  )
}
