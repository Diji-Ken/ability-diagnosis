import { useState, useEffect, useCallback } from 'react'
import { BookOpen, Save, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '@/providers/AuthProvider'
import { getJournalEntries, getJournalEntry, saveJournalEntry } from '@/lib/api/journal'
import type { JournalEntry } from '@/lib/api/journal'
import { updateJournalStreak } from '@/lib/api/gamification'
import { CalendarGrid } from '@/components/journal/CalendarGrid'
import { MoodSelector } from '@/components/journal/MoodSelector'
import { PageHeader } from '@/components/layout/PageHeader'

function formatDateDisplay(date: string): string {
  const [y, m, d] = date.split('-')
  return `${y}\u5e74${Number(m)}\u6708${Number(d)}\u65e5`
}

export function JournalPage() {
  const { user } = useAuth()
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [entries, setEntries] = useState<Map<string, { mood: number | null; hasContent: boolean }>>(new Map())
  const [content, setContent] = useState('')
  const [mood, setMood] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Load entries for the current month
  const loadMonthEntries = useCallback(async () => {
    if (!user) return
    const { data } = await getJournalEntries(user.id, year, month)
    if (data) {
      const map = new Map<string, { mood: number | null; hasContent: boolean }>()
      data.forEach((entry: JournalEntry) => {
        map.set(entry.entry_date, {
          mood: entry.mood,
          hasContent: entry.content.length > 0,
        })
      })
      setEntries(map)
    }
  }, [user, year, month])

  useEffect(() => {
    loadMonthEntries()
  }, [loadMonthEntries])

  // Load selected date's entry
  useEffect(() => {
    if (!user || !selectedDate) return

    async function loadEntry() {
      const { data } = await getJournalEntry(user!.id, selectedDate!)
      if (data) {
        setContent(data.content)
        setMood(data.mood)
      } else {
        setContent('')
        setMood(null)
      }
    }

    loadEntry()
  }, [user, selectedDate])

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1)
      setMonth(12)
    } else {
      setMonth(month - 1)
    }
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1)
      setMonth(1)
    } else {
      setMonth(month + 1)
    }
    setSelectedDate(null)
  }

  const handleSave = async () => {
    if (!user || !selectedDate) return

    setSaving(true)
    setFeedback(null)

    const { error } = await saveJournalEntry(user.id, selectedDate, content, mood)

    if (error) {
      setFeedback({ type: 'error', message: '\u4fdd\u5b58\u306b\u5931\u6557\u3057\u307e\u3057\u305f' })
    } else {
      // Award EXP + Points if content is not empty
      if (content.trim().length > 0) {
        const result = await updateJournalStreak(user.id)
        if (result.alreadyRecorded) {
          setFeedback({ type: 'success', message: '\u4fdd\u5b58\u3057\u307e\u3057\u305f' })
        } else {
          const streakMsg = result.journalStreak >= 3
            ? ` \ud83d\udd25${result.journalStreak}\u65e5\u9023\u7d9a!`
            : ''
          setFeedback({
            type: 'success',
            message: `\u4fdd\u5b58\u3057\u307e\u3057\u305f +${result.exp} EXP +${result.points} pt${streakMsg}`,
          })
        }
      } else {
        setFeedback({ type: 'success', message: '\u4fdd\u5b58\u3057\u307e\u3057\u305f' })
      }
      loadMonthEntries()
    }

    setSaving(false)
    setTimeout(() => setFeedback(null), 4000)
  }

  return (
    <>
      {/* Header */}
      <PageHeader>
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-gold" />
          <h1 className="text-2xl font-bold text-glow text-gold">{'\u5192\u967a\u65e5\u8a8c'}</h1>
        </div>
      </PageHeader>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Calendar */}
        <CalendarGrid
          year={year}
          month={month}
          entries={entries}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        {/* Journal Editor */}
        {selectedDate && (
          <div className="rpg-frame p-4 space-y-4">
            <h3 className="text-base font-bold text-gold">
              {formatDateDisplay(selectedDate)}
            </h3>

            {/* Mood selector */}
            <div>
              <p className="text-sm text-text-secondary mb-2">{'\u4eca\u65e5\u306e\u6c17\u5206'}</p>
              <MoodSelector value={mood} onChange={setMood} />
            </div>

            {/* Content textarea */}
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={'\u4eca\u65e5\u306e\u5192\u967a\u3092\u8a18\u9332\u3057\u3088\u3046...'}
                rows={6}
                className="w-full bg-bg-secondary border border-border-rpg rounded-lg p-3 text-foreground placeholder-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-gold resize-none"
              />
            </div>

            {/* Save button + feedback */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="rpg-button flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? '\u4fdd\u5b58\u4e2d...' : '\u4fdd\u5b58\u3059\u308b'}
              </button>

              {feedback && (
                <span
                  className={`flex items-center gap-1 text-sm ${
                    feedback.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {feedback.message}
                </span>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
