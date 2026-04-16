import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  BookHeart,
  Heart,
  Sparkles,
  Share2,
  RefreshCcw,
  History,
  Swords,
} from 'lucide-react'
import { mockUser } from './mock'

/**
 * Pattern A: Soft Dreamy Romance
 *
 * ふんわり甘い、夢見心地のロマンティック。
 * Primary Rose (#FF9FB2), Lavender (#C9B1E8), Mist (#FFE4E1)
 */
export function LoveDreamyPreview() {
  useEffect(() => {
    const href =
      'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500;600;700&family=Zen+Maru+Gothic:wght@400;500;700&family=Caveat:wght@500;700&display=swap'
    const existing = document.querySelector('link[data-dreamy-fonts]')
    if (!existing) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.setAttribute('data-dreamy-fonts', 'true')
      document.head.appendChild(link)
    }
  }, [])

  const expPct = (mockUser.expCurrent / mockUser.expNext) * 100
  const matchPct = mockUser.matchScore

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          'linear-gradient(180deg, #FFF9F5 0%, #FFE4E1 40%, #FFF9F5 100%)',
        color: '#5A4A5E',
      }}
    >
      <style>{`
        .dr-serif { font-family: 'Noto Serif JP', serif; }
        .dr-zen { font-family: 'Zen Maru Gothic', sans-serif; }
        .dr-caveat { font-family: 'Caveat', cursive; }
        .dr-soft-shadow { box-shadow: 0 20px 40px -20px rgba(255, 159, 178, 0.3); }
        .dr-soft-shadow-sm { box-shadow: 0 10px 24px -16px rgba(255, 159, 178, 0.35); }
        .dr-grad-primary { background: linear-gradient(135deg, #FF9FB2 0%, #C9B1E8 100%); }
        .dr-grad-bar { background: linear-gradient(90deg, #FF9FB2 0%, #C9B1E8 100%); }
        .dr-back-link { color: #8A7C95; }
        @media (prefers-reduced-motion: reduce) {
          .dr-anim { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-xl px-5 pb-16 pt-4">
        {/* Back link */}
        <div className="pb-3">
          <Link
            to="/love-preview"
            className="dr-back-link dr-zen inline-flex items-center gap-1 text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            プレビュー比較に戻る
          </Link>
        </div>

        {/* Header */}
        <header className="flex items-center justify-between py-3">
          <span className="dr-caveat text-3xl" style={{ color: '#FF6B8A' }}>
            ability love ♡
          </span>
          <button
            type="button"
            className="dr-zen inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"
            style={{
              background: '#FFFFFF',
              color: '#8A7C95',
              boxShadow: '0 6px 12px -8px rgba(255, 159, 178, 0.4)',
            }}
          >
            <Swords className="h-3.5 w-3.5" strokeWidth={1.5} />
            ビジネスへ
          </button>
        </header>

        {/* Welcome */}
        <section className="py-6">
          <h1 className="dr-serif text-2xl leading-snug font-semibold sm:text-3xl">
            こんにちは、{mockUser.displayName}{' '}
            <span style={{ color: '#FF6B8A' }}>♡</span>
          </h1>
          <p className="dr-zen mt-2 text-sm" style={{ color: '#8A7C95' }}>
            今日もあなたらしく、恋を育てていきましょう。
          </p>
        </section>

        {/* Job Card */}
        <section
          className="dr-soft-shadow flex flex-col items-center gap-4 rounded-[24px] bg-white p-6 sm:p-8"
        >
          <div
            className="flex h-36 w-36 items-center justify-center rounded-full"
            style={{
              background:
                'radial-gradient(circle, #FFE4E1 0%, #FFFFFF 80%)',
            }}
          >
            <img
              src={mockUser.mascotImage}
              alt="マスコット"
              className="h-32 w-32 object-contain"
              loading="lazy"
            />
          </div>

          <div className="text-center">
            <p
              className="dr-caveat text-lg"
              style={{ color: '#C9B1E8' }}
            >
              Your love job
            </p>
            <h2 className="dr-serif mt-1 text-2xl font-bold leading-tight">
              {mockUser.jobName}
            </h2>
            <p
              className="dr-zen mt-1 text-sm"
              style={{ color: '#8A7C95' }}
            >
              {mockUser.jobSubtitle} · Tier {mockUser.jobTier}
            </p>
          </div>

          <div className="w-full">
            <div
              className="dr-zen mb-1.5 flex items-center justify-between text-xs"
              style={{ color: '#8A7C95' }}
            >
              <span>マッチ度</span>
              <span
                className="dr-serif text-base font-bold"
                style={{ color: '#FF6B8A' }}
              >
                {matchPct}%
              </span>
            </div>
            <div
              className="h-2.5 overflow-hidden rounded-full"
              style={{ background: '#FFE4E1' }}
            >
              <div
                className="dr-grad-bar h-full rounded-full"
                style={{ width: `${matchPct}%` }}
              />
            </div>
          </div>
        </section>

        {/* Status row */}
        <section className="mt-6 grid grid-cols-3 gap-3">
          <StatusCard
            label="Level"
            value={`Lv.${mockUser.level}`}
            sub={mockUser.levelTitle}
            emoji="✨"
          />
          <StatusCard
            label="Streak"
            value={`${mockUser.streak}日`}
            sub="連続記録"
            emoji="🌸"
          />
          <StatusCard
            label="Points"
            value={`${mockUser.points}`}
            sub="pt"
            emoji="💎"
          />
        </section>

        {/* EXP bar */}
        <section
          className="dr-soft-shadow-sm mt-6 rounded-[20px] bg-white p-5"
        >
          <div className="dr-zen flex items-center justify-between text-xs">
            <span style={{ color: '#8A7C95' }}>EXP</span>
            <span style={{ color: '#5A4A5E' }}>
              <span className="dr-serif text-base font-bold">
                {mockUser.expCurrent}
              </span>
              <span className="opacity-60">/{mockUser.expNext}</span>
            </span>
          </div>
          <div
            className="mt-2 h-3 overflow-hidden rounded-full"
            style={{ background: '#FFE4E1' }}
          >
            <div
              className="dr-grad-bar h-full rounded-full"
              style={{ width: `${expPct}%` }}
            />
          </div>
          <p
            className="dr-zen mt-2 text-xs"
            style={{ color: '#8A7C95' }}
          >
            次のレベルまであと {mockUser.expNext - mockUser.expCurrent}
          </p>
        </section>

        {/* Quick Actions */}
        <section className="mt-6">
          <h3 className="dr-serif mb-3 text-base font-semibold">
            Quick Actions
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <QuickAction icon={<BookHeart strokeWidth={1.5} />} label="日誌" />
            <QuickAction icon={<Heart strokeWidth={1.5} />} label="相性" />
            <QuickAction
              icon={<Sparkles strokeWidth={1.5} />}
              label="AI分析"
            />
            <QuickAction icon={<Share2 strokeWidth={1.5} />} label="シェア" />
            <QuickAction
              icon={<RefreshCcw strokeWidth={1.5} />}
              label="再診断"
            />
            <QuickAction icon={<History strokeWidth={1.5} />} label="履歴" />
          </div>
        </section>

        {/* Skill params */}
        <section
          className="dr-soft-shadow-sm mt-6 rounded-[20px] bg-white p-5"
        >
          <h3 className="dr-serif mb-4 text-base font-semibold">
            あなたの恋愛4軸
          </h3>
          <div className="space-y-3.5">
            <SkillBar label="共感力" value={mockUser.skillParams.empathy} />
            <SkillBar
              label="アプローチ力"
              value={mockUser.skillParams.approach}
            />
            <SkillBar
              label="関係構築力"
              value={mockUser.skillParams.relationship}
            />
            <SkillBar
              label="自己表現力"
              value={mockUser.skillParams.selfExpression}
            />
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() =>
              alert('Soft Dreamy を採用候補として記録しました ♡（モック）')
            }
            className="dr-grad-primary dr-zen rounded-full px-8 py-4 text-sm font-bold text-white"
            style={{
              boxShadow: '0 12px 28px -12px rgba(255, 107, 138, 0.6)',
            }}
          >
            このデザインを採用する
          </button>
          <Link
            to="/love-preview"
            className="dr-zen text-xs underline-offset-4 hover:underline"
            style={{ color: '#8A7C95' }}
          >
            他のパターンを見る
          </Link>
        </section>
      </div>
    </div>
  )
}

function StatusCard({
  label,
  value,
  sub,
  emoji,
}: {
  label: string
  value: string
  sub: string
  emoji: string
}) {
  return (
    <div
      className="dr-soft-shadow-sm flex flex-col items-center gap-1 rounded-[18px] bg-white px-2 py-4"
    >
      <span className="text-xl" aria-hidden>
        {emoji}
      </span>
      <span
        className="dr-caveat text-sm leading-none"
        style={{ color: '#C9B1E8' }}
      >
        {label}
      </span>
      <span className="dr-serif text-base font-bold">{value}</span>
      <span
        className="dr-zen text-[10px]"
        style={{ color: '#8A7C95' }}
      >
        {sub}
      </span>
    </div>
  )
}

function QuickAction({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      className="dr-soft-shadow-sm flex aspect-square flex-col items-center justify-center gap-1.5 rounded-[18px] bg-white transition-transform hover:-translate-y-0.5"
    >
      <span style={{ color: '#FF9FB2' }} className="dr-anim">
        {icon}
      </span>
      <span
        className="dr-zen text-xs font-medium"
        style={{ color: '#5A4A5E' }}
      >
        {label}
      </span>
    </button>
  )
}

function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="dr-zen mb-1 flex items-center justify-between text-xs">
        <span style={{ color: '#5A4A5E' }}>{label}</span>
        <span style={{ color: '#8A7C95' }}>{value}</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full"
        style={{ background: '#FFE4E1' }}
      >
        <div
          className="dr-grad-bar h-full rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
