import { Outlet } from 'react-router-dom'
import { TrackProvider } from '@/providers/TrackProvider'
import { BottomNav } from './BottomNav'

export function LoveLayout() {
  return (
    <TrackProvider track="love">
      <div className="min-h-screen bg-bg-primary pb-20 theme-love">
        <Outlet />
        <BottomNav />
      </div>
    </TrackProvider>
  )
}
