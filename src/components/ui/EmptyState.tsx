import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
}

export function EmptyState({ icon, title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className="rpg-frame p-8 text-center">
      <div className="mb-3">{icon}</div>
      <h2 className="text-xl font-bold text-gold mb-2">{title}</h2>
      {description && (
        <p className="text-text-secondary text-sm mb-4">{description}</p>
      )}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="rpg-button inline-block px-6 py-2">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
