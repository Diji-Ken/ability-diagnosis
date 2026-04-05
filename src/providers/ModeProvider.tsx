import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthProvider'
import { supabase } from '@/lib/supabase'
import type { AppMode, ModeContextType } from '@/types/mode'

const STORAGE_KEY = 'ability-mode'

const ModeContext = createContext<ModeContextType>({
  mode: 'business',
  setMode: () => {},
  hasSelectedMode: false,
})

export function useMode() {
  return useContext(ModeContext)
}

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  // Read from localStorage immediately for fast hydration
  const stored = localStorage.getItem(STORAGE_KEY)
  const [mode, setModeState] = useState<AppMode>(
    stored === 'romance' ? 'romance' : 'business'
  )
  const [hasSelectedMode, setHasSelectedMode] = useState(!!stored)

  // Sync from Supabase when user becomes available
  useEffect(() => {
    if (!user) return

    supabase
      .from('user_gamification')
      .select('active_mode')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (data?.active_mode) {
          const dbMode = data.active_mode as AppMode
          setModeState(dbMode)
          localStorage.setItem(STORAGE_KEY, dbMode)
          setHasSelectedMode(true)
        }
      })
  }, [user])

  const setMode = useCallback(
    (newMode: AppMode) => {
      setModeState(newMode)
      localStorage.setItem(STORAGE_KEY, newMode)
      setHasSelectedMode(true)

      if (user) {
        supabase
          .from('user_gamification')
          .update({ active_mode: newMode, updated_at: new Date().toISOString() })
          .eq('user_id', user.id)
          .then(() => {})
      }
    },
    [user],
  )

  return (
    <ModeContext.Provider value={{ mode, setMode, hasSelectedMode }}>
      {children}
    </ModeContext.Provider>
  )
}
