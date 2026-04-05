import type { AnimalResult, Group3 } from "@/types/diagnosis";
import { ANIMAL_TRAITS, getAnimalCharacter } from "@/data/animals";

// 3グループ分類（公式準拠）
const GROUP3_MAP: Record<string, Group3> = {
  こじか: "MOON",
  たぬき: "MOON",
  ひつじ: "MOON",
  黒ひょう: "MOON",
  コアラ: "EARTH",
  狼: "EARTH",
  猿: "EARTH",
  虎: "EARTH",
  ゾウ: "SUN",
  チータ: "SUN",
  ペガサス: "SUN",
  ライオン: "SUN",
};

// 3グループ表示情報
export const GROUP_DESCRIPTIONS = {
  SUN: {
    name: "太陽グループ（SUN）",
    description: "自分の意志で道を切り開く。直感と行動力が武器。",
    color: "#ff6b35",
  },
  MOON: {
    name: "月グループ（MOON）",
    description: "周囲との調和を大切にする。共感力と適応力が武器。",
    color: "#4fc3f7",
  },
  EARTH: {
    name: "地球グループ（EARTH）",
    description: "現実的で堅実。計画性と実行力が武器。",
    color: "#66bb6a",
  },
};

// ============================================================
// JDN（ユリウス日）ベースの計算
// ============================================================

function toJDN(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

/**
 * 生年月日から60分類キャラクター番号を算出（JDN方式）
 * 検証済み: 1970/10/12 → #2（社交家のたぬき）, 1957/4/29 → #8（磨き上げられたたぬき）
 */
export function calculateAnimalNumber(
  year: number,
  month: number,
  day: number
): number {
  const jdn = toJDN(year, month, day);
  return ((jdn + 49) % 60) + 1;
}

/** 3グループを取得（動物タイプで決定） */
export function getGroup3(animal: string): Group3 {
  return GROUP3_MAP[animal] || "EARTH";
}

/**
 * 動物占い結果を取得
 */
export function getAnimalResult(
  year: number,
  month: number,
  day: number
): AnimalResult {
  const number = calculateAnimalNumber(year, month, day);
  const char = getAnimalCharacter(number);
  const traits = ANIMAL_TRAITS[char.animal];

  return {
    number,
    animal: char.animal,
    character: char.character,
    group: getGroup3(char.animal),
    personality: char.personality,
    detailedPersonality: char.detailedPersonality || "",
    workStyle: char.workStyle || "",
    growthAdvice: char.growthAdvice || "",
    strengths: traits.strengths,
    careerHints: traits.careerHints,
    paramModifiers: traits.paramModifiers,
  };
}

/**
 * 12動物の一覧
 */
export const ANIMAL_TYPES = [
  "チータ", "たぬき", "猿", "コアラ", "黒ひょう", "虎",
  "こじか", "ゾウ", "狼", "ひつじ", "ペガサス", "ライオン",
] as const;
