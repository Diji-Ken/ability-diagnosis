export type AppMode = 'business' | 'romance'

export interface ModeContextType {
  mode: AppMode
  setMode: (mode: AppMode) => void
  hasSelectedMode: boolean
}
