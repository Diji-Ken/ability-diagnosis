import { Swords } from 'lucide-react'

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <Swords className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
        {message && (
          <p className="text-text-secondary text-sm">{message}</p>
        )}
      </div>
    </div>
  )
}
