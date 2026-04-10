import { createContext, useContext, useMemo } from 'react'
import type { Track } from '@/types/diagnosis'

interface TrackContextValue {
  track: Track
  basePath: '/job' | '/love'
  isJob: boolean
  isLove: boolean
  themeClass: 'theme-job' | 'theme-love'
}

const TrackContext = createContext<TrackContextValue | null>(null)

export function useTrack(): TrackContextValue {
  const ctx = useContext(TrackContext)
  if (!ctx) {
    throw new Error('useTrack must be used inside TrackProvider')
  }
  return ctx
}

interface TrackProviderProps {
  track: Track
  children: React.ReactNode
}

export function TrackProvider({ track, children }: TrackProviderProps) {
  const value = useMemo<TrackContextValue>(
    () => ({
      track,
      basePath: track === 'job' ? '/job' : '/love',
      isJob: track === 'job',
      isLove: track === 'love',
      themeClass: track === 'job' ? 'theme-job' : 'theme-love',
    }),
    [track],
  )

  return <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
}

// Helper: persist last-used track for post-login redirect
const LAST_TRACK_KEY = 'ability-last-track'

export function getLastTrack(): Track | null {
  try {
    const v = localStorage.getItem(LAST_TRACK_KEY)
    return v === 'love' || v === 'job' ? v : null
  } catch {
    return null
  }
}

export function setLastTrack(track: Track): void {
  try {
    localStorage.setItem(LAST_TRACK_KEY, track)
  } catch {
    // ignore
  }
}
