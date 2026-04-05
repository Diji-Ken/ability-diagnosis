import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarGridProps {
  year: number
  month: number
  entries: Map<string, { mood: number | null; hasContent: boolean }>
  selectedDate: string | null
  onSelectDate: (date: string) => void
  onPrevMonth: () => void
  onNextMonth: () => void
}

const DAY_LABELS = ['日', '月', '火', '水', '木', '金', '土']

const MOOD_COLORS: Record<number, string> = {
  1: 'bg-red-400',
  2: 'bg-orange-400',
  3: 'bg-yellow-400',
  4: 'bg-green-400',
  5: 'bg-blue-400',
}

function formatDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function getTodayString(): string {
  const now = new Date()
  return formatDateString(now.getFullYear(), now.getMonth() + 1, now.getDate())
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const prevMonthDays = new Date(year, month - 1, 0).getDate()

  const days: { date: string; day: number; isCurrentMonth: boolean }[] = []

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i
    const m = month === 1 ? 12 : month - 1
    const y = month === 1 ? year - 1 : year
    days.push({ date: formatDateString(y, m, d), day: d, isCurrentMonth: false })
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: formatDateString(year, month, d), day: d, isCurrentMonth: true })
  }

  // Next month leading days
  const remaining = 7 - (days.length % 7)
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      const m = month === 12 ? 1 : month + 1
      const y = month === 12 ? year + 1 : year
      days.push({ date: formatDateString(y, m, d), day: d, isCurrentMonth: false })
    }
  }

  return days
}

export function CalendarGrid({
  year,
  month,
  entries,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: CalendarGridProps) {
  const days = getCalendarDays(year, month)
  const today = getTodayString()

  return (
    <div className="rpg-frame p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrevMonth}
          className="p-2 rounded hover:bg-bg-secondary transition-colors text-text-secondary hover:text-foreground"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-gold">
          {year}年{month}月
        </h3>
        <button
          onClick={onNextMonth}
          className="p-2 rounded hover:bg-bg-secondary transition-colors text-text-secondary hover:text-foreground"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day of week headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={`text-center text-xs font-medium py-1 ${
              i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-text-secondary'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(({ date, day, isCurrentMonth }) => {
          const entry = entries.get(date)
          const isSelected = date === selectedDate
          const isToday = date === today

          return (
            <button
              key={date}
              onClick={() => onSelectDate(date)}
              className={`
                relative flex flex-col items-center justify-center
                aspect-square rounded-lg text-sm transition-colors
                ${isCurrentMonth ? 'text-foreground hover:bg-bg-secondary' : 'text-text-secondary/40'}
                ${isToday ? 'bg-bg-card' : ''}
                ${isSelected ? 'ring-2 ring-gold' : ''}
              `}
            >
              <span>{day}</span>
              {entry && (
                <span
                  className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                    entry.mood ? MOOD_COLORS[entry.mood] : 'bg-gold'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
