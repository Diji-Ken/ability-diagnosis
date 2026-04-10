import type { Job } from '@/types/diagnosis'
import { useTrack } from '@/providers/TrackProvider'
import { getTrackConfig } from '@/config/trackConfig'

export function useTrackJobs(): Job[] {
  const { track } = useTrack()
  return getTrackConfig(track).jobs
}

export function useTrackConfig() {
  const { track } = useTrack()
  return getTrackConfig(track)
}
