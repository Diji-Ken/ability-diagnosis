import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { ModeSwitcher } from './ModeSwitcher'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      {/* Mode switcher header bar */}
      <div className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-sm border-b border-border-rpg/20 px-4 py-2 flex justify-end">
        <ModeSwitcher />
      </div>
      <Outlet />
      <BottomNav />
    </div>
  )
}
