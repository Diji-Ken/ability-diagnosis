import { NavLink, useLocation } from 'react-router-dom'
import { useMode } from '@/providers/ModeProvider'
import { getTabsForMode } from '@/config/modeNav'

export function BottomNav() {
  const location = useLocation()
  const { mode } = useMode()
  const tabs = getTabsForMode(mode)

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border-rpg bg-bg-secondary"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex h-[60px] items-center justify-around">
        {tabs.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to

          return (
            <NavLink
              key={to}
              to={to}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-xs transition-colors ${
                isActive
                  ? mode === 'romance' ? 'text-fire' : 'text-gold'
                  : 'text-text-secondary'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
