import { useNavigate } from 'react-router-dom'
import { useMode } from '@/providers/ModeProvider'
import { Swords, Heart, ArrowRight, Sparkles } from 'lucide-react'
import type { AppMode } from '@/types/mode'

const modes = [
  {
    id: 'business' as AppMode,
    title: 'Business Quest',
    subtitle: 'Ability x Business',
    description: '{"AI analytics, growth tracking, and career strategy for your professional journey."}',
    features: ['AI Skill Analysis', 'Growth Roadmap', 'Weekly Report'],
    icon: Swords,
    borderColor: 'border-gold/60 hover:border-gold',
    iconColor: 'text-gold',
    bgGlow: 'bg-gold/5',
    buttonClass: 'rpg-button',
  },
  {
    id: 'romance' as AppMode,
    title: 'Romance Quest',
    subtitle: 'Ability x Romance',
    description: '{"Compatibility insights, charm analysis, and relationship guidance for your love journey."}',
    features: ['Compatibility Check', 'Romance Analysis', 'Charm Score'],
    icon: Heart,
    borderColor: 'border-fire/60 hover:border-fire',
    iconColor: 'text-fire',
    bgGlow: 'bg-fire/5',
    buttonClass: 'bg-fire hover:bg-fire/90 text-white font-bold py-2 px-6 rounded-lg transition-colors',
  },
] as const

export function ModeSelectPage() {
  const { setMode } = useMode()
  const navigate = useNavigate()

  const handleSelect = (mode: AppMode) => {
    setMode(mode)
    navigate('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <Sparkles className="w-10 h-10 text-gold mx-auto mb-3" />
          <h1 className="text-2xl font-black text-gold text-glow">Select Your Quest</h1>
          <p className="text-text-secondary text-sm mt-2">
            Choose your adventure mode
          </p>
        </div>

        {/* Mode Cards */}
        {modes.map((m) => {
          const Icon = m.icon
          return (
            <button
              key={m.id}
              onClick={() => handleSelect(m.id)}
              className={`w-full rpg-frame p-6 border-2 ${m.borderColor} ${m.bgGlow} transition-all text-left group`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-bg-secondary ${m.iconColor}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className={`text-xl font-black ${m.iconColor}`}>{m.title}</h2>
                  </div>
                  <p className="text-text-secondary text-xs mt-0.5">{m.subtitle}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {m.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs bg-bg-secondary text-text-secondary px-2 py-1 rounded-md border border-border-rpg/50"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 ${m.iconColor} flex-shrink-0 mt-2 group-hover:translate-x-1 transition-transform`} />
              </div>
            </button>
          )
        })}

        {/* Footer */}
        <p className="text-center text-text-secondary text-xs">
          You can switch modes anytime from the header
        </p>
      </div>
    </div>
  )
}
