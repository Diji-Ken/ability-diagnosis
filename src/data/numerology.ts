import type { NumerologyResult } from "@/types/diagnosis";

export const NUMEROLOGY_DATA: Record<number, Omit<NumerologyResult, "lifePath">> = {
  1: {
    name: "リーダー",
    description:
      "独立心が強く、自ら道を切り開くパイオニア。周囲を引っ張る力がある。新しいことを始める才能に恵まれている。",
    careerTraits: [
      "先頭に立って引っ張るタイプ",
      "独立・起業に向いている",
      "新しい市場やサービスを切り開く力がある",
    ],
    paramModifiers: { communication: 3, specialist: 0, marketing: 5, ai: 0 },
  },
  2: {
    name: "協調者",
    description:
      "調和を重んじ、人と人を繋ぐ架け橋。繊細な感性で場の空気を読み、最適な調整ができる。",
    careerTraits: [
      "チームワークを活かす仕事が得意",
      "パートナーシップで力を発揮",
      "サポート・調整役で真価を発揮",
    ],
    paramModifiers: { communication: 7, specialist: -3, marketing: 0, ai: 0 },
  },
  3: {
    name: "表現者",
    description:
      "創造性とコミュニケーション力に溢れた表現者。アイデアを形にし、人に伝える天才。楽観的で社交的。",
    careerTraits: [
      "クリエイティブな仕事で才能を発揮",
      "プレゼンや発信が得意",
      "エンタメ性のある仕事に適性あり",
    ],
    paramModifiers: { communication: 5, specialist: 0, marketing: 3, ai: 0 },
  },
  4: {
    name: "建築家",
    description:
      "堅実で計画的な努力家。基盤を築き、着実に積み上げていく力がある。信頼性が高く、安定した成果を出す。",
    careerTraits: [
      "システム構築・基盤づくりが得意",
      "計画的で着実な進め方",
      "長期プロジェクトに強い",
    ],
    paramModifiers: { communication: -3, specialist: 7, marketing: -3, ai: 3 },
  },
  5: {
    name: "冒険家",
    description:
      "自由を愛し、変化を恐れない冒険者。多才で適応力が高い。新しい経験を求めて常に動き続ける。",
    careerTraits: [
      "変化の多い環境で力を発揮",
      "マルチスキルを活かした仕事",
      "トレンドを掴む嗅覚がある",
    ],
    paramModifiers: { communication: 3, specialist: 0, marketing: 3, ai: 3 },
  },
  6: {
    name: "奉仕者",
    description:
      "責任感が強く、人の役に立つことに喜びを感じる。美的センスもあり、調和のとれた環境を作り出す。",
    careerTraits: [
      "人を支える仕事に向いている",
      "美意識を活かしたクリエイティブ",
      "教育・コンサルで力を発揮",
    ],
    paramModifiers: { communication: 5, specialist: 3, marketing: 0, ai: -3 },
  },
  7: {
    name: "探究者",
    description:
      "深い思考力と分析力を持つ知性派。物事の本質を見抜く目があり、専門分野で卓越した成果を出す。",
    careerTraits: [
      "分析・リサーチが得意",
      "専門特化型のキャリアに強み",
      "独自の知見を武器にできる",
    ],
    paramModifiers: { communication: -5, specialist: 7, marketing: 0, ai: 5 },
  },
  8: {
    name: "達成者",
    description:
      "目標達成力と実行力に優れたビジネスの才人。物質的な成功を引き寄せる力があり、組織運営にも長ける。",
    careerTraits: [
      "ビジネスセンスが抜群",
      "マネジメントに適性あり",
      "収益化・スケールが得意",
    ],
    paramModifiers: { communication: 3, specialist: 0, marketing: 5, ai: 0 },
  },
  9: {
    name: "賢者",
    description:
      "広い視野と深い理解力を持つ完成者。人道的な価値観を持ち、大きなスケールで物事を考えられる。",
    careerTraits: [
      "大局的な視点での判断が得意",
      "多様な経験を統合する力がある",
      "教育・メンタリングに適性あり",
    ],
    paramModifiers: { communication: 3, specialist: 3, marketing: 0, ai: 3 },
  },
  11: {
    name: "直感のマスター",
    description:
      "鋭い直感と霊感に恵まれたマスターナンバー。理想を現実にする橋渡し役。インスピレーションの源泉。",
    careerTraits: [
      "直感を活かした意思決定が強み",
      "ビジョナリーとしての才能",
      "人を導く・啓蒙する力がある",
    ],
    paramModifiers: { communication: 5, specialist: 0, marketing: 5, ai: 0 },
  },
  22: {
    name: "建設のマスター",
    description:
      "大きなビジョンを現実の形にするマスタービルダー。壮大な計画を実行に移す力を持つ稀有な存在。",
    careerTraits: [
      "大規模プロジェクトの推進力",
      "ビジョンを形にする実行力",
      "組織づくりの天才",
    ],
    paramModifiers: { communication: 3, specialist: 5, marketing: 3, ai: 3 },
  },
  33: {
    name: "愛のマスター",
    description:
      "無償の愛と奉仕精神を持つ最高のマスターナンバー。人を癒し、導く使命を持つ。影響力が非常に大きい。",
    careerTraits: [
      "人を癒す・導く仕事に天職",
      "大きな影響力を発揮できる",
      "コミュニティの精神的支柱になれる",
    ],
    paramModifiers: { communication: 7, specialist: 0, marketing: 3, ai: 0 },
  },
};
