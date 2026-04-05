interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  danger?: boolean
}

export function ConfirmDialog({
  open, title, message, confirmLabel, cancelLabel,
  onConfirm, onCancel, danger,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className="relative rpg-frame p-6 max-w-sm w-full">
        <h3 className="text-gold font-bold text-lg mb-2">{title}</h3>
        <p className="text-text-secondary text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 px-4 rounded-lg bg-bg-secondary border border-border-rpg text-foreground text-sm font-medium hover:border-gold transition-colors"
          >
            {cancelLabel || 'キャンセル'}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              danger
                ? 'bg-red-900/50 border border-red-700 text-red-400 hover:bg-red-900/70'
                : 'rpg-button'
            }`}
          >
            {confirmLabel || '確認'}
          </button>
        </div>
      </div>
    </div>
  )
}
