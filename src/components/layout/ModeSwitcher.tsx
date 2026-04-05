import { Swords, Heart } from 'lucide-react'
import { useMode } from '@/providers/ModeProvider'
import type { AppMode } from '@/types/mode'

const options: { id: AppMode; icon: typeof Swords; label: string }[] = [
  { id: 'business', icon: Swords, label: 'Business' },
  { id: 'romance', icon: Heart, label: 'Romance' },
]

export function ModeSwitcher() {
  const { mode, setMode } = useMode()

  return (
    <div className="flex items-center bg-bg-secondary rounded-lg border border-border-rpg overflow-hidden h-8">
      {options.map(({ id, icon: Icon, label }) => {
        const isActive = mode === id
        return (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`flex items-center gap-1.5 px-3 h-full text-xs font-bold transition-all ${
              isActive
                ? id === 'business'
                  ? 'bg-gold/20 text-gold'
                  : 'bg-fire/20 text-fire'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
