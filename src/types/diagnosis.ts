export interface CoreParams {
  communication: number; // コミュニケーション力 (0-100)
  specialist: number; // 専門スキル (0-100)
  marketing: number; // マーケティングスキル (0-100)
  ai: number; // AIスキル (0-100)
}

export interface SubParams {
  selfBranding: number; // セルフブランディング力
  execution: number; // 実行力・スピード
  learning: number; // 学習・適応力
  trust: number; // 人間力・信頼構築力
  monetize: number; // マネタイズ力
  direction: number; // ディレクション力
}

// 3分類（MOON/EARTH/SUN）
export type Group3 = "MOON" | "EARTH" | "SUN";

export interface DiagnosisState {
  currentStep: 1 | 2 | 3;
  birthday: { year: number; month: number; day: number } | null;
  animalResult: AnimalResult | null;
  numerologyResult: NumerologyResult | null;
  occupation: string | null;
  skillAnswers: Record<string, number>;
  coreParams: CoreParams | null;
  jobResult: JobMatchResult | null;
}

export interface AnimalResult {
  number: number;
  animal: string;
  character: string;
  group: Group3;
  personality: string;
  detailedPersonality: string;
  workStyle: string;
  growthAdvice: string;
  strengths: string[];
  careerHints: string[];
  paramModifiers: CoreParams;
}

export interface NumerologyResult {
  lifePath: number;
  name: string;
  description: string;
  careerTraits: string[];
  paramModifiers: CoreParams;
}

export interface Mascot {
  name: string;
  animalMotif: string;
  description: string;
}

export interface Job {
  id: string;
  name: string;
  title: string;
  tier: "basic" | "standard" | "expert" | "legend";
  description: string;
  catchphrase: string;
  imageUrl: string;
  mascot: Mascot;
  requiredParams: CoreParams;
  weights: CoreParams;
  subParams: SubParams;
  advancedJobs: string[];
  actionPlan: string[];
  compatibleAnimals: number[];
}

export interface JobMatchResult {
  primaryJob: Job;
  matchScore: number;
  runnerUp: Job;
  advancedJobs: Job[];
  coreParams: CoreParams;
  subParams: SubParams;
}

export interface SkillQuestion {
  id: string;
  text: string;
  axis: keyof CoreParams;
  options: { label: string; value: number }[];
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  questions: SkillQuestion[];
}

export interface Occupation {
  id: string;
  label: string;
  category: string;
}

export interface ShareData {
  j: string; // ジョブID
  s: number; // マッチスコア
  p: number[]; // 4軸パラメータ [comm, spec, mktg, ai]
  a: number; // 動物番号
  n: number; // ライフパスナンバー
}
