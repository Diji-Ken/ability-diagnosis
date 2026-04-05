import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Legend,
} from 'recharts'
import type { CoreParams } from '@/types/diagnosis'

const paramLabels: Record<keyof CoreParams, string> = {
  communication: 'コミュ力',
  specialist: '専門スキル',
  marketing: 'マーケ力',
  ai: 'AIスキル',
}

interface ComparisonRadarChartProps {
  paramsA: CoreParams
  paramsB: CoreParams
  nameA: string
  nameB: string
}

export function ComparisonRadarChart({ paramsA, paramsB, nameA, nameB }: ComparisonRadarChartProps) {
  const keys: (keyof CoreParams)[] = ['communication', 'specialist', 'marketing', 'ai']

  const data = keys.map(key => ({
    subject: paramLabels[key],
    [nameA]: paramsA[key],
    [nameB]: paramsB[key],
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="#2a2940" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#9a94a8', fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: '#9a94a8', fontSize: 10 }}
          axisLine={false}
        />
        <Radar
          name={nameA}
          dataKey={nameA}
          stroke="#ffd700"
          fill="#ffd700"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Radar
          name={nameB}
          dataKey={nameB}
          stroke="#4fc3f7"
          fill="#4fc3f7"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, color: '#9a94a8' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
