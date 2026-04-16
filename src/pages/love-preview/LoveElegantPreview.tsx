import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Heart,
  PenLine,
  RefreshCcw,
  Share2,
  History,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import { mockUser } from './mock'

/**
 * Pattern B: Elegant Liquid Romance
 *
 * ローズゴールドとガラスの静謐なエレガンス。
 * Deep Rose (#8B2E4F), Rose Gold (#C9A961), Dusty (#D4A5A5)
 */
export function LoveElegantPreview() {
  useEffect(() => {
    const href =
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Noto+Sans+JP:wght@300;400;500&display=swap'
    const existing = document.querySelector('link[data-elegant-fonts]')
    if (!existing) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.setAttribute('data-elegant-fonts', 'true')
      document.head.appendChild(link)
    }
  }, [])

  const radarData = [
    { axis: 'Empathy', value: mockUser.skillParams.empathy },
    { axis: 'Approach', value: mockUser.skillParams.approach },
    { axis: 'Relationship', value: mockUser.skillParams.relationship },
    { axis: 'Self-expression', value: mockUser.skillParams.selfExpression },
  ]

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          'radial-gradient(120% 80% at 10% -10%, rgba(201,169,97,0.10) 0%, rgba(250,245,242,0) 60%), radial-gradient(120% 80% at 110% 110%, rgba(139,46,79,0.10) 0%, rgba(250,245,242,0) 60%), #FAF5F2',
        color: '#1C1917',
      }}
    >
      <style>{`
        .el-serif { font-family: 'Playfair Display', serif; }
        .el-italic { font-family: 'Playfair Display', serif; font-style: italic; }
        .el-sans { font-family: 'Noto Sans JP', sans-serif; font-weight: 300; }
        .el-sans-md { font-family: 'Noto Sans JP', sans-serif; font-weight: 400; }
        .el-hair { border-top: 1px solid rgba(201, 169, 97, 0.4); }
        .el-glass {
          background: rgba(255, 255, 255, 0.6);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .el-gold { color: #C9A961; }
        .el-deep-rose { color: #8B2E4F; }
        @media (prefers-reduced-motion: reduce) {
          .el-anim { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-3xl px-6 pt-4 pb-20 sm:px-10">
        {/* Back link */}
        <div className="pb-3">
          <Link
            to="/love-preview"
            className="el-sans inline-flex items-center gap-1 text-[11px] tracking-widest uppercase"
            style={{ color: '#57534E' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1} />
            Back to compare
          </Link>
        </div>

        {/* Header */}
        <header className="flex items-center justify-between pt-6 pb-8">
          <h1
            className="el-serif text-3xl font-semibold tracking-[0.15em]"
            style={{ color: '#8B2E4F' }}
          >
            LOVE
          </h1>
          <Link
            to="#"
            className="el-italic text-sm opacity-70"
            style={{ color: '#57534E' }}
          >
            to business →
          </Link>
        </header>

        {/* Welcome */}
        <section className="pb-6 text-right">
          <p
            className="el-italic text-base"
            style={{ color: '#57534E' }}
          >
            Hello, {mockUser.displayName.replace('さん', '-san')}
          </p>
        </section>
        <div className="el-hair" />

        {/* Level */}
        <section className="py-10 text-center">
          <p
            className="el-sans text-[11px] tracking-[0.3em] uppercase"
            style={{ color: '#C9A961' }}
          >
            Level Seven
          </p>
          <h2
            className="el-italic mt-2 text-6xl leading-none sm:text-7xl"
            style={{ color: '#8B2E4F' }}
          >
            Lv.{mockUser.level}
          </h2>
          <p
            className="el-serif mt-3 text-lg"
            style={{ color: '#1C1917' }}
          >
            Aficionado
            <span
              className="el-sans ml-2 text-xs"
              style={{ color: '#57534E' }}
            >
              — {mockUser.levelTitle}
            </span>
          </p>
        </section>
        <div className="el-hair" />

        {/* Job Card */}
        <section className="py-10">
          <div
            className="el-glass flex flex-col gap-5 rounded-lg p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
            style={{ boxShadow: '0 8px 24px -12px rgba(139, 46, 79, 0.15)' }}
          >
            <div
              className="mx-auto flex h-32 w-32 shrink-0 items-center justify-center rounded-full sm:mx-0"
              style={{
                background:
                  'radial-gradient(circle, rgba(201,169,97,0.15) 0%, rgba(255,255,255,0) 70%)',
              }}
            >
              <img
                src={mockUser.mascotImage}
                alt="Mascot"
                className="h-28 w-28 object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p
                className="el-sans text-[10px] tracking-[0.25em] uppercase"
                style={{ color: '#C9A961' }}
              >
                Your vocation of love
              </p>
              <h3
                className="el-italic mt-1 text-3xl leading-tight"
                style={{ color: '#1C1917' }}
              >
                {mockUser.jobName}
              </h3>
              <p
                className="el-sans mt-2 text-sm"
                style={{ color: '#57534E' }}
              >
                {mockUser.jobSubtitle}
              </p>
              <div
                className="mt-4 flex items-center justify-center gap-4 sm:justify-start"
              >
                <span
                  className="el-italic text-sm"
                  style={{ color: '#8B2E4F' }}
                >
                  Tier {mockUser.jobTier}
                </span>
                <span
                  className="el-hair inline-block h-4 w-px"
                  style={{
                    borderLeft: '1px solid rgba(201,169,97,0.5)',
                    borderTop: 'none',
                  }}
                />
                <span
                  className="el-italic text-sm"
                  style={{ color: '#1C1917' }}
                >
                  Match {mockUser.matchScore}%
                </span>
              </div>
            </div>
          </div>
        </section>
        <div className="el-hair" />

        {/* Radar section */}
        <section className="py-10">
          <p
            className="el-sans mb-6 text-center text-[11px] tracking-[0.3em] uppercase"
            style={{ color: '#C9A961' }}
          >
            Your profile of love
          </p>
          <div className="mx-auto w-full max-w-md">
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid
                    stroke="rgba(201, 169, 97, 0.35)"
                    strokeDasharray="0"
                  />
                  <PolarAngleAxis
                    dataKey="axis"
                    tick={{
                      fill: '#57534E',
                      fontSize: 11,
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                    }}
                  />
                  <Radar
                    name="You"
                    dataKey="value"
                    stroke="#8B2E4F"
                    strokeWidth={1.5}
                    fill="#C9A961"
                    fillOpacity={0.12}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
        <div className="el-hair" />

        {/* Explore */}
        <section className="py-10">
          <p
            className="el-sans mb-6 text-center text-[11px] tracking-[0.3em] uppercase"
            style={{ color: '#C9A961' }}
          >
            Explore
          </p>
          <ul className="space-y-1">
            <ElegantListItem
              icon={<BookOpen className="h-4 w-4" strokeWidth={1} />}
              label="Re-read your analysis"
              jp="分析結果を読み返す"
            />
            <ElegantListItem
              icon={<Heart className="h-4 w-4" strokeWidth={1} />}
              label="Discover compatibility"
              jp="相性を確かめる"
            />
            <ElegantListItem
              icon={<PenLine className="h-4 w-4" strokeWidth={1} />}
              label="Journal today"
              jp="今日の日誌をつける"
            />
            <ElegantListItem
              icon={<Share2 className="h-4 w-4" strokeWidth={1} />}
              label="Share your result"
              jp="結果をシェアする"
            />
            <ElegantListItem
              icon={<RefreshCcw className="h-4 w-4" strokeWidth={1} />}
              label="Retake"
              jp="再診断"
            />
            <ElegantListItem
              icon={<History className="h-4 w-4" strokeWidth={1} />}
              label="History"
              jp="履歴"
            />
          </ul>
        </section>
        <div className="el-hair" />

        {/* Footer CTA */}
        <section className="flex flex-col items-center gap-4 pt-12">
          <button
            type="button"
            onClick={() =>
              alert('Elegant Liquid を採用候補として記録しました（モック）')
            }
            className="el-italic rounded-sm px-10 py-3 text-sm tracking-[0.2em] uppercase transition-colors hover:bg-[#C9A961]/10"
            style={{
              border: '1px solid #C9A961',
              color: '#8B2E4F',
              letterSpacing: '0.25em',
            }}
          >
            Select this design
          </button>
          <Link
            to="/love-preview"
            className="el-sans text-[11px] tracking-widest uppercase"
            style={{ color: '#57534E' }}
          >
            Back to compare
          </Link>
        </section>
      </div>
    </div>
  )
}

function ElegantListItem({
  icon,
  label,
  jp,
}: {
  icon: React.ReactNode
  label: string
  jp: string
}) {
  return (
    <li>
      <button
        type="button"
        className="el-anim group flex w-full items-center gap-4 px-2 py-4 text-left transition-colors hover:bg-white/40"
        style={{ borderBottom: '1px solid rgba(201,169,97,0.2)' }}
      >
        <span style={{ color: '#C9A961' }}>{icon}</span>
        <span className="flex-1">
          <span
            className="el-italic block text-base"
            style={{ color: '#1C1917' }}
          >
            {label}
          </span>
          <span
            className="el-sans mt-0.5 block text-[11px]"
            style={{ color: '#57534E' }}
          >
            {jp}
          </span>
        </span>
        <ChevronRight
          className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-1"
          strokeWidth={1}
          style={{ color: '#8B2E4F' }}
        />
      </button>
    </li>
  )
}
