import type { NumerologyResult } from "@/types/diagnosis";
import { NUMEROLOGY_DATA } from "@/data/numerology";

/**
 * ライフパスナンバー算出
 * 生年月日の各桁を合計し、1桁（またはマスターナンバー11,22,33）になるまで繰り返す
 */
export function calculateLifePathNumber(
  year: number,
  month: number,
  day: number
): number {
  const digits = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
  let sum = digits
    .split("")
    .reduce((acc, d) => acc + parseInt(d, 10), 0);

  // マスターナンバー（11, 22, 33）はそのまま返す
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum)
      .split("")
      .reduce((acc, d) => acc + parseInt(d, 10), 0);
  }

  return sum;
}

/**
 * 数秘術の結果を取得
 */
export function getNumerologyResult(
  year: number,
  month: number,
  day: number
): NumerologyResult {
  const lifePath = calculateLifePathNumber(year, month, day);
  const data = NUMEROLOGY_DATA[lifePath] || NUMEROLOGY_DATA[9]; // フォールバック

  return {
    lifePath,
    ...data,
  };
}
