import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { mockUser } from './mock'

/**
 * Pattern C: Playful Clay Romance
 *
 * ぽってり粘土の、明るくポップなお遊び。
 * Coral (#FF6B8A), Butter (#FFD166), Mint (#06D6A0), Sky (#A5D8FF)
 */
export function LovePlayfulPreview() {
  useEffect(() => {
    const href =
      'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700&family=Zen+Maru+Gothic:wght@500;700&family=Noto+Sans+JP:wght@400;500&display=swap'
    const existing = document.querySelector('link[data-playful-fonts]')
    if (!existing) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.setAttribute('data-playful-fonts', 'true')
      document.head.appendChild(link)
    }
  }, [])

  const expPct = (mockUser.expCurrent / mockUser.expNext) * 100

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: '#FFF8F3',
        color: '#2D2A32',
      }}
    >
      <style>{`
        .pl-fredoka { font-family: 'Fredoka', sans-serif; }
        .pl-nunito { font-family: 'Nunito', sans-serif; }
        .pl-zen { font-family: 'Zen Maru Gothic', sans-serif; }
        .pl-sans-jp { font-family: 'Noto Sans JP', sans-serif; }
        .pl-clay {
          box-shadow: 0 6px 0 #E8445F, 0 12px 24px rgba(255,107,138,0.2);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }
        .pl-clay:active { transform: translateY(4px); box-shadow: 0 2px 0 #E8445F, 0 4px 8px rgba(255,107,138,0.15); }
        .pl-clay-butter { box-shadow: 0 6px 0 #D9A839, 0 12px 24px rgba(255,209,102,0.2); transition: transform 150ms ease, box-shadow 150ms ease; }
        .pl-clay-butter:active { transform: translateY(4px); box-shadow: 0 2px 0 #D9A839, 0 4px 8px rgba(255,209,102,0.15); }
        .pl-clay-mint { box-shadow: 0 6px 0 #059A75, 0 12px 24px rgba(6,214,160,0.2); transition: transform 150ms ease, box-shadow 150ms ease; }
        .pl-clay-mint:active { transform: translateY(4px); box-shadow: 0 2px 0 #059A75, 0 4px 8px rgba(6,214,160,0.15); }
        .pl-clay-sky { box-shadow: 0 6px 0 #6FADE0, 0 12px 24px rgba(165,216,255,0.25); transition: transform 150ms ease, box-shadow 150ms ease; }
        .pl-clay-sky:active { transform: translateY(4px); box-shadow: 0 2px 0 #6FADE0, 0 4px 8px rgba(165,216,255,0.15); }
        .pl-clay-dark {
          box-shadow: 0 6px 0 rgba(0,0,0,0.12), 0 12px 24px rgba(0,0,0,0.08);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }
        .pl-clay-dark:active { transform: translateY(4px); box-shadow: 0 2px 0 rgba(0,0,0,0.12); }
        .pl-grad-exp { background: linear-gradient(90deg, #FF6B8A 0%, #FFD166 100%); }
        @media (prefers-reduced-motion: reduce) {
          .pl-anim, .pl-clay, .pl-clay-butter, .pl-clay-mint, .pl-clay-sky, .pl-clay-dark {
            transition: none !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-xl px-5 pt-4 pb-16">
        {/* Back link */}
        <div className="pb-3">
          <Link
            to="/love-preview"
            className="pl-zen inline-flex items-center gap-1 text-xs"
            style={{ color: '#7A6F7D' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            プレビュー比較に戻る
          </Link>
        </div>

        {/* Header */}
        <header className="flex items-center justify-between py-3">
          <span
            className="pl-fredoka text-2xl font-bold"
            style={{ color: '#FF6B8A' }}
          >
            🎀 ABILITY LOVE
          </span>

          {/* Segment switch */}
          <div
            className="pl-clay-dark inline-flex items-center gap-0.5 rounded-full bg-white p-1"
            style={{ border: '2px solid #2D2A32' }}
          >
            <span
              className="pl-fredoka inline-flex h-8 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: '#FF6B8A' }}
            >
              ♡
            </span>
            <span
              className="pl-fredoka inline-flex h-8 w-9 items-center justify-center rounded-full text-sm font-bold"
              style={{ color: '#7A6F7D' }}
            >
              ⚔
            </span>
          </div>
        </header>

        {/* Welcome */}
        <section className="py-5">
          <h1
            className="pl-zen text-2xl leading-snug font-bold sm:text-3xl"
            style={{ color: '#2D2A32' }}
          >
            こんにちは、さくらちゃん！ <span>🌸</span>
          </h1>
          <p
            className="pl-zen mt-1 text-sm font-medium"
            style={{ color: '#7A6F7D' }}
          >
            今日も元気に恋を楽しもう〜！
          </p>
        </section>

        {/* Job Card */}
        <section
          className="pl-clay flex flex-col items-center gap-3 rounded-[32px] bg-white p-8"
          style={{ border: '4px solid #FF6B8A' }}
        >
          <div
            className="flex h-40 w-40 items-center justify-center rounded-[28px]"
            style={{
              background:
                'linear-gradient(135deg, #FFE3EA 0%, #FFF5D7 100%)',
              border: '3px solid #FFD166',
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
              className="pl-fredoka text-xs tracking-widest"
              style={{ color: '#06D6A0' }}
            >
              YOUR LOVE JOB
            </p>
            <h2
              className="pl-zen mt-1 text-2xl font-bold leading-tight"
              style={{ color: '#2D2A32' }}
            >
              {mockUser.jobName}
            </h2>
            <p
              className="pl-zen mt-1 text-sm font-medium"
              style={{ color: '#7A6F7D' }}
            >
              {mockUser.jobSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="pl-fredoka inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ background: '#FF6B8A' }}
            >
              Tier {mockUser.jobTier}
            </span>
            <span
              className="pl-fredoka inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
              style={{ background: '#FFD166', color: '#5C4200' }}
            >
              Match {mockUser.matchScore}%
            </span>
          </div>
        </section>

        {/* Status 3 cards */}
        <section className="mt-6 grid grid-cols-3 gap-3">
          <ClayStatCard
            value={mockUser.level.toString()}
            unit="Lv"
            label="レベル"
            bg="#FFD166"
            shadowClass="pl-clay-butter"
            valueColor="#5C4200"
          />
          <ClayStatCard
            value={`🔥${mockUser.streak}`}
            unit="days"
            label="ストリーク"
            bg="#FF6B8A"
            shadowClass="pl-clay"
            valueColor="#FFFFFF"
          />
          <ClayStatCard
            value={`💎${mockUser.points}`}
            unit="pt"
            label="ポイント"
            bg="#06D6A0"
            shadowClass="pl-clay-mint"
            valueColor="#FFFFFF"
          />
        </section>

        {/* EXP bar */}
        <section
          className="pl-clay-dark mt-6 rounded-[24px] bg-white p-5"
          style={{ border: '3px solid #2D2A32' }}
        >
          <div className="flex items-end justify-between">
            <div>
              <span
                className="pl-fredoka text-xs tracking-widest"
                style={{ color: '#7A6F7D' }}
              >
                EXP
              </span>
              <div className="pl-zen text-xl font-bold">
                {mockUser.expCurrent}
                <span
                  className="pl-zen text-sm font-medium"
                  style={{ color: '#7A6F7D' }}
                >
                  /{mockUser.expNext}
                </span>
              </div>
            </div>
            <div
              className="pl-clay-butter rounded-full px-3 py-1.5"
              style={{ background: '#FFD166', border: '2px solid #2D2A32' }}
            >
              <span
                className="pl-zen text-xs font-bold"
                style={{ color: '#5C4200' }}
              >
                あと {mockUser.expNext - mockUser.expCurrent} で Lv UP!
              </span>
            </div>
          </div>
          <div
            className="mt-3 h-5 overflow-hidden rounded-full"
            style={{
              background: '#FFF0E1',
              border: '2px solid #2D2A32',
            }}
          >
            <div
              className="pl-grad-exp h-full rounded-full"
              style={{ width: `${expPct}%` }}
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-6">
          <h3
            className="pl-zen mb-3 text-base font-bold"
            style={{ color: '#2D2A32' }}
          >
            できること
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <ClayActionButton emoji="📖" label="日誌" color="#FF6B8A" />
            <ClayActionButton emoji="💞" label="相性" color="#FFD166" />
            <ClayActionButton emoji="✨" label="AI分析" color="#06D6A0" />
            <ClayActionButton emoji="📣" label="シェア" color="#A5D8FF" />
            <ClayActionButton emoji="🔄" label="再診断" color="#FF6B8A" />
            <ClayActionButton emoji="📚" label="履歴" color="#FFD166" />
          </div>
        </section>

        {/* Skill params */}
        <section
          className="pl-clay-dark mt-6 rounded-[24px] bg-white p-5"
          style={{ border: '3px solid #2D2A32' }}
        >
          <h3
            className="pl-zen mb-4 text-base font-bold"
            style={{ color: '#2D2A32' }}
          >
            恋愛パラメータ
          </h3>
          <div className="space-y-4">
            <PlayfulBar
              label="共感力"
              value={mockUser.skillParams.empathy}
              color="#FF6B8A"
            />
            <PlayfulBar
              label="アプローチ力"
              value={mockUser.skillParams.approach}
              color="#FFD166"
            />
            <PlayfulBar
              label="関係構築力"
              value={mockUser.skillParams.relationship}
              color="#06D6A0"
            />
            <PlayfulBar
              label="自己表現力"
              value={mockUser.skillParams.selfExpression}
              color="#A5D8FF"
            />
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() =>
              alert('Playful Clay を採用候補として記録しました！（モック）')
            }
            className="pl-clay pl-fredoka rounded-[28px] bg-white px-10 py-5 text-base font-bold"
            style={{
              color: '#FF6B8A',
              border: '4px solid #FF6B8A',
            }}
          >
            このデザインで決定！
          </button>
          <Link
            to="/love-preview"
            className="pl-zen text-xs font-medium underline-offset-4 hover:underline"
            style={{ color: '#7A6F7D' }}
          >
            他のパターンを見る
          </Link>
        </section>
      </div>
    </div>
  )
}

function ClayStatCard({
  value,
  unit,
  label,
  bg,
  shadowClass,
  valueColor,
}: {
  value: string
  unit: string
  label: string
  bg: string
  shadowClass: string
  valueColor: string
}) {
  return (
    <div
      className={`${shadowClass} flex flex-col items-center gap-0.5 rounded-[20px] px-2 py-4`}
      style={{
        background: bg,
        border: '3px solid #2D2A32',
      }}
    >
      <span
        className="pl-fredoka text-2xl leading-none font-bold"
        style={{ color: valueColor }}
      >
        {value}
      </span>
      <span
        className="pl-fredoka text-[10px] leading-none font-bold tracking-wider"
        style={{ color: valueColor, opacity: 0.8 }}
      >
        {unit}
      </span>
      <span
        className="pl-zen mt-1 text-[10px] font-bold"
        style={{ color: valueColor, opacity: 0.85 }}
      >
        {label}
      </span>
    </div>
  )
}

function ClayActionButton({
  emoji,
  label,
  color,
}: {
  emoji: string
  label: string
  color: string
}) {
  // 色に合わせて shadow のクラスを出し分け（粘土感）
  const shadowClass =
    color === '#FF6B8A'
      ? 'pl-clay'
      : color === '#FFD166'
        ? 'pl-clay-butter'
        : color === '#06D6A0'
          ? 'pl-clay-mint'
          : 'pl-clay-sky'

  return (
    <button
      type="button"
      className={`${shadowClass} flex aspect-square flex-col items-center justify-center gap-1 rounded-[22px] bg-white`}
      style={{
        border: `3px solid ${color}`,
      }}
    >
      <span className="text-3xl" aria-hidden>
        {emoji}
      </span>
      <span
        className="pl-zen text-xs font-bold"
        style={{ color: '#2D2A32' }}
      >
        {label}
      </span>
    </button>
  )
}

function PlayfulBar({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span
          className="pl-zen text-sm font-bold"
          style={{ color: '#2D2A32' }}
        >
          {label}
        </span>
        <span
          className="pl-fredoka text-sm font-bold"
          style={{ color: '#2D2A32' }}
        >
          {value}
        </span>
      </div>
      <div
        className="h-4 overflow-hidden rounded-full"
        style={{
          background: '#FFF0E1',
          border: '2px solid #2D2A32',
        }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  )
}
