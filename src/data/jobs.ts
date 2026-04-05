import type { Job } from "@/types/diagnosis";

export const JOBS: Job[] = [
  // ========================================
  // ベーシック（9ジョブ）
  // ========================================

  // 1. AI見習い魔導士 — A特化
  {
    id: "ai-apprentice",
    name: "AI見習い魔導士",
    title: "電脳の卵",
    tier: "basic",
    description:
      "AIツールの可能性に目覚め、プロンプトという呪文の基礎を学び始めた見習い。ChatGPTやClaudeを日常的に使いこなし、少しずつ業務への組み込みを試みている。AI時代の波に乗る嗅覚は鋭い。",
    catchphrase: "AIの呪文を覚え始めた探求者",
    imageUrl: "/images/jobs/ai-apprentice.png",
    mascot: {
      name: "ホロン",
      animalMotif: "フクロウ",
      description:
        "夜の森で光る瞳を持つ小さなフクロウ。AIの知識を蓄えた本の塔に住み、新しい呪文を日々研究している。",
    },
    requiredParams: { communication: 25, specialist: 30, marketing: 20, ai: 70 },
    weights: { communication: 0.4, specialist: 0.5, marketing: 0.3, ai: 1.5 },
    subParams: {
      selfBranding: 35,
      execution: 60,
      learning: 80,
      trust: 30,
      monetize: 30,
      direction: 35,
    },
    advancedJobs: ["data-alchemist", "content-enchanter", "ai-tactician"],
    actionPlan: [
      "ChatGPTやClaudeに毎日1つ新しいプロンプトパターンを試す",
      "AIツールを使った業務改善を1つ実行し、before/afterを記録する",
      "AI活用の学びをSNSやブログでアウトプットする習慣を作る",
    ],
    compatibleAnimals: [7, 19, 34, 47, 59],
  },

  // 2. コード鍛冶師 — S特化
  {
    id: "code-blacksmith",
    name: "コード鍛冶師",
    title: "鉄の職人",
    tier: "basic",
    description:
      "プログラミングやデザインなど、専門スキルという名の鉄を日々打ち続ける鍛冶師。基礎の型は身についている。地道な反復練習を厭わず、いつか折れない刃を鍛え上げる。",
    catchphrase: "コードの炉で技術を打ち鍛える",
    imageUrl: "/images/jobs/code-blacksmith.png",
    mascot: {
      name: "テッカ",
      animalMotif: "ビーバー",
      description:
        "頑丈なダムを築き上げるビーバーの職人。コツコツと木を削り、誰よりも堅牢な構造物を生み出す。",
    },
    requiredParams: { communication: 20, specialist: 75, marketing: 15, ai: 30 },
    weights: { communication: 0.3, specialist: 1.5, marketing: 0.2, ai: 0.5 },
    subParams: {
      selfBranding: 25,
      execution: 75,
      learning: 70,
      trust: 40,
      monetize: 25,
      direction: 30,
    },
    advancedJobs: ["tech-commander", "data-alchemist", "mentor-hermit"],
    actionPlan: [
      "自分の専門分野で基礎となる技術書を1冊通しで完走する",
      "小さなプロジェクトを3つ完成させてポートフォリオに加える",
      "OSSへの貢献やコードレビューで他人のコードから学ぶ",
    ],
    compatibleAnimals: [8, 19, 40, 43, 48],
  },

  // 3. 伝令商人 — C特化
  {
    id: "messenger-peddler",
    name: "伝令商人",
    title: "言葉の使い",
    tier: "basic",
    description:
      "会話が最大の武器。誰とでもすぐ打ち解け、相手の本音を引き出す天性のコミュニケーター。信頼関係の構築スピードは群を抜く。人脈というインフラの設計者。",
    catchphrase: "言葉を運び、人の心を繋ぐ",
    imageUrl: "/images/jobs/messenger-peddler.png",
    mascot: {
      name: "ペロル",
      animalMotif: "インコ",
      description:
        "カラフルな羽根を持つおしゃべりなインコ。どんな言語も瞬時に覚え、人と人の間を飛び回って伝言を届ける。",
    },
    requiredParams: { communication: 75, specialist: 20, marketing: 25, ai: 15 },
    weights: { communication: 1.5, specialist: 0.3, marketing: 0.4, ai: 0.2 },
    subParams: {
      selfBranding: 50,
      execution: 45,
      learning: 40,
      trust: 80,
      monetize: 35,
      direction: 45,
    },
    advancedJobs: ["tech-commander", "brand-strategist", "soul-counselor"],
    actionPlan: [
      "毎週1人、新しい人と深い対話をする習慣を作る",
      "相手のニーズを3分以内に引き出すヒアリングスキルを磨く",
      "自分の人脈マップを可視化し、キーパーソンとの関係を強化する",
    ],
    compatibleAnimals: [9, 10, 24, 33, 55],
  },

  // 4. 市場斥候 — M特化
  {
    id: "market-scout",
    name: "市場斥候",
    title: "商いの目",
    tier: "basic",
    description:
      "マーケティングの基礎を身につけ、市場の動きを読もうと奔走する斥候。SNS運用やデータ分析に手を出し始め、何が売れるかの嗅覚を磨いている最中。",
    catchphrase: "数字と直感で市場の風を読む",
    imageUrl: "/images/jobs/market-scout.png",
    mascot: {
      name: "ミルカ",
      animalMotif: "ミーアキャット",
      description:
        "群れの中で最も早く危険を察知する見張り番。高い場所から市場の動向を見渡し、チャンスをいち早く仲間に伝える。",
    },
    requiredParams: { communication: 25, specialist: 20, marketing: 70, ai: 15 },
    weights: { communication: 0.4, specialist: 0.3, marketing: 1.5, ai: 0.2 },
    subParams: {
      selfBranding: 65,
      execution: 55,
      learning: 50,
      trust: 35,
      monetize: 70,
      direction: 40,
    },
    advancedJobs: ["brand-strategist", "content-enchanter", "growth-commander"],
    actionPlan: [
      "競合分析を3社分行い、差別化ポイントをレポートにまとめる",
      "SNSの投稿データを1ヶ月分析し、伸びるパターンを特定する",
      "小さな商品を1つ作り、実際に販売して市場の反応を体感する",
    ],
    compatibleAnimals: [13, 20, 28, 42, 51],
  },

  // 5. 駆け出し冒険者 — 全軸低め
  {
    id: "fledgling-adventurer",
    name: "駆け出し冒険者",
    title: "旅立ちの者",
    tier: "basic",
    description:
      "まだ何者でもないが、可能性は無限大。すべての軸がまだ発展途上だからこそ、どの方向にも伸びしろがある。大事なのは最初の一歩を踏み出したこと。全ジョブへの道が開かれている原石。",
    catchphrase: "すべてはここから。冒険の一歩目",
    imageUrl: "/images/jobs/fledgling-adventurer.png",
    mascot: {
      name: "ポチル",
      animalMotif: "子犬",
      description:
        "好奇心旺盛で何にでも飛びつく子犬。まだ小さいけれど、どんな冒険にもワクワクして駆け出していく元気の塊。",
    },
    requiredParams: { communication: 35, specialist: 30, marketing: 30, ai: 35 },
    weights: { communication: 1.0, specialist: 1.0, marketing: 1.0, ai: 1.0 },
    subParams: {
      selfBranding: 30,
      execution: 40,
      learning: 50,
      trust: 35,
      monetize: 25,
      direction: 30,
    },
    advancedJobs: [
      "ai-apprentice",
      "code-blacksmith",
      "messenger-peddler",
      "market-scout",
    ],
    actionPlan: [
      "4つの軸（コミュニケーション・専門スキル・マーケティング・AI）をそれぞれ1週間ずつ体験し、自分のワクワクする方向を見つける",
      "興味のある分野のオンライン講座やYouTubeで毎日30分インプットする",
      "小さくてもいいので1つアウトプットを完成させて公開する",
    ],
    compatibleAnimals: [1, 14, 25, 41, 50, 56],
  },

  // 6. AI細工師 — S×A入門
  {
    id: "ai-tinker",
    name: "AI細工師",
    title: "技巧の芽",
    tier: "basic",
    description:
      "AIと専門スキルの両方に関心を持ち、二つを掛け合わせた小さな実験を繰り返す細工師。AIを道具として使いこなす素養がある。量産型ではなく、手作り感が持ち味。",
    catchphrase: "AIと技術を掛け合わせる実験者",
    imageUrl: "/images/jobs/ai-tinker.png",
    mascot: {
      name: "ラッコン",
      animalMotif: "カワウソ",
      description:
        "水辺で石を使って貝を割る賢いカワウソ。道具を使いこなす知性と遊び心を兼ね備え、新しい実験が大好き。",
    },
    requiredParams: { communication: 20, specialist: 60, marketing: 15, ai: 65 },
    weights: { communication: 0.3, specialist: 1.3, marketing: 0.2, ai: 1.3 },
    subParams: {
      selfBranding: 30,
      execution: 65,
      learning: 75,
      trust: 30,
      monetize: 30,
      direction: 30,
    },
    advancedJobs: ["data-alchemist", "automation-artisan"],
    actionPlan: [
      "AIを使って自分の専門分野の作業を1つ自動化してみる",
      "AI×専門スキルの小さな作品やツールを3つ作る",
      "作ったものをGitHubやSNSで公開し、フィードバックを集める",
    ],
    compatibleAnimals: [12, 34, 43, 47, 60],
  },

  // 7. 声売り商人 — C×M入門
  {
    id: "voice-trader",
    name: "声売り商人",
    title: "語りの商い",
    tier: "basic",
    description:
      "コミュニケーション力とマーケティングセンスの芽を持つ商人見習い。会話の中から相手のニーズを嗅ぎ取り、自然と提案に繋げる才能がある。売る力の原石。",
    catchphrase: "話術と商魂で道を切り拓く",
    imageUrl: "/images/jobs/voice-trader.png",
    mascot: {
      name: "コンタ",
      animalMotif: "キツネ",
      description:
        "商いの道に長けた狡猾なキツネ。甘い声と鋭い目で相手の本音を見抜き、誰もが得する取引をまとめ上げる。",
    },
    requiredParams: { communication: 65, specialist: 15, marketing: 60, ai: 15 },
    weights: { communication: 1.3, specialist: 0.2, marketing: 1.3, ai: 0.2 },
    subParams: {
      selfBranding: 60,
      execution: 50,
      learning: 40,
      trust: 65,
      monetize: 60,
      direction: 40,
    },
    advancedJobs: ["brand-strategist", "trade-negotiator"],
    actionPlan: [
      "ロールプレイングでセールストークを週に3回練習する",
      "成功している営業パーソンの手法を3つ研究して真似る",
      "SNSで自分の意見を発信し、共感を集める発信力を鍛える",
    ],
    compatibleAnimals: [3, 18, 22, 26, 51],
  },

  // 8. 呪文従士 — C×A入門
  {
    id: "prompt-squire",
    name: "呪文従士",
    title: "詠唱の盾",
    tier: "basic",
    description:
      "コミュニケーション力を武器に、AIツールとの対話を得意とする従士。人間相手にもAI相手にも的確な言葉を選べる。プロンプトの書き方にセンスがある。",
    catchphrase: "AI時代を生き抜く言葉の盾",
    imageUrl: "/images/jobs/prompt-squire.png",
    mascot: {
      name: "ペタリ",
      animalMotif: "ヤモリ",
      description:
        "どんな壁にも張り付く小さなヤモリ。目立たないが確実に仕事をこなし、言葉という武器で主人を守る忠実な従士。",
    },
    requiredParams: { communication: 60, specialist: 20, marketing: 15, ai: 65 },
    weights: { communication: 1.3, specialist: 0.3, marketing: 0.2, ai: 1.3 },
    subParams: {
      selfBranding: 40,
      execution: 55,
      learning: 70,
      trust: 60,
      monetize: 25,
      direction: 35,
    },
    advancedJobs: ["ai-tactician", "soul-counselor"],
    actionPlan: [
      "毎日1つ新しいプロンプトテクニックを試して記録する",
      "AIとの対話を通じて、複雑な問題を分解して解決する練習をする",
      "AIを使った対人サポート（要約・分析）を実際の場面で試す",
    ],
    compatibleAnimals: [11, 24, 36, 46, 58],
  },

  // 9. 流行薬草師 — M×A入門
  {
    id: "trend-herbalist",
    name: "流行薬草師",
    title: "潮目の薬師",
    tier: "basic",
    description:
      "マーケティングとAIの組み合わせに目をつけた薬草師。AIツールでSNS分析やコンテンツ生成を試み、マーケティングの調合を始めている。時流を読む嗅覚と実験精神が光る。",
    catchphrase: "流行の薬草でビジネスを調合する",
    imageUrl: "/images/jobs/trend-herbalist.png",
    mascot: {
      name: "ミミル",
      animalMotif: "ウサギ",
      description:
        "長い耳でトレンドの風音をいち早く聞き取るウサギ。素早い身のこなしで薬草を集め、時流に合った処方を調合する。",
    },
    requiredParams: { communication: 15, specialist: 20, marketing: 65, ai: 60 },
    weights: { communication: 0.2, specialist: 0.3, marketing: 1.3, ai: 1.3 },
    subParams: {
      selfBranding: 55,
      execution: 60,
      learning: 70,
      trust: 25,
      monetize: 60,
      direction: 35,
    },
    advancedJobs: ["content-enchanter", "viral-engineer"],
    actionPlan: [
      "AIツールを使ってSNSのトレンド分析を週1回行う",
      "AI生成コンテンツを10本作成し、反応率を比較する",
      "マーケティングファネルの各段階でAIを活用する方法を1つずつ試す",
    ],
    compatibleAnimals: [13, 31, 36, 42, 58],
  },

  // ========================================
  // スタンダード（12ジョブ）
  // ========================================

  // 10. 技術指揮官 — C×S
  {
    id: "tech-commander",
    name: "技術指揮官",
    title: "技と人の橋",
    tier: "standard",
    description:
      "専門スキルとコミュニケーション力を両立させた指揮官。技術的な内容を噛み砕いて伝え、非エンジニアとの橋渡しを担う。テックリードやPMとして、チームの技術力を最大化させる要。",
    catchphrase: "技術を翻訳し、人を動かす司令塔",
    imageUrl: "/images/jobs/tech-commander.png",
    mascot: {
      name: "ドルフィン",
      animalMotif: "イルカ",
      description:
        "高い知性と社交性を持つイルカ。群れの先頭に立って航路を示しながら、仲間のコミュニケーションを円滑にする。",
    },
    requiredParams: { communication: 70, specialist: 75, marketing: 30, ai: 25 },
    weights: { communication: 1.2, specialist: 1.3, marketing: 0.5, ai: 0.4 },
    subParams: {
      selfBranding: 50,
      execution: 70,
      learning: 60,
      trust: 75,
      monetize: 45,
      direction: 75,
    },
    advancedJobs: ["war-council", "iron-maestro"],
    actionPlan: [
      "技術的な内容を非エンジニアに5分で説明する練習を週1回行う",
      "チーム内の技術課題をリストアップし、優先順位を付けて解決に導く",
      "テックリードやPMの実践経験を積むため、小規模プロジェクトのリーダーに手を挙げる",
    ],
    compatibleAnimals: [15, 21, 37, 38, 52],
  },

  // 11. 師範隠者 — C×S（育成型）
  {
    id: "mentor-hermit",
    name: "師範隠者",
    title: "山の導き手",
    tier: "standard",
    description:
      "コミュニケーション力と専門スキルで人を導く隠者。自分の技を惜しみなく教え、後進の成長に喜びを見出す。技術的な裏付けのある助言で信頼を勝ち取る。",
    catchphrase: "深い知と温かい言葉で人を育てる",
    imageUrl: "/images/jobs/mentor-hermit.png",
    mascot: {
      name: "ガメロン",
      animalMotif: "ゾウガメ",
      description:
        "百年を生きた巨大なゾウガメ。ゆっくりだが確実に歩み、長年の経験に裏打ちされた深い知恵で若い冒険者を導く。",
    },
    requiredParams: { communication: 70, specialist: 70, marketing: 20, ai: 25 },
    weights: { communication: 1.2, specialist: 1.2, marketing: 0.3, ai: 0.4 },
    subParams: {
      selfBranding: 45,
      execution: 55,
      learning: 65,
      trust: 85,
      monetize: 35,
      direction: 70,
    },
    advancedJobs: ["war-council", "people-maestro"],
    actionPlan: [
      "メンタリングやコーチングのフレームワークを1つ学び、実践する",
      "自分の専門知識をブログや動画で教材化し、後進に共有する",
      "月1回は後輩や仲間の相談に乗る時間を確保する",
    ],
    compatibleAnimals: [9, 15, 37, 53, 55, 57],
  },

  // 12. 旗印戦略家 — C×M
  {
    id: "brand-strategist",
    name: "旗印戦略家",
    title: "旗と声の将",
    tier: "standard",
    description:
      "コミュニケーション力とマーケティングセンスを掛け合わせた戦略家。ブランドの言語化が得意で、クライアントの想いを市場に届ける翻訳者。SNS発信からブランド設計まで統括。",
    catchphrase: "言葉と戦略で旗印を掲げよ",
    imageUrl: "/images/jobs/brand-strategist.png",
    mascot: {
      name: "クジャロ",
      animalMotif: "クジャク",
      description:
        "華麗な羽根を広げて人の目を引くクジャク。美しさと戦略で注目を集め、ブランドの旗印を高々と掲げる。",
    },
    requiredParams: { communication: 70, specialist: 25, marketing: 75, ai: 20 },
    weights: { communication: 1.2, specialist: 0.4, marketing: 1.3, ai: 0.3 },
    subParams: {
      selfBranding: 85,
      execution: 60,
      learning: 50,
      trust: 70,
      monetize: 70,
      direction: 60,
    },
    advancedJobs: ["war-council", "growth-oracle"],
    actionPlan: [
      "自分または顧客のブランドコンセプトを言語化するワークを実施する",
      "SNS発信を週5回に増やし、エンゲージメントデータを分析する",
      "成功しているブランドの戦略を5社分析し、共通パターンを抽出する",
    ],
    compatibleAnimals: [3, 18, 22, 26, 51],
  },

  // 13. 交渉商人 — C×M（セールス型）
  {
    id: "trade-negotiator",
    name: "交渉商人",
    title: "商いの達人",
    tier: "standard",
    description:
      "コミュニケーション力とマーケティングの実践型。セールスやクロージングの現場に強い。対面交渉で相手の心を掴み、商談を成約に導く実戦派。",
    catchphrase: "人の心を掴み、利益を最大化する",
    imageUrl: "/images/jobs/trade-negotiator.png",
    mascot: {
      name: "ガルド",
      animalMotif: "オオカミ",
      description:
        "群れのリーダーとして獲物を狩る知略のオオカミ。鋭い洞察力で相手の弱みを見抜き、チームを勝利に導く交渉の達人。",
    },
    requiredParams: { communication: 75, specialist: 20, marketing: 70, ai: 15 },
    weights: { communication: 1.3, specialist: 0.3, marketing: 1.2, ai: 0.2 },
    subParams: {
      selfBranding: 70,
      execution: 70,
      learning: 45,
      trust: 75,
      monetize: 80,
      direction: 55,
    },
    advancedJobs: ["war-council", "phantom-merchant"],
    actionPlan: [
      "商談のロールプレイを週2回行い、クロージング率を意識する",
      "交渉術の書籍を3冊読み、実際のセールスに1つずつ適用する",
      "成約率と顧客満足度のデータを取り、改善サイクルを回す",
    ],
    compatibleAnimals: [4, 16, 27, 39, 52],
  },

  // 14. AI戦術士 — C×A
  {
    id: "ai-tactician",
    name: "AI戦術士",
    title: "電脳の軍師",
    tier: "standard",
    description:
      "コミュニケーション力とAIスキルの二刀流で組織を動かす戦術士。AIの力を人に伝え、チーム全体のAI活用レベルを引き上げる。AI導入の企画・推進まで見据えた立ち回り。",
    catchphrase: "AIを操り、人を率いる電脳軍師",
    imageUrl: "/images/jobs/ai-tactician.png",
    mascot: {
      name: "クロウル",
      animalMotif: "カラス",
      description:
        "群れの戦略を司る漆黒のカラス。高い知性と観察眼でAIという武器を駆使し、戦場全体を見渡して最適な戦術を組み立てる。",
    },
    requiredParams: { communication: 70, specialist: 25, marketing: 20, ai: 75 },
    weights: { communication: 1.2, specialist: 0.4, marketing: 0.3, ai: 1.3 },
    subParams: {
      selfBranding: 50,
      execution: 65,
      learning: 75,
      trust: 65,
      monetize: 40,
      direction: 65,
    },
    advancedJobs: ["iron-maestro", "growth-oracle"],
    actionPlan: [
      "チームメンバーにAIツールの使い方を教えるワークショップを開催する",
      "AI導入で効果が出そうな業務を3つ特定し、改善計画を作成する",
      "AIの最新動向を週1回チームに共有するニュースレターを始める",
    ],
    compatibleAnimals: [7, 34, 47, 53, 59],
  },

  // 15. 心読み相談役 — C×A（支援型）
  {
    id: "soul-counselor",
    name: "心読み相談役",
    title: "人心の鍵師",
    tier: "standard",
    description:
      "コミュニケーション力とAIスキルで人の悩みに寄り添う相談役。AIを使ったヒアリングや分析で、人間だけでは気づけない解決策を提示する。新時代の支援者。",
    catchphrase: "心を読み、AIで解決の道を照らす",
    imageUrl: "/images/jobs/soul-counselor.png",
    mascot: {
      name: "ニャルム",
      animalMotif: "ネコ",
      description:
        "静かに寄り添う神秘的なネコ。相手の心の動きを敏感に察知し、AIの力で最適な癒やしと解決策を導き出す。",
    },
    requiredParams: { communication: 75, specialist: 20, marketing: 15, ai: 65 },
    weights: { communication: 1.3, specialist: 0.3, marketing: 0.2, ai: 1.2 },
    subParams: {
      selfBranding: 45,
      execution: 50,
      learning: 65,
      trust: 85,
      monetize: 30,
      direction: 50,
    },
    advancedJobs: ["iron-maestro", "digital-shaman"],
    actionPlan: [
      "カウンセリングやコーチングの基礎技法を1つ学び、実践する",
      "AIを使った相談対応のテンプレートを3パターン作成する",
      "悩み相談の場を小さく始め、フィードバックを集めて改善する",
    ],
    compatibleAnimals: [10, 24, 33, 46, 55],
  },

  // 16. 成長司令官 — S×M
  {
    id: "growth-commander",
    name: "成長司令官",
    title: "市場の操者",
    tier: "standard",
    description:
      "専門スキルとマーケティングを融合させた成長の請負人。技術的なバックグラウンドを持ちながら、売上に直結させるファネル設計ができる。プロダクトマーケティングが得意。",
    catchphrase: "売る仕組みを技で作り上げろ",
    imageUrl: "/images/jobs/growth-commander.png",
    mascot: {
      name: "ファルコン",
      animalMotif: "ハヤブサ",
      description:
        "上空から獲物を見定め、一直線に急降下するハヤブサ。成長の兆しを鋭い目で捉え、最速で成果に結びつける。",
    },
    requiredParams: { communication: 25, specialist: 70, marketing: 75, ai: 20 },
    weights: { communication: 0.4, specialist: 1.2, marketing: 1.3, ai: 0.3 },
    subParams: {
      selfBranding: 60,
      execution: 75,
      learning: 55,
      trust: 40,
      monetize: 80,
      direction: 65,
    },
    advancedJobs: ["war-council", "silent-general"],
    actionPlan: [
      "自社または顧客のマーケティングファネルを技術的に設計・実装する",
      "データ分析に基づいたグロースハックの施策を月2回実行する",
      "プロダクトの市場適合性（PMF）を検証する仕組みを構築する",
    ],
    compatibleAnimals: [4, 16, 28, 40, 48],
  },

  // 17. 商品仕立て師 — S×M（プロダクト型）
  {
    id: "product-crafter",
    name: "商品仕立て師",
    title: "価値の縫い手",
    tier: "standard",
    description:
      "技術的なモノづくりができるだけでなく、売れる商品として仕立てる力がある。プロダクト開発とマーケットフィットの両方を一人でこなせる稀有な存在。",
    catchphrase: "技術を商品に仕立て、市場に届ける",
    imageUrl: "/images/jobs/product-crafter.png",
    mascot: {
      name: "カメリオ",
      animalMotif: "カメレオン",
      description:
        "環境に合わせて色を変えるカメレオン。市場のニーズを敏感に察知し、技術力で形にする適応力の達人。",
    },
    requiredParams: { communication: 20, specialist: 75, marketing: 65, ai: 20 },
    weights: { communication: 0.3, specialist: 1.3, marketing: 1.1, ai: 0.3 },
    subParams: {
      selfBranding: 55,
      execution: 80,
      learning: 60,
      trust: 35,
      monetize: 75,
      direction: 55,
    },
    advancedJobs: ["silent-general", "one-man-army"],
    actionPlan: [
      "自分の技術で作れる商品アイデアを10個出し、市場性を検証する",
      "MVP（最小限の製品）を1つ作り、実際に販売してフィードバックを得る",
      "売れている類似商品を5つ分析し、自分の商品の差別化ポイントを明確にする",
    ],
    compatibleAnimals: [8, 20, 31, 43, 56],
  },

  // 18. 数秘錬金術師 — S×A
  {
    id: "data-alchemist",
    name: "数秘錬金術師",
    title: "数理の匠",
    tier: "standard",
    description:
      "専門技術とAIを融合させた錬金術師。データの山から黄金の洞察を引き出し、AIパイプラインを構築して分析を自動化する。裏方で手を動かす職人型のAIエンジニア。",
    catchphrase: "データとAIで真実を錬成する",
    imageUrl: "/images/jobs/data-alchemist.png",
    mascot: {
      name: "オクタン",
      animalMotif: "タコ",
      description:
        "8本の腕で同時に複数の実験を行うタコの錬金術師。データの海を自在に泳ぎ、あらゆる情報を統合して黄金の知見を生み出す。",
    },
    requiredParams: { communication: 20, specialist: 75, marketing: 15, ai: 75 },
    weights: { communication: 0.3, specialist: 1.3, marketing: 0.2, ai: 1.3 },
    subParams: {
      selfBranding: 25,
      execution: 80,
      learning: 85,
      trust: 35,
      monetize: 35,
      direction: 40,
    },
    advancedJobs: ["iron-maestro", "silent-general"],
    actionPlan: [
      "データ分析×AIのパイプラインを1つ構築し、分析を自動化する",
      "Kaggleやデータ分析コンペに参加して実践力を磨く",
      "AIモデルの精度改善に取り組み、結果をレポートにまとめる",
    ],
    compatibleAnimals: [7, 8, 19, 34, 43, 60],
  },

  // 19. 自動化職人 — S×A（効率化型）
  {
    id: "automation-artisan",
    name: "自動化職人",
    title: "仕組みの鍛冶",
    tier: "standard",
    description:
      "専門技術とAIスキルを使い、あらゆる業務の自動化を設計する職人。ワークフロー自動化・効率化に特化。チーム全体の生産性を劇的に変える。",
    catchphrase: "手作業を仕組みに変える静かな革命家",
    imageUrl: "/images/jobs/automation-artisan.png",
    mascot: {
      name: "アントル",
      animalMotif: "アリ",
      description:
        "巨大な巣の仕組みを設計する建築家アリ。一匹一匹は小さくとも、精密な設計と自動化された動線で巨大な成果を生み出す。",
    },
    requiredParams: { communication: 15, specialist: 70, marketing: 20, ai: 70 },
    weights: { communication: 0.2, specialist: 1.2, marketing: 0.3, ai: 1.2 },
    subParams: {
      selfBranding: 20,
      execution: 85,
      learning: 80,
      trust: 30,
      monetize: 40,
      direction: 45,
    },
    advancedJobs: ["iron-maestro", "one-man-army"],
    actionPlan: [
      "日常業務の中で手作業で行っている作業を5つリストアップし、自動化の優先順位をつける",
      "Zapier・Make・n8nなどのツールで業務自動化フローを3つ構築する",
      "自動化した成果（時間短縮・コスト削減）を数値で記録し、レポートにまとめる",
    ],
    compatibleAnimals: [12, 19, 40, 48, 60],
  },

  // 20. 投稿魔術師 — M×A
  {
    id: "content-enchanter",
    name: "投稿魔術師",
    title: "言霊の織り手",
    tier: "standard",
    description:
      "マーケティングとAIの魔法を組み合わせ、大量かつ高品質なコンテンツを生み出す魔術師。AI生成と人間の感性のバランス感覚に優れ、量産しながらも心に刺さる表現を追求。",
    catchphrase: "AIの筆で心を射抜くコンテンツを",
    imageUrl: "/images/jobs/content-enchanter.png",
    mascot: {
      name: "スピナ",
      animalMotif: "クモ",
      description:
        "美しい巣を織り上げるクモの魔術師。AIという糸を巧みに操り、人の心を捕らえるコンテンツの網を紡ぎ出す。",
    },
    requiredParams: { communication: 20, specialist: 25, marketing: 75, ai: 70 },
    weights: { communication: 0.3, specialist: 0.4, marketing: 1.3, ai: 1.2 },
    subParams: {
      selfBranding: 75,
      execution: 75,
      learning: 70,
      trust: 30,
      monetize: 70,
      direction: 45,
    },
    advancedJobs: ["growth-oracle", "silent-general"],
    actionPlan: [
      "AIツールを使ったコンテンツ制作パイプラインを構築し、週10本以上投稿する",
      "AI生成コンテンツと手動コンテンツのエンゲージメントを比較分析する",
      "自分独自のAIプロンプトテンプレート集を作り、コンテンツの質を標準化する",
    ],
    compatibleAnimals: [13, 31, 36, 42, 58],
  },

  // 21. 拡散設計士 — M×A（仕組み型）
  {
    id: "viral-engineer",
    name: "拡散設計士",
    title: "仕掛けの匠",
    tier: "standard",
    description:
      "AIで分析、人間の感性で企画し、拡散の導線を技術的に設計する。コンテンツ魔術師よりも仕組みづくりに寄った戦略型のマーケター。",
    catchphrase: "バズの仕組みを設計し、市場を動かす",
    imageUrl: "/images/jobs/viral-engineer.png",
    mascot: {
      name: "ビーナル",
      animalMotif: "ミツバチ",
      description:
        "花から花へ効率的に飛び回るミツバチ。情報の拡散経路を設計し、小さな動きが大きなバズへと連鎖する仕組みを構築する。",
    },
    requiredParams: { communication: 20, specialist: 30, marketing: 70, ai: 65 },
    weights: { communication: 0.3, specialist: 0.5, marketing: 1.3, ai: 1.1 },
    subParams: {
      selfBranding: 60,
      execution: 70,
      learning: 65,
      trust: 25,
      monetize: 75,
      direction: 55,
    },
    advancedJobs: ["silent-general", "phantom-merchant"],
    actionPlan: [
      "バズった投稿を30件分析し、拡散パターンを5つに分類する",
      "AIを使ったA/Bテストの仕組みを構築し、最適な拡散手法を見つける",
      "拡散導線の設計図を作り、実際のキャンペーンで検証する",
    ],
    compatibleAnimals: [20, 28, 31, 42, 50],
  },

  // ========================================
  // エキスパート（8ジョブ）
  // ========================================

  // 22. 戦略参謀 — C×S×M
  {
    id: "war-council",
    name: "戦略参謀",
    title: "三ツ星の知将",
    tier: "expert",
    description:
      "コミュニケーション、専門スキル、マーケティングの3軸が高水準。AI以外の全てを高い次元で統合した参謀。技術がわかり、人を動かせ、売り方も知っている。組織の中枢で戦略を描き、実行まで導く。",
    catchphrase: "コミュ・技術・商才の三位一体で勝つ",
    imageUrl: "/images/jobs/war-council.png",
    mascot: {
      name: "リュウジン",
      animalMotif: "龍（東洋龍）",
      description:
        "天空を統べる東洋の龍。三つの宝珠（対話・技術・商才）を操り、雲の上から戦場全体を見渡して最善の策を下す知将。",
    },
    requiredParams: { communication: 75, specialist: 70, marketing: 75, ai: 30 },
    weights: { communication: 1.1, specialist: 1.0, marketing: 1.1, ai: 0.4 },
    subParams: {
      selfBranding: 70,
      execution: 75,
      learning: 60,
      trust: 75,
      monetize: 70,
      direction: 80,
    },
    advancedJobs: ["sovereign-hero", "void-master"],
    actionPlan: [
      "3軸を活かした事業計画を1つ策定し、実行フェーズまで推進する",
      "異なる専門分野のメンバーを束ねたプロジェクトを主導する",
      "弱点であるAI軸を補強し、4軸バランス型への進化を目指す",
    ],
    compatibleAnimals: [4, 15, 21, 38, 45, 52],
  },

  // 23. 衆知の楽長 — C×S×M（育成型）
  {
    id: "people-maestro",
    name: "衆知の楽長",
    title: "和音の司",
    tier: "expert",
    description:
      "コミュニケーション×専門スキル×マーケティングだが、マネジメントと人材育成に特化。技術者の言葉がわかり、ビジネスも理解した上で、チーム全体の才能を最大限に引き出す。COOやVPoEの資質。",
    catchphrase: "人の才能を束ね、最高の和音を作る",
    imageUrl: "/images/jobs/people-maestro.png",
    mascot: {
      name: "キリノ",
      animalMotif: "麒麟",
      description:
        "慈愛と威厳を兼ね備えた伝説の麒麟。争いを好まず、あらゆる才能を調和させて美しい和音を奏でる楽団の指揮者。",
    },
    requiredParams: { communication: 80, specialist: 70, marketing: 65, ai: 25 },
    weights: { communication: 1.2, specialist: 1.0, marketing: 0.9, ai: 0.3 },
    subParams: {
      selfBranding: 60,
      execution: 65,
      learning: 60,
      trust: 85,
      monetize: 55,
      direction: 85,
    },
    advancedJobs: ["sovereign-hero"],
    actionPlan: [
      "チームメンバーの強みを言語化し、最適な役割分担を設計する",
      "1on1ミーティングを定期化し、メンバーの成長プランを一緒に策定する",
      "マネジメントの体系的なフレームワーク（OKR等）を導入して組織運営を最適化する",
    ],
    compatibleAnimals: [9, 15, 21, 37, 53],
  },

  // 24. 鋼鉄の指揮者 — C×S×A
  {
    id: "iron-maestro",
    name: "鋼鉄の指揮者",
    title: "万能の指揮棒",
    tier: "expert",
    description:
      "コミュニケーション、専門スキル、AIスキルの3軸が高い指揮者。技術力とAI活用力をチームに浸透させる圧倒的な推進力がある。CTOやテックリードとして最適な資質。",
    catchphrase: "技術とAIと対話力で組織を奏でる",
    imageUrl: "/images/jobs/iron-maestro.png",
    mascot: {
      name: "フェニオン",
      animalMotif: "鳳凰",
      description:
        "炎の中から何度でも蘇る不死鳥。技術とAIと対話の炎を纏い、チームを新たな高みへと導く永遠の指揮者。",
    },
    requiredParams: { communication: 70, specialist: 80, marketing: 25, ai: 80 },
    weights: { communication: 1.0, specialist: 1.2, marketing: 0.3, ai: 1.2 },
    subParams: {
      selfBranding: 50,
      execution: 80,
      learning: 80,
      trust: 70,
      monetize: 40,
      direction: 75,
    },
    advancedJobs: ["sovereign-hero", "void-master"],
    actionPlan: [
      "AI×技術のベストプラクティスをチームに浸透させる勉強会を月1回主催する",
      "AI活用した技術的な課題解決を主導し、組織全体の生産性を20%向上させる",
      "マーケティング軸を補強し、技術を事業価値に直結させるスキルを身につける",
    ],
    compatibleAnimals: [4, 34, 38, 47, 52],
  },

  // 25. 電脳祈祷師 — C×S×A（伝道型）
  {
    id: "digital-shaman",
    name: "電脳祈祷師",
    title: "霊脈の繋ぎ手",
    tier: "expert",
    description:
      "AIと人間の翻訳に特化。AI時代に人間が担うべき役割を定義し、技術力でAIを制御しながら、対話力で組織にAI文化を根付かせる。AI変革の伝道師。",
    catchphrase: "AIの声を聴き、人の魂に届ける",
    imageUrl: "/images/jobs/digital-shaman.png",
    mascot: {
      name: "キュウビ",
      animalMotif: "九尾の狐",
      description:
        "9本の尾にそれぞれ異なる知恵を宿す神秘的な狐。AIと人間の世界を自在に行き来し、両者の橋渡しをする伝道者。",
    },
    requiredParams: { communication: 75, specialist: 70, marketing: 20, ai: 80 },
    weights: { communication: 1.1, specialist: 1.0, marketing: 0.3, ai: 1.2 },
    subParams: {
      selfBranding: 55,
      execution: 65,
      learning: 80,
      trust: 80,
      monetize: 35,
      direction: 70,
    },
    advancedJobs: ["sovereign-hero"],
    actionPlan: [
      "AI導入に対する組織の不安や抵抗を丁寧にヒアリングし、解消プランを策定する",
      "AI時代に人間が担うべき役割を定義したビジョンドキュメントを作成する",
      "AIと人間の協働モデルを実証するパイロットプロジェクトを3つ立ち上げる",
    ],
    compatibleAnimals: [10, 33, 46, 53, 59],
  },

  // 26. 成長預言者 — C×M×A
  {
    id: "growth-oracle",
    name: "成長預言者",
    title: "未来の読み手",
    tier: "expert",
    description:
      "コミュニケーション、マーケティング、AIの3軸が高い預言者。市場の動きをAIで予測し、人に伝えて動かす力に長ける。CMOやグロースハッカーの上位互換。",
    catchphrase: "AI・対話・市場の三眼で未来を読む",
    imageUrl: "/images/jobs/growth-oracle.png",
    mascot: {
      name: "ユニオル",
      animalMotif: "ユニコーン",
      description:
        "額の角で未来を見通す伝説のユニコーン。AIの力で市場の潮流を予測し、輝く角で進むべき道を照らし出す。",
    },
    requiredParams: { communication: 70, specialist: 25, marketing: 80, ai: 75 },
    weights: { communication: 1.0, specialist: 0.3, marketing: 1.2, ai: 1.1 },
    subParams: {
      selfBranding: 80,
      execution: 65,
      learning: 75,
      trust: 65,
      monetize: 80,
      direction: 70,
    },
    advancedJobs: ["sovereign-hero", "void-master"],
    actionPlan: [
      "AIを使った市場予測モデルを1つ構築し、実際のビジネスで検証する",
      "マーケティング戦略をAIで最適化し、ROIを30%改善する施策を実行する",
      "専門スキル軸を補強し、技術的な裏付けのある戦略立案を目指す",
    ],
    compatibleAnimals: [3, 22, 26, 42, 51],
  },

  // 27. 幻影商人 — C×M×A（収益型）
  {
    id: "phantom-merchant",
    name: "幻影商人",
    title: "千面の商い",
    tier: "expert",
    description:
      "コミュニケーション×マーケティング×AIだが、よりセールス・収益化に寄った実践派。AIで商品を作り、マーケで売り、コミュニケーションでファンを作る。実力で稼ぐAI時代の商人の最高峰。",
    catchphrase: "AI×対話×市場で幻のように稼ぐ",
    imageUrl: "/images/jobs/phantom-merchant.png",
    mascot: {
      name: "ヤタロウ",
      animalMotif: "八咫烏",
      description:
        "三本足で太陽を導く神聖な八咫烏。AIと対話と市場の三つの力で、人には見えない商機を察知して利益を生み出す。",
    },
    requiredParams: { communication: 70, specialist: 25, marketing: 75, ai: 75 },
    weights: { communication: 1.0, specialist: 0.3, marketing: 1.1, ai: 1.1 },
    subParams: {
      selfBranding: 75,
      execution: 75,
      learning: 65,
      trust: 60,
      monetize: 85,
      direction: 60,
    },
    advancedJobs: ["sovereign-hero"],
    actionPlan: [
      "AIで商品やサービスを3つ作成し、それぞれの収益性を検証する",
      "ファン獲得からマネタイズまでの一気通貫フローを構築する",
      "月商100万円を達成するためのロードマップを策定し、実行に移す",
    ],
    compatibleAnimals: [16, 22, 27, 39, 51],
  },

  // 28. 沈黙の将軍 — S×M×A
  {
    id: "silent-general",
    name: "沈黙の将軍",
    title: "無言の支配者",
    tier: "expert",
    description:
      "専門スキル、マーケティング、AIの3軸が高いが、コミュニケーションは控えめな将軍。仕組みと数字で結果を出す。一人で事業を回せるフルスタックな個人事業主の究極形。",
    catchphrase: "語らずとも、技と数字と仕組みで制す",
    imageUrl: "/images/jobs/silent-general.png",
    mascot: {
      name: "ビャッコ",
      animalMotif: "白虎",
      description:
        "言葉少なくも圧倒的な存在感を放つ白虎。技術と戦略とAIの三つの牙で、無言のまま市場を制圧する孤高の将。",
    },
    requiredParams: { communication: 25, specialist: 75, marketing: 75, ai: 75 },
    weights: { communication: 0.3, specialist: 1.1, marketing: 1.1, ai: 1.1 },
    subParams: {
      selfBranding: 55,
      execution: 85,
      learning: 70,
      trust: 35,
      monetize: 80,
      direction: 65,
    },
    advancedJobs: ["sovereign-hero", "void-master"],
    actionPlan: [
      "個人事業として月の売上目標を設定し、仕組みだけで達成できる収益構造を構築する",
      "専門スキル×マーケティング×AIの3軸を活かしたプロダクトを1つリリースし、自動販売の仕組みを整える",
      "コミュニケーション軸を補強し、外注やチーム化で事業をスケールさせる戦略を練る",
    ],
    compatibleAnimals: [8, 19, 40, 43, 48],
  },

  // 29. 孤高の一騎当千 — S×M×A（独立型）
  {
    id: "one-man-army",
    name: "孤高の一騎当千",
    title: "独立の極み",
    tier: "expert",
    description:
      "専門スキル×マーケティング×AIの3軸がさらに高く、コミュニケーション不要で完結する超個人主義の完成形。自分で作り、自分で売り、AIで効率化する。人と組まずに事業を成立させる稀有な存在。",
    catchphrase: "語らず、技とAIと商才で圧倒する",
    imageUrl: "/images/jobs/one-man-army.png",
    mascot: {
      name: "グリオン",
      animalMotif: "グリフォン",
      description:
        "鷲の翼と獅子の体を持つ伝説の獣。空と地の両方を制し、単独で群れに匹敵する力で全てを完結させる一騎当千の存在。",
    },
    requiredParams: { communication: 20, specialist: 80, marketing: 75, ai: 80 },
    weights: { communication: 0.2, specialist: 1.2, marketing: 1.0, ai: 1.2 },
    subParams: {
      selfBranding: 60,
      execution: 85,
      learning: 75,
      trust: 25,
      monetize: 85,
      direction: 55,
    },
    advancedJobs: ["void-master"],
    actionPlan: [
      "完全自動化された収益源を3つ構築し、月の不労所得を確立する",
      "自分だけで回せるビジネスモデルの限界を把握し、次のステージを設計する",
      "年1回は新しい事業領域にチャレンジし、スキルの幅を広げる",
    ],
    compatibleAnimals: [4, 16, 27, 40, 56],
  },

  // ========================================
  // レジェンド（3ジョブ）
  // ========================================

  // 30. 覇王勇者 — 4軸バランス型
  {
    id: "sovereign-hero",
    name: "覇王勇者",
    title: "四天の統べ手",
    tier: "legend",
    description:
      "4軸すべてが高水準でバランスした頂点。技術で作り、AIで加速し、マーケで売り、対話で人を動かす。チームの中心であり、一人でも完結できる、時代を創る存在。",
    catchphrase: "四つの力を束ね、時代を創る覇王",
    imageUrl: "/images/jobs/sovereign-hero.png",
    mascot: {
      name: "オウリュウ",
      animalMotif: "応龍",
      description:
        "四つの宝珠を操る翼を持つ至高の龍。コミュニケーション・技術・マーケティング・AIの全てを統べ、新しい時代そのものを創り出す覇王。",
    },
    requiredParams: { communication: 85, specialist: 80, marketing: 85, ai: 80 },
    weights: { communication: 1.1, specialist: 1.1, marketing: 1.1, ai: 1.1 },
    subParams: {
      selfBranding: 85,
      execution: 85,
      learning: 80,
      trust: 85,
      monetize: 85,
      direction: 90,
    },
    advancedJobs: [],
    actionPlan: [
      "4軸の力を活かして、業界に変革をもたらす事業やプロジェクトを立ち上げる",
      "次世代のリーダーを3人育成し、自分の知見とスキルを継承する",
      "自分の経験と知見を体系化し、メソッドとして世に公開する",
    ],
    compatibleAnimals: [4, 15, 21, 38, 45, 52],
  },

  // 31. 虚空の達人 — 極限特化型
  {
    id: "void-master",
    name: "虚空の達人",
    title: "無の境地",
    tier: "legend",
    description:
      "一つの道を極限まで突き詰めた結果、他の全てが不要になった達人。特化の果てに到達する悟りの境地。圧倒的な一点突破で全てを凌駕する、型を超えた者。",
    catchphrase: "極めた先にある、何もかもを超えた境地",
    imageUrl: "/images/jobs/void-master.png",
    mascot: {
      name: "ゲンブウ",
      animalMotif: "玄武",
      description:
        "亀と蛇が一体となった太古の霊獣。一つの道を永劫に歩み続けた果てに、すべてを超越した無の境地に到達した達人。",
    },
    requiredParams: { communication: 60, specialist: 60, marketing: 60, ai: 90 },
    weights: { communication: 0.8, specialist: 0.8, marketing: 0.8, ai: 1.5 },
    subParams: {
      selfBranding: 70,
      execution: 90,
      learning: 85,
      trust: 65,
      monetize: 70,
      direction: 70,
    },
    advancedJobs: [],
    actionPlan: [
      "自分の極めた分野で、業界トップ10に入る実績を1つ作る",
      "特化スキルを軸にしたブランドを確立し、指名で仕事が来る状態を作る",
      "自分の到達した境地を言語化し、書籍や講演で世に発信する",
    ],
    compatibleAnimals: [7, 19, 34, 43, 48, 60],
  },

  // 32. 時代建築家 — 仕組み設計型
  {
    id: "era-architect",
    name: "時代建築家",
    title: "世界の設計者",
    tier: "legend",
    description:
      "自分が動かなくても回る事業・組織・エコシステムを設計する建築家。4軸の高い能力をシステムに変換し、自分を超えた価値を生み出す。連続起業家の最終到達点。",
    catchphrase: "仕組みを設計し、次の時代を建築する",
    imageUrl: "/images/jobs/era-architect.png",
    mascot: {
      name: "スザクル",
      animalMotif: "朱雀",
      description:
        "炎の翼で次の時代を照らす神鳥・朱雀。自らの炎で古い仕組みを焼き払い、灰の中から新しい世界の設計図を描き上げる。",
    },
    requiredParams: { communication: 80, specialist: 80, marketing: 85, ai: 80 },
    weights: { communication: 1.0, specialist: 1.0, marketing: 1.2, ai: 1.0 },
    subParams: {
      selfBranding: 80,
      execution: 80,
      learning: 80,
      trust: 80,
      monetize: 90,
      direction: 95,
    },
    advancedJobs: [],
    actionPlan: [
      "自分がいなくても回る事業の仕組みを1つ完成させる",
      "3つ以上の事業やプロジェクトを同時に設計・運営するエコシステムを構築する",
      "次世代の起業家やリーダーが育つプラットフォームを作り、自分を超える人材を輩出する",
    ],
    compatibleAnimals: [4, 21, 38, 45, 52, 57],
  },
];

// ジョブ階層ラベル
export const JOB_TIER_LABELS: Record<string, string> = {
  basic: "ベーシック",
  standard: "スタンダード",
  expert: "エキスパート",
  legend: "レジェンド",
};
