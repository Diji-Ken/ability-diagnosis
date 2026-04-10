import type {
  CoreParams,
  SubParams,
  AnimalResult,
  NumerologyResult,
  SkillCategory,
} from "@/types/diagnosis";

/**
 * スキル棚卸しの回答からコアパラメータ4軸を算出
 *
 * @param answers 質問IDと回答値のマップ
 * @param animalResult 動物結果（補正値取得）
 * @param numerologyResult 数秘結果（補正値取得）
 * @param categories 質問カテゴリ配列（track別）
 */
export function calculateCoreParams(
  answers: Record<string, number>,
  animalResult: AnimalResult,
  numerologyResult: NumerologyResult,
  categories: SkillCategory[],
): CoreParams {
  // 各軸の回答スコアを集計
  const rawScores: CoreParams = {
    communication: 0,
    specialist: 0,
    marketing: 0,
    ai: 0,
  };
  const maxScores: CoreParams = {
    communication: 0,
    specialist: 0,
    marketing: 0,
    ai: 0,
  };

  for (const category of categories) {
    for (const question of category.questions) {
      const axis = question.axis;
      const answer = answers[question.id] ?? 0;
      rawScores[axis] += answer;
      maxScores[axis] += Math.max(...question.options.map((o) => o.value));
    }
  }

  // ノーマライズ（0-80にスケール、残り20は補正で加算）
  const normalized: CoreParams = {
    communication:
      maxScores.communication > 0
        ? Math.round((rawScores.communication / maxScores.communication) * 80)
        : 0,
    specialist:
      maxScores.specialist > 0
        ? Math.round((rawScores.specialist / maxScores.specialist) * 80)
        : 0,
    marketing:
      maxScores.marketing > 0
        ? Math.round((rawScores.marketing / maxScores.marketing) * 80)
        : 0,
    ai:
      maxScores.ai > 0
        ? Math.round((rawScores.ai / maxScores.ai) * 80)
        : 0,
  };

  // 動物占い・数秘術の修正値を加算
  const axes: (keyof CoreParams)[] = [
    "communication",
    "specialist",
    "marketing",
    "ai",
  ];
  for (const axis of axes) {
    normalized[axis] +=
      animalResult.paramModifiers[axis] +
      numerologyResult.paramModifiers[axis];
    // クランプ (5-100)  — 最低5を保証してレーダーチャートが見えるように
    normalized[axis] = Math.max(5, Math.min(100, normalized[axis]));
  }

  return normalized;
}

/**
 * コアパラメータからサブパラメータを算出
 */
export function calculateSubParams(
  coreParams: CoreParams,
  animalResult: AnimalResult
): SubParams {
  const { communication, specialist, marketing, ai } = coreParams;
  const isLeaderType =
    animalResult.group === "SUN" || animalResult.animal === "ライオン";

  return {
    selfBranding: clamp(
      Math.round(marketing * 0.4 + communication * 0.3 + (isLeaderType ? 10 : 0))
    ),
    execution: clamp(
      Math.round(specialist * 0.3 + ai * 0.3 + marketing * 0.2 + 15)
    ),
    learning: clamp(
      Math.round(ai * 0.4 + specialist * 0.3 + 15)
    ),
    trust: clamp(
      Math.round(
        communication * 0.5 + (animalResult.group === "MOON" ? 15 : 5)
      )
    ),
    monetize: clamp(
      Math.round(marketing * 0.5 + communication * 0.2 + ai * 0.1)
    ),
    direction: clamp(
      Math.round(
        communication * 0.3 + specialist * 0.2 + marketing * 0.2 + (isLeaderType ? 10 : 0)
      )
    ),
  };
}

function clamp(value: number, min = 5, max = 100): number {
  return Math.max(min, Math.min(max, value));
}
