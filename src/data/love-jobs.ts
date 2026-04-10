import type { Job } from "@/types/diagnosis";

/**
 * 恋愛診断用のジョブデータ（32種）
 *
 * CoreParamsの意味は恋愛文脈に再解釈されている：
 *   communication → 共感力 (Empathy)
 *   specialist    → アプローチ力 (Initiative)
 *   marketing     → 関係構築力 (Bonding)
 *   ai            → 自己表現力 (Charisma)
 *
 * 数値（requiredParams / weights / subParams / compatibleAnimals）は
 * ビジネス版 jobs.ts と1:1で同じ値を使い、マッチングアルゴリズムの一貫性を保つ。
 * 画像も同名のビジネス版を共有する。
 */
export const LOVE_JOBS: Job[] = [
  // ========================================
  // ベーシック（9ジョブ）
  // ========================================

  // 1. 恋の見習い魔導士 — Charisma特化
  {
    id: "love-apprentice-mage",
    name: "恋の見習い魔導士",
    title: "愛の呪文見習い",
    tier: "basic",
    description:
      "恋愛の可能性に目覚め、自己表現という名の呪文の基礎を学び始めた見習い。SNSや日々の言葉で自分の魅力を少しずつ表現できるようになってきた。恋する心の嗅覚は鋭い。",
    catchphrase: "魅力の呪文を覚え始めた探求者",
    imageUrl: "/images/jobs/ai-apprentice.png",
    mascot: {
      name: "ホロン",
      animalMotif: "フクロウ",
      description:
        "夜空の下で光る瞳を持つ小さなフクロウ。恋の記憶を綴った本の塔に住み、新しい想いを日々研究している。",
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
    advancedJobs: ["love-data-alchemist", "love-content-enchanter", "love-tactician"],
    actionPlan: [
      "毎日1つ、自分の想いを言葉にして発信する",
      "鏡の前で自分の魅力を言語化する習慣をつける",
      "恋愛の成功談・失敗談をブログやSNSにアウトプットする",
    ],
    compatibleAnimals: [7, 19, 34, 47, 59],
  },

  // 2. 心の鍛冶師 — Initiative特化
  {
    id: "love-heart-smith",
    name: "心の鍛冶師",
    title: "愛の職人",
    tier: "basic",
    description:
      "アプローチという名の鉄を日々打ち続ける鍛冶師。恋の基礎の型は身についている。地道に声かけや誘いを重ね、いつか折れない関係を鍛え上げる。一歩を踏み出す勇気は人一倍。",
    catchphrase: "情熱の炉でアプローチを鍛え抜く",
    imageUrl: "/images/jobs/code-blacksmith.png",
    mascot: {
      name: "テッカ",
      animalMotif: "ビーバー",
      description:
        "頑丈なダムを築き上げるビーバーの職人。コツコツと信頼の柱を組み、誰よりも揺るがない絆を築き上げる。",
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
    advancedJobs: ["love-charm-commander", "love-data-alchemist", "love-mentor-hermit"],
    actionPlan: [
      "気になる相手に週1回は自分から声をかける",
      "デートの誘い方を3パターン用意して試してみる",
      "断られても次に活かす振り返りノートをつける",
    ],
    compatibleAnimals: [8, 19, 40, 43, 48],
  },

  // 3. 愛の伝令 — Empathy特化
  {
    id: "love-messenger",
    name: "愛の伝令",
    title: "想いの使い",
    tier: "basic",
    description:
      "会話が最大の武器。誰とでもすぐ打ち解け、相手の本音を引き出す天性の聞き上手。心の距離を縮めるスピードは群を抜く。恋のネットワークを自然と広げていく。",
    catchphrase: "言葉を運び、人の心を繋ぐ",
    imageUrl: "/images/jobs/messenger-peddler.png",
    mascot: {
      name: "ペロル",
      animalMotif: "インコ",
      description:
        "カラフルな羽根を持つおしゃべりなインコ。どんな相手の心の言葉も瞬時に汲み取り、人と人の間を飛び回って想いを届ける。",
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
    advancedJobs: ["love-charm-commander", "love-brand-romancer", "love-soul-counselor"],
    actionPlan: [
      "毎週1人、新しい人と深い対話をする習慣を作る",
      "相手の本音を3分以内に引き出す傾聴スキルを磨く",
      "自分の人間関係マップを可視化し、大切な人との時間を増やす",
    ],
    compatibleAnimals: [9, 10, 24, 33, 55],
  },

  // 4. 出会いの斥候 — Bonding特化
  {
    id: "love-encounter-scout",
    name: "出会いの斥候",
    title: "縁の目利き",
    tier: "basic",
    description:
      "人間関係構築の基礎を身につけ、出会いの場の動きを読もうと奔走する斥候。マッチングアプリやイベントに足を運び、相性のいい相手を嗅ぎ分ける感覚を磨いている最中。",
    catchphrase: "観察と直感で運命の風を読む",
    imageUrl: "/images/jobs/market-scout.png",
    mascot: {
      name: "ミルカ",
      animalMotif: "ミーアキャット",
      description:
        "群れの中で最も早く出会いの気配を察知する見張り番。高い場所から人の流れを見渡し、運命の相手をいち早く仲間に伝える。",
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
    advancedJobs: ["love-brand-romancer", "love-content-enchanter", "love-romance-commander"],
    actionPlan: [
      "気になる相手のタイプを3パターン分析し、出会いの場を選び直す",
      "1ヶ月の出会いの場の参加データを記録し、相性パターンを特定する",
      "新しいコミュニティに1つ参加し、実際の出会いから学びを得る",
    ],
    compatibleAnimals: [13, 20, 28, 42, 51],
  },

  // 5. 駆け出しロマンティスト — 全軸低め
  {
    id: "love-fledgling-romantic",
    name: "駆け出しロマンティスト",
    title: "恋路の旅立ち人",
    tier: "basic",
    description:
      "まだ恋愛経験は浅いが、可能性は無限大。すべての軸が発展途上だからこそ、どの方向にも伸びしろがある。大事なのは恋に踏み出した最初の一歩。すべてのジョブへの道が開かれている原石。",
    catchphrase: "すべてはここから。恋の冒険の一歩目",
    imageUrl: "/images/jobs/fledgling-adventurer.png",
    mascot: {
      name: "ポチル",
      animalMotif: "子犬",
      description:
        "好奇心旺盛で何にでも飛びつく子犬。まだ小さいけれど、どんな出会いにもワクワクして駆け出していく純粋な心の塊。",
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
      "love-apprentice-mage",
      "love-heart-smith",
      "love-messenger",
      "love-encounter-scout",
    ],
    actionPlan: [
      "4つの軸（共感・アプローチ・関係構築・自己表現）を1週間ずつ意識して、自分の得意を見つける",
      "恋愛に関する本やコラムを毎日30分インプットする",
      "小さくてもいいので1つアクション（声かけ・連絡）を起こしてみる",
    ],
    compatibleAnimals: [1, 14, 25, 41, 50, 56],
  },

  // 6. 恋の細工師 — Initiative×Charisma入門
  {
    id: "love-charm-tinker",
    name: "恋の細工師",
    title: "ときめきの芽",
    tier: "basic",
    description:
      "アプローチ力と自己表現力の両方に関心を持ち、二つを掛け合わせた小さな実験を繰り返す細工師。自分らしさを武器に変える素養がある。量産型ではなく、手作り感のある誘い方が持ち味。",
    catchphrase: "個性とアプローチを掛け合わせる実験者",
    imageUrl: "/images/jobs/ai-tinker.png",
    mascot: {
      name: "ラッコン",
      animalMotif: "カワウソ",
      description:
        "水辺で道具を使って貝を割る賢いカワウソ。創意工夫の知性と遊び心を兼ね備え、新しい恋のアプローチが大好き。",
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
    advancedJobs: ["love-data-alchemist", "love-automation-artisan"],
    actionPlan: [
      "自分らしさを表現したデートプランを1つ実行してみる",
      "個性を活かしたアプローチを3パターン作って試す",
      "実験結果をノートにまとめ、自分だけの勝ちパターンを蓄積する",
    ],
    compatibleAnimals: [12, 34, 43, 47, 60],
  },

  // 7. 甘言の語り部 — Empathy×Bonding入門
  {
    id: "love-sweet-talker",
    name: "甘言の語り部",
    title: "愛の語り商い",
    tier: "basic",
    description:
      "共感力と関係構築力の芽を持つ語り部の見習い。会話の中から相手の心のニーズを嗅ぎ取り、自然と距離を縮めていく才能がある。人の心を惹きつける言葉を持つ原石。",
    catchphrase: "話術と思いやりで道を切り拓く",
    imageUrl: "/images/jobs/voice-trader.png",
    mascot: {
      name: "コンタ",
      animalMotif: "キツネ",
      description:
        "恋の駆け引きに長けた愛らしいキツネ。甘い声と優しい目で相手の本音を見抜き、お互いが幸せな関係を結びとめる。",
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
    advancedJobs: ["love-brand-romancer", "love-bond-negotiator"],
    actionPlan: [
      "ロールプレイで会話のスタイルを週に3回練習する",
      "魅力的な人の話し方を3人研究して真似てみる",
      "SNSで自分の想いを発信し、共感を集める発信力を鍛える",
    ],
    compatibleAnimals: [3, 18, 22, 26, 51],
  },

  // 8. 詠唱の従士 — Empathy×Charisma入門
  {
    id: "love-charm-squire",
    name: "詠唱の従士",
    title: "愛詞の盾",
    tier: "basic",
    description:
      "共感力を武器に、自己表現を磨くことを得意とする従士。相手の心にも自分の心にも的確な言葉を選べる。言葉選びにセンスがあり、文字メッセージで魅力を発揮する。",
    catchphrase: "恋愛時代を生き抜く言葉の盾",
    imageUrl: "/images/jobs/prompt-squire.png",
    mascot: {
      name: "ペタリ",
      animalMotif: "ヤモリ",
      description:
        "どんな心の壁にも寄り添う小さなヤモリ。目立たないが確実に距離を縮め、言葉という武器で大切な人を守る忠実な従士。",
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
    advancedJobs: ["love-tactician", "love-soul-counselor"],
    actionPlan: [
      "毎日1つ新しいメッセージの言い回しを試して記録する",
      "対話を通じて、複雑な感情を言葉にする練習をする",
      "気持ちを伝える手紙やLINEを丁寧に書いて相手に届ける",
    ],
    compatibleAnimals: [11, 24, 36, 46, 58],
  },

  // 9. ときめき薬草師 — Bonding×Charisma入門
  {
    id: "love-trend-herbalist",
    name: "ときめき薬草師",
    title: "潮目の恋薬師",
    tier: "basic",
    description:
      "関係構築力と自己表現力の組み合わせに目をつけた薬草師。SNSやプロフィール写真の見せ方を試し、恋愛の調合を始めている。時流を読む嗅覚と実験精神が光る。",
    catchphrase: "魅力の薬草で恋を調合する",
    imageUrl: "/images/jobs/trend-herbalist.png",
    mascot: {
      name: "ミミル",
      animalMotif: "ウサギ",
      description:
        "長い耳でときめきの風音をいち早く聞き取るウサギ。素早い身のこなしで魅力を集め、恋に効く処方を調合する。",
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
    advancedJobs: ["love-content-enchanter", "love-viral-engineer"],
    actionPlan: [
      "プロフィール写真や自己紹介文を週1回見直して改善する",
      "魅力的に映る投稿を10本作って反応を比較する",
      "出会いの導線（プロフィール→会話→デート）を1つずつ最適化する",
    ],
    compatibleAnimals: [13, 31, 36, 42, 58],
  },

  // ========================================
  // スタンダード（12ジョブ）
  // ========================================

  // 10. 魅惑の司令官 — Empathy×Initiative
  {
    id: "love-charm-commander",
    name: "魅惑の司令官",
    title: "心と行動の橋",
    tier: "standard",
    description:
      "アプローチ力と共感力を両立させた司令官。自分の想いを誠実に伝え、相手の気持ちに寄り添う橋渡しを担う。誘い方と聴き方の両方を心得ており、真剣交際を引き寄せる要。",
    catchphrase: "想いを翻訳し、相手の心を動かす司令塔",
    imageUrl: "/images/jobs/tech-commander.png",
    mascot: {
      name: "ドルフィン",
      animalMotif: "イルカ",
      description:
        "高い知性と社交性を持つイルカ。群れの先頭に立って航路を示しながら、仲間との心の交流を円滑にする恋の伴走者。",
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
    advancedJobs: ["love-war-council", "love-iron-maestro"],
    actionPlan: [
      "気になる相手に5分で自分の魅力を伝える練習を週1回行う",
      "恋愛における自分の課題をリストアップし、優先順位をつけて克服する",
      "デートやイベントを自分主導で企画し、関係をリードする経験を積む",
    ],
    compatibleAnimals: [15, 21, 37, 38, 52],
  },

  // 11. 恋の賢者 — Empathy×Initiative（育成型）
  {
    id: "love-mentor-hermit",
    name: "恋の賢者",
    title: "縁の導き手",
    tier: "standard",
    description:
      "共感力とアプローチ力で人を導く隠者。自分の恋愛経験を惜しみなく語り、後輩の恋を応援することに喜びを見出す。深い洞察に裏付けられた助言で信頼を勝ち取る。",
    catchphrase: "深い洞察と温かい言葉で恋を育てる",
    imageUrl: "/images/jobs/mentor-hermit.png",
    mascot: {
      name: "ガメロン",
      animalMotif: "ゾウガメ",
      description:
        "百年を生きた巨大なゾウガメ。ゆっくりだが確実に歩み、長年の恋愛の経験に裏打ちされた深い知恵で若い恋人たちを導く。",
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
    advancedJobs: ["love-war-council", "love-people-maestro"],
    actionPlan: [
      "恋愛コーチングのフレームワークを1つ学び、自分の恋にも実践する",
      "自分の恋愛の学びをブログや動画にまとめて、後輩に共有する",
      "月1回は友人の恋愛相談に乗り、人を育てる喜びを味わう",
    ],
    compatibleAnimals: [9, 15, 37, 53, 55, 57],
  },

  // 12. ブランドロマンサー — Empathy×Bonding
  {
    id: "love-brand-romancer",
    name: "ブランドロマンサー",
    title: "魅力と縁の将",
    tier: "standard",
    description:
      "共感力と関係構築力を掛け合わせた戦略家。自分の魅力の言語化が得意で、想いを相手に届ける翻訳者。SNS発信から自己ブランディングまで統括し、選ばれる存在を作り上げる。",
    catchphrase: "言葉と戦略で愛の旗印を掲げよ",
    imageUrl: "/images/jobs/brand-strategist.png",
    mascot: {
      name: "クジャロ",
      animalMotif: "クジャク",
      description:
        "華麗な羽根を広げて人の目を引くクジャク。美しさと戦略で注目を集め、自分という存在を高々と掲げる愛の象徴。",
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
    advancedJobs: ["love-war-council", "love-growth-oracle"],
    actionPlan: [
      "自分のセルフブランド（理想像）を言語化するワークを実施する",
      "SNS発信を週5回に増やし、共感反応を分析する",
      "魅力的な人のセルフプロデュース術を5人分研究し、共通点を抽出する",
    ],
    compatibleAnimals: [3, 18, 22, 26, 51],
  },

  // 13. 交際の交渉人 — Empathy×Bonding（クロージング型）
  {
    id: "love-bond-negotiator",
    name: "交際の交渉人",
    title: "縁結びの達人",
    tier: "standard",
    description:
      "共感力と関係構築力の実践型。告白やプロポーズの場面に強い。対話で相手の心を掴み、関係を次のステップへ進める実戦派。決め所での胆力に定評がある。",
    catchphrase: "心を掴み、関係を確かなものに変える",
    imageUrl: "/images/jobs/trade-negotiator.png",
    mascot: {
      name: "ガルド",
      animalMotif: "オオカミ",
      description:
        "群れのリーダーとしてパートナーを守り抜くオオカミ。鋭い洞察力で相手の気持ちを見抜き、二人を未来へと導く愛の達人。",
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
    advancedJobs: ["love-war-council", "love-phantom-merchant"],
    actionPlan: [
      "告白や交際の打診を想定したロールプレイを週2回行う",
      "恋愛心理学の本を3冊読み、実際の関係に1つずつ取り入れる",
      "デートの満足度と関係進展のデータを取り、改善サイクルを回す",
    ],
    compatibleAnimals: [4, 16, 27, 39, 52],
  },

  // 14. 魅了の戦術士 — Empathy×Charisma
  {
    id: "love-tactician",
    name: "魅了の戦術士",
    title: "心の軍師",
    tier: "standard",
    description:
      "共感力と自己表現力の二刀流で恋路を切り拓く戦術士。自分の魅力を相手に伝え、二人の関係を引き上げる。デートプランから告白まで見据えた立ち回りができる。",
    catchphrase: "魅力を操り、心を率いる恋の軍師",
    imageUrl: "/images/jobs/ai-tactician.png",
    mascot: {
      name: "クロウル",
      animalMotif: "カラス",
      description:
        "群れの戦略を司る漆黒のカラス。高い知性と観察眼で魅力を駆使し、関係全体を見渡して最適なアプローチを組み立てる。",
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
    advancedJobs: ["love-iron-maestro", "love-growth-oracle"],
    actionPlan: [
      "気になる相手に自分の魅力を伝える3回シリーズのデート設計をする",
      "自分の魅力ポイントを3つ特定し、それを活かす場面を作る",
      "恋愛の最新トレンド（流行のデートスポット等）を週1回キャッチアップする",
    ],
    compatibleAnimals: [7, 34, 47, 53, 59],
  },

  // 15. 心読みの相談役 — Empathy×Charisma（支援型）
  {
    id: "love-soul-counselor",
    name: "心読みの相談役",
    title: "人心の鍵師",
    tier: "standard",
    description:
      "共感力と自己表現力で人の恋の悩みに寄り添う相談役。深いヒアリングと自分の経験から、本人だけでは気づけない解決策を提示する。新時代の恋の支援者。",
    catchphrase: "心を読み、優しさで解決の道を照らす",
    imageUrl: "/images/jobs/soul-counselor.png",
    mascot: {
      name: "ニャルム",
      animalMotif: "ネコ",
      description:
        "静かに寄り添う神秘的なネコ。相手の心の動きを敏感に察知し、包み込む癒やしと的確な助言を導き出す愛の相談役。",
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
    advancedJobs: ["love-iron-maestro", "love-digital-shaman"],
    actionPlan: [
      "傾聴技法を1つ学び、恋愛相談の場で実践する",
      "自分なりの恋愛アドバイスのテンプレートを3パターン作成する",
      "恋愛相談の場を小さく始め、フィードバックを集めて改善する",
    ],
    compatibleAnimals: [10, 24, 33, 46, 55],
  },

  // 16. 恋愛司令官 — Initiative×Bonding
  {
    id: "love-romance-commander",
    name: "恋愛司令官",
    title: "縁の操者",
    tier: "standard",
    description:
      "アプローチ力と関係構築力を融合させた恋の請負人。実行力を持ちながら、関係を深めるファネル設計ができる。出会いから交際までの導線づくりが得意。",
    catchphrase: "縁を結ぶ仕組みを情熱で作り上げろ",
    imageUrl: "/images/jobs/growth-commander.png",
    mascot: {
      name: "ファルコン",
      animalMotif: "ハヤブサ",
      description:
        "上空からチャンスを見定め、一直線に急降下するハヤブサ。出会いの兆しを鋭い目で捉え、最速で関係に結びつける。",
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
    advancedJobs: ["love-war-council", "love-silent-general"],
    actionPlan: [
      "出会いから交際までの自分なりの恋愛ファネルを設計・実行する",
      "データに基づいた恋愛ハックの施策を月2回試す",
      "自分との相性（PMF）を検証する仕組みを構築する",
    ],
    compatibleAnimals: [4, 16, 28, 40, 48],
  },

  // 17. 縁の仕立て師 — Initiative×Bonding（プロダクト型）
  {
    id: "love-bond-crafter",
    name: "縁の仕立て師",
    title: "ふたりの縫い手",
    tier: "standard",
    description:
      "二人の関係を丁寧に作り上げるだけでなく、長く続く絆として仕立てる力がある。デート設計と関係維持の両方を一人でこなせる稀有な存在。",
    catchphrase: "出会いを関係に仕立て、未来へ届ける",
    imageUrl: "/images/jobs/product-crafter.png",
    mascot: {
      name: "カメリオ",
      animalMotif: "カメレオン",
      description:
        "環境に合わせて色を変えるカメレオン。相手の心の機微を敏感に察知し、二人の関係を形にしていく適応力の達人。",
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
    advancedJobs: ["love-silent-general", "love-one-man-army"],
    actionPlan: [
      "理想の関係性を10パターン書き出し、自分に合うものを検証する",
      "MVP（最小限のデート）を1つ実行し、相手の反応からフィードバックを得る",
      "成功している夫婦・カップルを5組観察し、自分との差別化ポイントを明確にする",
    ],
    compatibleAnimals: [8, 20, 31, 43, 56],
  },

  // 18. 恋数の錬金術師 — Initiative×Charisma
  {
    id: "love-data-alchemist",
    name: "恋数の錬金術師",
    title: "心理の匠",
    tier: "standard",
    description:
      "アプローチ力と自己表現力を融合させた錬金術師。人の心の動きから黄金の洞察を引き出し、自分の恋愛パターンを分析・改善する。裏方で手を動かす職人型のロマンティスト。",
    catchphrase: "経験と分析で真実の愛を錬成する",
    imageUrl: "/images/jobs/data-alchemist.png",
    mascot: {
      name: "オクタン",
      animalMotif: "タコ",
      description:
        "8本の腕で同時に複数の関係を観察するタコの錬金術師。心の海を自在に泳ぎ、あらゆる感情を統合して黄金の知見を生み出す。",
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
    advancedJobs: ["love-iron-maestro", "love-silent-general"],
    actionPlan: [
      "自分の恋愛履歴を分析し、成功・失敗パターンを洗い出す",
      "心理学の理論を学び、実際のアプローチに1つずつ適用する",
      "デートやアプローチの改善点をノートにまとめ、PDCAを回す",
    ],
    compatibleAnimals: [7, 8, 19, 34, 43, 60],
  },

  // 19. 関係性の自動化職人 — Initiative×Charisma（効率化型）
  {
    id: "love-automation-artisan",
    name: "関係性の自動化職人",
    title: "絆の鍛冶",
    tier: "standard",
    description:
      "アプローチ力と自己表現力を使い、自然と関係が深まる仕組みを設計する職人。連絡頻度・デート計画・記念日管理に特化し、関係維持の負担を劇的に減らす。",
    catchphrase: "気遣いを仕組みに変える静かな職人",
    imageUrl: "/images/jobs/automation-artisan.png",
    mascot: {
      name: "アントル",
      animalMotif: "アリ",
      description:
        "巨大な巣の仕組みを設計する建築家アリ。一つ一つの行動は小さくとも、精密な設計で確実に絆を深めていく。",
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
    advancedJobs: ["love-iron-maestro", "love-one-man-army"],
    actionPlan: [
      "連絡頻度や記念日のリマインドなど関係維持の仕組みを3つ作る",
      "デートプランのテンプレートを5つ用意し、相手に合わせて選ぶ",
      "関係の進展度合いを記録し、改善ポイントを毎月レビューする",
    ],
    compatibleAnimals: [12, 19, 40, 48, 60],
  },

  // 20. ときめき魔術師 — Bonding×Charisma
  {
    id: "love-content-enchanter",
    name: "ときめき魔術師",
    title: "言霊の織り手",
    tier: "standard",
    description:
      "関係構築力と自己表現力を組み合わせ、心に響くメッセージや投稿を生み出す魔術師。多くの相手の心を掴みながら、本命だけに刺さる繊細な表現も追求できる。",
    catchphrase: "言葉の筆で心を射抜くロマンスを",
    imageUrl: "/images/jobs/content-enchanter.png",
    mascot: {
      name: "スピナ",
      animalMotif: "クモ",
      description:
        "美しい巣を織り上げるクモの魔術師。言葉という糸を巧みに操り、人の心を捕らえる愛のネットワークを紡ぎ出す。",
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
    advancedJobs: ["love-growth-oracle", "love-silent-general"],
    actionPlan: [
      "魅力的なプロフィール・投稿の作成パイプラインを構築し、週10本以上発信する",
      "自分の発信と他人の発信の反応を比較分析する",
      "自分独自のメッセージテンプレート集を作り、表現の質を標準化する",
    ],
    compatibleAnimals: [13, 31, 36, 42, 58],
  },

  // 21. 拡縁の設計士 — Bonding×Charisma（仕組み型）
  {
    id: "love-viral-engineer",
    name: "拡縁の設計士",
    title: "縁の仕掛けの匠",
    tier: "standard",
    description:
      "観察で分析、感性で企画し、出会いの導線を緻密に設計する。ときめき魔術師よりも仕組みづくりに寄った戦略型のロマンスメーカー。紹介や口コミで縁が広がる。",
    catchphrase: "縁が広がる仕組みを設計する",
    imageUrl: "/images/jobs/viral-engineer.png",
    mascot: {
      name: "ビーナル",
      animalMotif: "ミツバチ",
      description:
        "花から花へ効率的に飛び回るミツバチ。出会いの拡散経路を設計し、小さなご縁が大きなロマンスへと連鎖する仕組みを構築する。",
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
    advancedJobs: ["love-silent-general", "love-phantom-merchant"],
    actionPlan: [
      "魅力的に映ったエピソード30件を分析し、共通パターンを5つに分類する",
      "アプローチや自己紹介のA/Bテストを行い、最も響く言い回しを見つける",
      "出会いの導線（紹介・コミュニティ）の設計図を作り、実践で検証する",
    ],
    compatibleAnimals: [20, 28, 31, 42, 50],
  },

  // ========================================
  // エキスパート（8ジョブ）
  // ========================================

  // 22. 愛の軍師 — Empathy×Initiative×Bonding
  {
    id: "love-war-council",
    name: "愛の軍師",
    title: "三ツ星の知将",
    tier: "expert",
    description:
      "共感力、アプローチ力、関係構築力の3軸が高水準。自己表現以外の全てを高い次元で統合した参謀。心がわかり、人を動かせ、関係構築の方法も知っている。恋の中枢で戦略を描き、実行まで導く。",
    catchphrase: "共感・行動・縁の三位一体で恋を制す",
    imageUrl: "/images/jobs/war-council.png",
    mascot: {
      name: "リュウジン",
      animalMotif: "龍（東洋龍）",
      description:
        "天空を統べる東洋の龍。三つの宝珠（共感・行動・絆）を操り、雲の上から関係全体を見渡して最善の策を下す愛の知将。",
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
    advancedJobs: ["love-sovereign-hero", "love-void-master"],
    actionPlan: [
      "3軸を活かした年間の恋愛計画を1つ策定し、実行フェーズまで推進する",
      "異なるタイプの相手と関わるプロジェクトを主導する",
      "弱点である自己表現軸を補強し、4軸バランス型への進化を目指す",
    ],
    compatibleAnimals: [4, 15, 21, 38, 45, 52],
  },

  // 23. 人心の指揮者 — Empathy×Initiative×Bonding（育成型）
  {
    id: "love-people-maestro",
    name: "人心の指揮者",
    title: "和音の司",
    tier: "expert",
    description:
      "共感×アプローチ×関係構築だが、パートナーシップ育成と人間関係の調和に特化。相手の言葉の裏を読み、関係性を理解した上で、二人の才能を最大限に引き出す。長期的な恋愛コーチの資質。",
    catchphrase: "二人の才能を束ね、最高の和音を奏でる",
    imageUrl: "/images/jobs/people-maestro.png",
    mascot: {
      name: "キリノ",
      animalMotif: "麒麟",
      description:
        "慈愛と威厳を兼ね備えた伝説の麒麟。争いを好まず、二人の才能を調和させて美しい愛の和音を奏でる愛の指揮者。",
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
    advancedJobs: ["love-sovereign-hero"],
    actionPlan: [
      "自分とパートナーの強みを言語化し、最適な役割分担を設計する",
      "1on1の対話時間を定期化し、二人の成長プランを一緒に策定する",
      "関係性のフレームワーク（5つの愛の言語等）を学び恋愛運営を最適化する",
    ],
    compatibleAnimals: [9, 15, 21, 37, 53],
  },

  // 24. 鋼の守護者 — Empathy×Initiative×Charisma
  {
    id: "love-iron-maestro",
    name: "鋼の守護者",
    title: "万能の指揮棒",
    tier: "expert",
    description:
      "共感力、アプローチ力、自己表現力の3軸が高い守護者。実行力と魅力をパートナーに浸透させる圧倒的な推進力がある。誠実で頼れる、理想のパートナーとしての資質。",
    catchphrase: "情熱と魅力と共感力で愛を奏でる",
    imageUrl: "/images/jobs/iron-maestro.png",
    mascot: {
      name: "フェニオン",
      animalMotif: "鳳凰",
      description:
        "炎の中から何度でも蘇る不死鳥。情熱と魅力と共感の炎を纏い、二人の関係を新たな高みへと導く永遠の守護者。",
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
    advancedJobs: ["love-sovereign-hero", "love-void-master"],
    actionPlan: [
      "魅力×情熱のベストプラクティスを月1回新しいアプローチで試す",
      "気になる相手との関係構築を主導し、関係の質を20%向上させる",
      "関係構築軸を補強し、長期的な関係を築くスキルを身につける",
    ],
    compatibleAnimals: [4, 34, 38, 47, 52],
  },

  // 25. 縁結びの祈祷師 — Empathy×Initiative×Charisma（伝道型）
  {
    id: "love-digital-shaman",
    name: "縁結びの祈祷師",
    title: "霊脈の繋ぎ手",
    tier: "expert",
    description:
      "心と心の翻訳に特化。恋愛における感情の機微を読み取り、自分の経験と魅力で関係を深めながら、相手の心の奥に寄り添う愛の伝道師。",
    catchphrase: "心の声を聴き、想いを魂に届ける",
    imageUrl: "/images/jobs/digital-shaman.png",
    mascot: {
      name: "キュウビ",
      animalMotif: "九尾の狐",
      description:
        "9本の尾にそれぞれ異なる愛の知恵を宿す神秘的な狐。心と心の世界を自在に行き来し、二人の橋渡しをする縁結びの伝道者。",
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
    advancedJobs: ["love-sovereign-hero"],
    actionPlan: [
      "相手の不安や本音を丁寧にヒアリングし、解消する関わり方を実践する",
      "自分の理想の関係性を定義したビジョンノートを作成する",
      "心と心の協働モデルを実証する関係を3つ築く",
    ],
    compatibleAnimals: [10, 33, 46, 53, 59],
  },

  // 26. 運命の預言者 — Empathy×Bonding×Charisma
  {
    id: "love-growth-oracle",
    name: "運命の預言者",
    title: "未来の読み手",
    tier: "expert",
    description:
      "共感力、関係構築力、自己表現力の3軸が高い預言者。出会いの動きを読み、人に伝えて関係を動かす力に長ける。恋の戦略家としての究極形。",
    catchphrase: "感性・関係・魅力の三眼で運命を読む",
    imageUrl: "/images/jobs/growth-oracle.png",
    mascot: {
      name: "ユニオル",
      animalMotif: "ユニコーン",
      description:
        "額の角で運命を見通す伝説のユニコーン。共感の力で心の潮流を予測し、輝く角で進むべき愛の道を照らし出す。",
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
    advancedJobs: ["love-sovereign-hero", "love-void-master"],
    actionPlan: [
      "自分の恋愛パターンの予測モデルを作り、実際の恋で検証する",
      "恋愛戦略を見直し、関係の満足度を30%改善する施策を実行する",
      "アプローチ軸を補強し、行動の裏付けのある関係構築を目指す",
    ],
    compatibleAnimals: [3, 22, 26, 42, 51],
  },

  // 27. 心の幻影商人 — Empathy×Bonding×Charisma（実践型）
  {
    id: "love-phantom-merchant",
    name: "心の幻影商人",
    title: "千面の恋師",
    tier: "expert",
    description:
      "共感×関係構築×自己表現だが、より告白・関係進展に寄った実践派。魅力で惹きつけ、関係を育み、共感でファンを作る。実力で愛を引き寄せる新時代の恋の達人の最高峰。",
    catchphrase: "魅力×共感×絆で幻のように愛を引き寄せる",
    imageUrl: "/images/jobs/phantom-merchant.png",
    mascot: {
      name: "ヤタロウ",
      animalMotif: "八咫烏",
      description:
        "三本足で太陽を導く神聖な八咫烏。魅力と共感と絆の三つの力で、人には見えない出会いを察知してロマンスを生み出す。",
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
    advancedJobs: ["love-sovereign-hero"],
    actionPlan: [
      "自分らしい魅力的なデートを3パターン作り、それぞれの相性を検証する",
      "出会いから関係構築までの一気通貫フローを構築する",
      "理想の関係を実現するためのロードマップを策定し、実行に移す",
    ],
    compatibleAnimals: [16, 22, 27, 39, 51],
  },

  // 28. 沈黙の恋将軍 — Initiative×Bonding×Charisma
  {
    id: "love-silent-general",
    name: "沈黙の恋将軍",
    title: "無言の魅了者",
    tier: "expert",
    description:
      "アプローチ力、関係構築力、自己表現力の3軸が高いが、共感はやや控えめな将軍。行動と魅力で結果を出す。一人でも恋を引き寄せる自立型ロマンティストの究極形。",
    catchphrase: "語らずとも、行動と縁と魅力で制す",
    imageUrl: "/images/jobs/silent-general.png",
    mascot: {
      name: "ビャッコ",
      animalMotif: "白虎",
      description:
        "言葉少なくも圧倒的な存在感を放つ白虎。行動と関係構築と魅力の三つの牙で、無言のまま心を惹きつける孤高の恋将。",
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
    advancedJobs: ["love-sovereign-hero", "love-void-master"],
    actionPlan: [
      "自分一人で完結できる魅力構築のルーティンを設定し、実践する",
      "アプローチ×関係構築×魅力の3軸を活かしたデートを1つ計画し実行する",
      "共感軸を補強し、より深い関係を築くスキルを身につける",
    ],
    compatibleAnimals: [8, 19, 40, 43, 48],
  },

  // 29. 一騎当千の独愛者 — Initiative×Bonding×Charisma（独立型）
  {
    id: "love-one-man-army",
    name: "一騎当千の独愛者",
    title: "独立の極み",
    tier: "expert",
    description:
      "アプローチ×関係構築×自己表現の3軸がさらに高く、共感がなくとも完結する超自立型の完成形。自分で行動し、自分で関係を作り、自分の魅力で勝負する。媚びずに愛を成立させる稀有な存在。",
    catchphrase: "語らず、行動と縁と魅力で圧倒する",
    imageUrl: "/images/jobs/one-man-army.png",
    mascot: {
      name: "グリオン",
      animalMotif: "グリフォン",
      description:
        "鷲の翼と獅子の体を持つ伝説の獣。空と地の両方を制し、単独で群れに匹敵する魅力で全てを完結させる一騎当千の存在。",
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
    advancedJobs: ["love-void-master"],
    actionPlan: [
      "自分一人でも幸せに過ごせる時間と趣味を3つ確立する",
      "自分の魅力の限界を見極め、次のステージを設計する",
      "年1回は新しい出会いの場にチャレンジし、人脈の幅を広げる",
    ],
    compatibleAnimals: [4, 16, 27, 40, 56],
  },

  // ========================================
  // レジェンド（3ジョブ）
  // ========================================

  // 30. 運命の王者 — 4軸バランス型
  {
    id: "love-sovereign-hero",
    name: "運命の王者",
    title: "四天の統べ手",
    tier: "legend",
    description:
      "4軸すべてが高水準でバランスした恋愛の頂点。共感で寄り添い、行動で動かし、絆を育み、魅力で惹きつける。一人でも完結できるが、二人でこそ最高の物語を紡げる、運命を創る存在。",
    catchphrase: "四つの愛の力を束ね、運命を創る覇王",
    imageUrl: "/images/jobs/sovereign-hero.png",
    mascot: {
      name: "オウリュウ",
      animalMotif: "応龍",
      description:
        "四つの宝珠を操る翼を持つ至高の龍。共感・行動・絆・魅力の全てを統べ、新しい愛の物語そのものを創り出す覇王。",
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
      "4軸の力を活かして、自分とパートナーの理想の関係を実現する",
      "後輩や友人の恋愛相談に乗り、自分の知見を3人に伝授する",
      "自分の恋愛の経験と知見を体系化し、エッセイやSNSで発信する",
    ],
    compatibleAnimals: [4, 15, 21, 38, 45, 52],
  },

  // 31. 無窮の愛 — 極限特化型
  {
    id: "love-void-master",
    name: "無窮の愛",
    title: "無の境地",
    tier: "legend",
    description:
      "一つの道を極限まで突き詰めた結果、他の全てが不要になった達人。特化の果てに到達する悟りの境地。圧倒的な一点突破で全てを凌駕する、型を超えた愛の探求者。",
    catchphrase: "極めた先にある、何もかもを超えた愛",
    imageUrl: "/images/jobs/void-master.png",
    mascot: {
      name: "ゲンブウ",
      animalMotif: "玄武",
      description:
        "亀と蛇が一体となった太古の霊獣。一つの愛の道を永劫に歩み続けた果てに、すべてを超越した無の境地に到達した達人。",
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
      "自分の極めた魅力で、唯一無二の存在として認知される",
      "自己表現を軸にしたセルフブランドを確立し、自然と恋が訪れる状態を作る",
      "自分の到達した愛の境地を言語化し、エッセイや講演で世に発信する",
    ],
    compatibleAnimals: [7, 19, 34, 43, 48, 60],
  },

  // 32. 時代を紡ぐ者 — 仕組み設計型
  {
    id: "love-era-architect",
    name: "時代を紡ぐ者",
    title: "愛の世界の設計者",
    tier: "legend",
    description:
      "自分が動かなくても育ち続ける関係性・家族・コミュニティを設計する建築家。4軸の高い愛の能力を仕組みに変換し、自分を超えた価値を生み出す。家族を築く者の最終到達点。",
    catchphrase: "絆を設計し、次の時代の愛を紡ぐ",
    imageUrl: "/images/jobs/era-architect.png",
    mascot: {
      name: "スザクル",
      animalMotif: "朱雀",
      description:
        "炎の翼で次の時代を照らす神鳥・朱雀。自らの愛の炎で古い関係観を焼き払い、灰の中から新しい愛の世界の設計図を描き上げる。",
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
      "自分がいなくても育ち続ける家族・コミュニティの仕組みを1つ完成させる",
      "3つ以上の人間関係（恋人・家族・友人）を同時に育むエコシステムを構築する",
      "次世代のロマンティストやパートナーが育つ場を作り、愛の文化を継承する",
    ],
    compatibleAnimals: [4, 21, 38, 45, 52, 57],
  },
];

// ジョブ階層ラベル
export const LOVE_JOB_TIER_LABELS: Record<string, string> = {
  basic: "ベーシック",
  standard: "スタンダード",
  expert: "エキスパート",
  legend: "レジェンド",
};
