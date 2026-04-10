import { TrackSwitcher } from './TrackSwitcher'

interface PageHeaderProps {
  children: React.ReactNode
}

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <header className="border-b border-border-rpg/30 px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">{children}</div>
        <TrackSwitcher />
      </div>
    </header>
  )
}
