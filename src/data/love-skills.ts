import type { SkillCategory, Occupation } from "@/types/diagnosis";

// Love skill categories reuse the CoreParams axes (communication/specialist/marketing/ai)
// but reinterpret them as love skills:
// - communication → 共感力 (Empathy)
// - specialist    → アプローチ力 (Initiative)
// - marketing     → 関係構築力 (Bonding)
// - ai            → 自己表現力 (Charisma)
export const LOVE_SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "communication",
    label: "共感力",
    icon: "Heart",
    questions: [
      {
        id: "love-empathy-1",
        text: "相手の小さな変化や気持ちに気づけますか？",
        axis: "communication",
        options: [
          { label: "気づけないことが多い", value: 0 },
          { label: "明らかな変化は気づく", value: 1 },
          { label: "表情や声のトーンで察する", value: 2 },
          { label: "相手自身も気づいていない感情を読み取れる", value: 3 },
        ],
      },
      {
        id: "love-empathy-2",
        text: "相手が悩んでいる時、どう接しますか？",
        axis: "communication",
        options: [
          { label: "どう接したらいいか分からない", value: 0 },
          { label: "解決策をアドバイスする", value: 1 },
          { label: "まず話を聴いて気持ちに寄り添う", value: 2 },
          { label: "言葉なしで安心感を与えられる", value: 3 },
        ],
      },
      {
        id: "love-empathy-3",
        text: "ケンカした時、相手の立場で考えられますか？",
        axis: "communication",
        options: [
          { label: "自分の正しさを主張してしまう", value: 0 },
          { label: "後から振り返れば理解できる", value: 1 },
          { label: "その場で相手の気持ちを想像できる", value: 2 },
          { label: "仲直りを主導できる", value: 3 },
        ],
      },
    ],
  },
  {
    id: "specialist",
    label: "アプローチ力",
    icon: "Zap",
    questions: [
      {
        id: "love-initiative-1",
        text: "気になる人に自分から声をかけられますか？",
        axis: "specialist",
        options: [
          { label: "勇気が出ない", value: 0 },
          { label: "きっかけがあれば話せる", value: 1 },
          { label: "自然に話しかけられる", value: 2 },
          { label: "相手から好印象を持たれるアプローチができる", value: 3 },
        ],
      },
      {
        id: "love-initiative-2",
        text: "デートの誘い方に自信はありますか？",
        axis: "specialist",
        options: [
          { label: "誘ったことがほぼない", value: 0 },
          { label: "ドキドキしながら誘う", value: 1 },
          { label: "相手が喜ぶプランで誘える", value: 2 },
          { label: "断られないデートプランを作れる", value: 3 },
        ],
      },
      {
        id: "love-initiative-3",
        text: "新しい出会いの場に積極的に行きますか？",
        axis: "specialist",
        options: [
          { label: "ほぼ行かない", value: 0 },
          { label: "誘われたら行く", value: 1 },
          { label: "自分から機会を作る", value: 2 },
          { label: "出会いを自分でデザインできる", value: 3 },
        ],
      },
    ],
  },
  {
    id: "marketing",
    label: "関係構築力",
    icon: "HeartHandshake",
    questions: [
      {
        id: "love-bonding-1",
        text: "長く続いた恋愛関係はありますか？",
        axis: "marketing",
        options: [
          { label: "短期で終わることが多い", value: 0 },
          { label: "半年〜1年ほど", value: 1 },
          { label: "複数年の関係を築いた経験あり", value: 2 },
          { label: "長期的に信頼を深めてきた経験が豊富", value: 3 },
        ],
      },
      {
        id: "love-bonding-2",
        text: "相手との約束や記念日を大切にできますか？",
        axis: "marketing",
        options: [
          { label: "忘れてしまうことが多い", value: 0 },
          { label: "大事な日は覚えている", value: 1 },
          { label: "記念日や約束を自分から計画する", value: 2 },
          { label: "日々の小さな約束まで丁寧に守る", value: 3 },
        ],
      },
      {
        id: "love-bonding-3",
        text: "倦怠期や距離ができた時の対処経験は？",
        axis: "marketing",
        options: [
          { label: "そのまま離れてしまうことが多い", value: 0 },
          { label: "相手次第で変わる", value: 1 },
          { label: "自分から関係を立て直せる", value: 2 },
          { label: "どんな関係でも深められる自信がある", value: 3 },
        ],
      },
    ],
  },
  {
    id: "ai",
    label: "自己表現力",
    icon: "Sparkles",
    questions: [
      {
        id: "love-charisma-1",
        text: "自分の魅力を相手に伝えられますか？",
        axis: "ai",
        options: [
          { label: "自分に自信がない", value: 0 },
          { label: "頑張れば伝えられる", value: 1 },
          { label: "自然体で魅力を見せられる", value: 2 },
          { label: "会った瞬間に印象を残せる", value: 3 },
        ],
      },
      {
        id: "love-charisma-2",
        text: "自分の感情や愛情を言葉にできますか？",
        axis: "ai",
        options: [
          { label: "表現するのが苦手", value: 0 },
          { label: "たまに伝える", value: 1 },
          { label: "定期的に気持ちを言葉にしている", value: 2 },
          { label: "相手を何度も感動させる言葉を紡げる", value: 3 },
        ],
      },
      {
        id: "love-charisma-3",
        text: "外見やファッションのケアはしていますか？",
        axis: "ai",
        options: [
          { label: "あまり気にしていない", value: 0 },
          { label: "最低限は整える", value: 1 },
          { label: "自分らしさを演出している", value: 2 },
          { label: "TPOに合わせて魅力を最大化できる", value: 3 },
        ],
      },
      {
        id: "love-charisma-4",
        text: "あなたが現在もっとも近い状況は？",
        axis: "ai",
        options: [
          { label: "これから恋愛を始めたい", value: 1 },
          { label: "気になる人がいる", value: 2 },
          { label: "交際中", value: 2 },
          { label: "まだ模索中", value: 1 },
        ],
      },
    ],
  },
];

export const LOVE_OCCUPATIONS: Occupation[] = [
  { id: "single", label: "フリー（出会いを探したい）", category: "独身" },
  { id: "crush", label: "気になる人がいる", category: "片思い" },
  { id: "approach", label: "アプローチ中", category: "アプローチ" },
  { id: "dating", label: "交際中（初期）", category: "交際中" },
  { id: "long", label: "交際中（長期）", category: "交際中" },
  { id: "married", label: "既婚", category: "既婚" },
  { id: "rebuild", label: "関係を立て直したい", category: "再構築" },
  { id: "exploring", label: "まだ模索中", category: "模索中" },
];
