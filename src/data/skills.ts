import type { SkillCategory, Occupation } from "@/types/diagnosis";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "communication",
    label: "コミュニケーション力",
    icon: "MessageCircle",
    questions: [
      {
        id: "comm-1",
        text: "クライアントやチームメンバーとのやり取りはスムーズですか？",
        axis: "communication",
        options: [
          { label: "苦手意識がある", value: 0 },
          { label: "最低限はできる", value: 1 },
          { label: "スムーズにできる", value: 2 },
          { label: "高い評価を受けている", value: 3 },
        ],
      },
      {
        id: "comm-2",
        text: "相手の要望や課題を汲み取る力はどの程度ですか？",
        axis: "communication",
        options: [
          { label: "言われたことをそのまま受け取る", value: 0 },
          { label: "質問しながら理解する", value: 1 },
          { label: "行間を読んで提案できる", value: 2 },
          { label: "相手も気づいていない課題を引き出せる", value: 3 },
        ],
      },
      {
        id: "comm-3",
        text: "プレゼンや提案の経験はどの程度ですか？",
        axis: "communication",
        options: [
          { label: "ほぼ経験がない", value: 0 },
          { label: "たまにやる程度", value: 1 },
          { label: "定期的に行っている", value: 2 },
          { label: "プレゼンで案件を獲得した実績がある", value: 3 },
        ],
      },
    ],
  },
  {
    id: "specialist",
    label: "専門スキル",
    icon: "Wrench",
    questions: [
      {
        id: "spec-1",
        text: "あなたの専門分野での実務経験はどの程度ですか？",
        axis: "specialist",
        options: [
          { label: "学習中", value: 0 },
          { label: "1〜2年の実務経験", value: 1 },
          { label: "3〜5年の実務経験", value: 2 },
          { label: "5年以上、その分野のプロとして活動", value: 3 },
        ],
      },
      {
        id: "spec-2",
        text: "ポートフォリオや実績として見せられるものはありますか？",
        axis: "specialist",
        options: [
          { label: "まだない", value: 0 },
          { label: "いくつかある", value: 1 },
          { label: "充実している", value: 2 },
          { label: "業界で認知されるレベル", value: 3 },
        ],
      },
      {
        id: "spec-3",
        text: "新しい技術やトレンドへの対応はどうですか？",
        axis: "specialist",
        options: [
          { label: "あまり追いかけていない", value: 0 },
          { label: "ニュースは見ている", value: 1 },
          { label: "積極的に学習・実践している", value: 2 },
          { label: "自ら発信・提案するレベル", value: 3 },
        ],
      },
      {
        id: "spec-4",
        text: "専門分野は何ですか？（もっとも近いもの）",
        axis: "specialist",
        options: [
          { label: "デザイン / クリエイティブ", value: 2 },
          { label: "エンジニアリング / 開発", value: 2 },
          { label: "ライティング / 編集", value: 2 },
          { label: "その他 / まだ模索中", value: 1 },
        ],
      },
    ],
  },
  {
    id: "marketing",
    label: "マーケティングスキル",
    icon: "TrendingUp",
    questions: [
      {
        id: "mktg-1",
        text: "集客やマーケティングの経験はありますか？",
        axis: "marketing",
        options: [
          { label: "経験がない", value: 0 },
          { label: "SNS発信くらい", value: 1 },
          { label: "広告運用やSEOの経験あり", value: 2 },
          { label: "マーケ戦略を設計・実行した実績あり", value: 3 },
        ],
      },
      {
        id: "mktg-2",
        text: "自分自身や商品のブランディングはできていますか？",
        axis: "marketing",
        options: [
          { label: "考えたことがない", value: 0 },
          { label: "なんとなく意識している", value: 1 },
          { label: "明確なポジショニングがある", value: 2 },
          { label: "ブランドとして認知されている", value: 3 },
        ],
      },
      {
        id: "mktg-3",
        text: "数字やデータに基づいた改善活動の経験は？",
        axis: "marketing",
        options: [
          { label: "感覚で判断することが多い", value: 0 },
          { label: "アクセス数くらいは見る", value: 1 },
          { label: "KPI設定と改善サイクルを回している", value: 2 },
          { label: "データドリブンな意思決定を徹底している", value: 3 },
        ],
      },
    ],
  },
  {
    id: "ai",
    label: "AIスキル",
    icon: "Sparkles",
    questions: [
      {
        id: "ai-1",
        text: "AIツール（ChatGPT、Claude、Midjourney等）の利用頻度は？",
        axis: "ai",
        options: [
          { label: "ほぼ使っていない", value: 0 },
          { label: "たまに使う", value: 1 },
          { label: "毎日の業務で使っている", value: 2 },
          { label: "業務の中核にAIを組み込んでいる", value: 3 },
        ],
      },
      {
        id: "ai-2",
        text: "プロンプトエンジニアリングのスキルは？",
        axis: "ai",
        options: [
          { label: "プロンプトって何？", value: 0 },
          { label: "基本的な指示は出せる", value: 1 },
          { label: "効果的なプロンプトを設計できる", value: 2 },
          { label: "複雑なワークフローをプロンプトで自動化できる", value: 3 },
        ],
      },
      {
        id: "ai-3",
        text: "AIを活用した業務効率化や自動化の経験は？",
        axis: "ai",
        options: [
          { label: "経験がない", value: 0 },
          { label: "簡単な作業をAIで効率化した", value: 1 },
          { label: "AIワークフローを複数構築した", value: 2 },
          { label: "AIを使ったサービスや商品を開発した", value: 3 },
        ],
      },
    ],
  },
];

export const OCCUPATIONS: Occupation[] = [
  { id: "designer", label: "デザイナー", category: "クリエイティブ" },
  { id: "engineer", label: "エンジニア / プログラマー", category: "テクノロジー" },
  { id: "writer", label: "ライター / 編集者", category: "クリエイティブ" },
  { id: "marketer", label: "マーケター", category: "ビジネス" },
  { id: "video", label: "動画クリエイター", category: "クリエイティブ" },
  { id: "photographer", label: "フォトグラファー", category: "クリエイティブ" },
  { id: "consultant", label: "コンサルタント", category: "ビジネス" },
  { id: "sales", label: "営業 / セールス", category: "ビジネス" },
  { id: "pm", label: "PM / ディレクター", category: "マネジメント" },
  { id: "educator", label: "講師 / トレーナー", category: "教育" },
  { id: "sns", label: "SNS運用 / インフルエンサー", category: "マーケティング" },
  { id: "student", label: "学生（就活中）", category: "学生" },
  { id: "office", label: "会社員（転職検討中）", category: "会社員" },
  { id: "other", label: "その他", category: "その他" },
];
