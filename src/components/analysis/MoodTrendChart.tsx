import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'

interface MoodTrendChartProps {
  data: Array<{ date: string; mood: number | null }>
}

const moodLabels: Record<number, string> = {
  1: '最悪',
  2: 'いまいち',
  3: '普通',
  4: 'いい感じ',
  5: '最高',
}

export function MoodTrendChart({ data }: MoodTrendChartProps) {
  const chartData = data
    .filter(d => d.mood !== null)
    .map(d => ({
      date: d.date.slice(5), // MM-DD
      mood: d.mood,
    }))

  if (chartData.length < 2) {
    return (
      <div className="text-center py-8 text-text-secondary text-sm">
        ムードデータが不足しています（2日分以上必要）
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2940" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#9a94a8', fontSize: 11 }}
          axisLine={{ stroke: '#2a2940' }}
        />
        <YAxis
          domain={[1, 5]}
          ticks={[1, 2, 3, 4, 5]}
          tick={{ fill: '#9a94a8', fontSize: 11 }}
          axisLine={{ stroke: '#2a2940' }}
          width={30}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1a1930',
            border: '1px solid #8b7355',
            borderRadius: '8px',
            color: '#e8e0d0',
            fontSize: 12,
          }}
          formatter={(value) => [moodLabels[value as number] || value, 'ムード']}
        />
        <Line
          type="monotone"
          dataKey="mood"
          stroke="#ffd700"
          strokeWidth={2}
          dot={{ fill: '#ffd700', r: 4 }}
          activeDot={{ r: 6, fill: '#ffe44d' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
