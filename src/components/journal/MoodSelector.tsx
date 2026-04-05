import { Frown, Meh, Minus, Smile, Laugh } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface MoodSelectorProps {
  value: number | null
  onChange: (mood: number) => void
}

interface MoodOption {
  value: number
  icon: LucideIcon
  label: string
  color: string
  bgActive: string
}

const MOOD_OPTIONS: MoodOption[] = [
  { value: 1, icon: Frown, label: '最悪', color: 'text-red-400', bgActive: 'bg-red-400/20 ring-red-400' },
  { value: 2, icon: Meh, label: 'いまいち', color: 'text-orange-400', bgActive: 'bg-orange-400/20 ring-orange-400' },
  { value: 3, icon: Minus, label: '普通', color: 'text-yellow-400', bgActive: 'bg-yellow-400/20 ring-yellow-400' },
  { value: 4, icon: Smile, label: 'いい感じ', color: 'text-green-400', bgActive: 'bg-green-400/20 ring-green-400' },
  { value: 5, icon: Laugh, label: '最高', color: 'text-blue-400', bgActive: 'bg-blue-400/20 ring-blue-400' },
]

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      {MOOD_OPTIONS.map((option) => {
        const Icon = option.icon
        const isSelected = value === option.value
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              flex flex-col items-center gap-1 flex-1 py-2 px-1 rounded-lg
              transition-colors text-sm
              ${isSelected
                ? `${option.bgActive} ring-1 ${option.color}`
                : `bg-bg-secondary ${option.color} hover:bg-bg-card`
              }
            `}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
