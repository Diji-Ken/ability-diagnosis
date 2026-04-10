import { Outlet } from 'react-router-dom'
import { TrackProvider } from '@/providers/TrackProvider'
import { BottomNav } from './BottomNav'

export function JobLayout() {
  return (
    <TrackProvider track="job">
      <div className="min-h-screen bg-bg-primary pb-20 theme-job">
        <Outlet />
        <BottomNav />
      </div>
    </TrackProvider>
  )
}
