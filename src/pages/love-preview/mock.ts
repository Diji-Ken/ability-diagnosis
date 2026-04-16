/**
 * LOVE track デザインプレビュー用モックデータ
 *
 * 本番の LOVE track (/love/*) とは完全に切り離されたダミー情報。
 * 3パターン（Dreamy / Elegant / Playful）で共通利用する。
 */
export const mockUser = {
  displayName: 'さくらさん',
  level: 7,
  levelTitle: '探求者',
  streak: 3,
  points: 90,
  expCurrent: 9,
  expNext: 18,
  jobName: '甘言の語り部',
  jobSubtitle: '愛の語り商い',
  jobTier: 'C',
  matchScore: 89,
  mascotImage: '/images/jobs/messenger-peddler.png',
  skillParams: {
    empathy: 61, // 共感力
    approach: 56, // アプローチ力
    relationship: 56, // 関係構築力
    selfExpression: 61, // 自己表現力
  },
  subParams: {
    charm: 41, // 魅力アピール
    timing: 61, // 行動力・タイミング
    learning: 56, // 共感・学び
    trust: 36, // 信頼・安心感
    luck: 46, // 恋愛運
    lead: 41, // リード力
  },
} as const
