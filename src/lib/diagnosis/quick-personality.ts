export interface QuickPersonalityQuestion {
  id: string;
  text: string;
  options: {
    label: string;
    jobLean: number; // 0-3 (higher = job-oriented)
    loveLean: number; // 0-3 (higher = love-oriented)
  }[];
}

export const QUICK_PERSONALITY_QUESTIONS: QuickPersonalityQuestion[] = [
  {
    id: "qp-1",
    text: "今、人生で一番投資したい時間は？",
    options: [
      { label: "仕事・キャリアの成長", jobLean: 3, loveLean: 0 },
      { label: "人との関係性・繋がり", jobLean: 0, loveLean: 3 },
      { label: "両方とも同じくらい", jobLean: 1, loveLean: 1 },
      { label: "まだ模索中", jobLean: 1, loveLean: 1 },
    ],
  },
  {
    id: "qp-2",
    text: "休日にあなたが嬉しいのは？",
    options: [
      { label: "新しいスキルを学ぶこと", jobLean: 3, loveLean: 0 },
      { label: "大切な人と過ごす時間", jobLean: 0, loveLean: 3 },
      { label: "一人でリフレッシュする時間", jobLean: 1, loveLean: 0 },
      { label: "友人と賑やかに過ごす時間", jobLean: 0, loveLean: 2 },
    ],
  },
  {
    id: "qp-3",
    text: "困っている時に頼るのは？",
    options: [
      { label: "専門書・データ", jobLean: 3, loveLean: 0 },
      { label: "信頼できる友人", jobLean: 0, loveLean: 3 },
      { label: "上司・メンター", jobLean: 2, loveLean: 1 },
      { label: "まずは自分で考える", jobLean: 1, loveLean: 1 },
    ],
  },
  {
    id: "qp-4",
    text: "あなたが「自分らしい」と感じる瞬間は？",
    options: [
      { label: "成果を出した時", jobLean: 3, loveLean: 0 },
      { label: "感謝された時", jobLean: 1, loveLean: 2 },
      { label: "深い会話ができた時", jobLean: 0, loveLean: 3 },
      { label: "挑戦している時", jobLean: 2, loveLean: 1 },
    ],
  },
];

export interface QuickPersonalityResult {
  jobScore: number; // 0-100
  loveScore: number; // 0-100
  recommendation: "job" | "love" | "balanced";
}

export function computeQuickPersonality(
  answers: Record<string, number>,
): QuickPersonalityResult {
  let jobRaw = 0;
  let loveRaw = 0;
  let max = 0;
  for (const q of QUICK_PERSONALITY_QUESTIONS) {
    const idx = answers[q.id];
    const opt = q.options[idx];
    if (opt) {
      jobRaw += opt.jobLean;
      loveRaw += opt.loveLean;
    }
    max += 3;
  }
  const jobScore = Math.round((jobRaw / max) * 100);
  const loveScore = Math.round((loveRaw / max) * 100);
  const diff = jobScore - loveScore;
  const recommendation: "job" | "love" | "balanced" =
    diff > 15 ? "job" : diff < -15 ? "love" : "balanced";
  return { jobScore, loveScore, recommendation };
}
