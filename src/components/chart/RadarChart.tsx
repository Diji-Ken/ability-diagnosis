import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import type { CoreParams } from "@/types/diagnosis";

interface RadarChartProps {
  params: CoreParams;
  size?: number;
}

const AXIS_LABELS: Record<keyof CoreParams, string> = {
  communication: "コミュ力",
  specialist: "専門スキル",
  marketing: "マーケ力",
  ai: "AIスキル",
};

export function RadarChart({ params }: RadarChartProps) {
  const data = (Object.keys(AXIS_LABELS) as (keyof CoreParams)[]).map(
    (key) => ({
      axis: AXIS_LABELS[key],
      value: params[key],
      fullMark: 100,
    })
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="#8b735544" />
        <PolarAngleAxis
          dataKey="axis"
          tick={{ fill: "#e8e0d0", fontSize: 12, fontWeight: "bold" }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "#9a94a8", fontSize: 10 }}
          axisLine={false}
        />
        <Radar
          name="パラメータ"
          dataKey="value"
          stroke="#ffd700"
          fill="#ffd700"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
