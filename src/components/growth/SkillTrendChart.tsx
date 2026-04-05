import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { CoreParams } from '@/types/diagnosis'

interface SkillTrendChartProps {
  history: Array<{ date: string; params: CoreParams }>
}

const SKILL_LINES = [
  { key: 'communication', name: 'コミュニケーション', color: '#ffd700' },
  { key: 'specialist', name: 'スペシャリスト', color: '#60a5fa' },
  { key: 'marketing', name: 'マーケティング', color: '#fb923c' },
  { key: 'ai', name: 'AI', color: '#a78bfa' },
] as const

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null

  return (
    <div className="bg-bg-card border border-border-rpg rounded-lg p-3 shadow-lg">
      <p className="text-text-secondary text-xs mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  )
}

export function SkillTrendChart({ history }: SkillTrendChartProps) {
  const chartData = history.map((h) => ({
    date: formatDate(h.date),
    communication: h.params.communication,
    specialist: h.params.specialist,
    marketing: h.params.marketing,
    ai: h.params.ai,
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2940" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#9a94a8', fontSize: 12 }}
          stroke="#2a2940"
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: '#9a94a8', fontSize: 12 }}
          stroke="#2a2940"
        />
        <Tooltip content={<CustomTooltip />} />
        {SKILL_LINES.map((skill) => (
          <Line
            key={skill.key}
            type="monotone"
            dataKey={skill.key}
            name={skill.name}
            stroke={skill.color}
            strokeWidth={2}
            dot={{ fill: skill.color, r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
