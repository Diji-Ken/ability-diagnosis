import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Sparkles, Wand2 } from 'lucide-react'

/**
 * LOVE track デザイン比較ランディングページ（パブリック）
 *
 * 既存の LOVE track (/love/*) とは完全に独立した静的プレビュー。
 * モックデータのみで動作し、認証不要。
 */
export function LovePreviewIndex() {
  useEffect(() => {
    // 3パターンで使う主要フォントをまとめて読み込む（どのカードからも飛べるように）
    const href =
      'https://fonts.googleapis.com/css2?' +
      'family=Noto+Serif+JP:wght@500;600;700&' +
      'family=Zen+Maru+Gothic:wght@400;500;700&' +
      'family=Caveat:wght@500;700&' +
      'family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&' +
      'family=Noto+Sans+JP:wght@300;400;500&' +
      'family=Fredoka:wght@400;500;600;700&' +
      'family=Nunito:wght@400;600;700&display=swap'
    const existing = document.querySelector(`link[data-love-preview-fonts]`)
    if (!existing) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.setAttribute('data-love-preview-fonts', 'true')
      document.head.appendChild(link)
    }
  }, [])

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          'linear-gradient(180deg, #FFF9F5 0%, #FAF5F2 50%, #FFF8F3 100%)',
      }}
    >
      <style>{`
        .lp-caveat { font-family: 'Caveat', cursive; }
        .lp-serif-jp { font-family: 'Noto Serif JP', serif; }
        .lp-playfair { font-family: 'Playfair Display', serif; }
        .lp-fredoka { font-family: 'Fredoka', 'Nunito', sans-serif; }
        .lp-zen { font-family: 'Zen Maru Gothic', 'Nunito', sans-serif; }
        .lp-sans-jp { font-family: 'Noto Sans JP', sans-serif; }
        @media (prefers-reduced-motion: reduce) {
          .lp-hover-lift { transition: none !important; }
        }
      `}</style>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 pt-8 pb-4">
        <span
          className="lp-caveat text-3xl"
          style={{ color: '#FF6B8A' }}
        >
          love preview ♡
        </span>
        <span
          className="lp-sans-jp text-xs tracking-widest"
          style={{ color: '#8A7C95' }}
        >
          DESIGN COMPARE
        </span>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-20">
        <section className="py-6 text-center sm:py-10">
          <h1
            className="lp-serif-jp text-3xl font-bold leading-tight sm:text-4xl"
            style={{ color: '#5A4A5E' }}
          >
            LOVE track デザイン比較
            <br />
            <span style={{ color: '#FF6B8A' }}>― 3パターン</span>
          </h1>
          <p
            className="lp-zen mt-4 text-sm leading-relaxed sm:text-base"
            style={{ color: '#8A7C95' }}
          >
            どれがYouTube集客の顔にふさわしいか、実際に触って選んでください。
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {/* Pattern A - Soft Dreamy */}
          <PreviewCard
            to="/love-preview/dreamy"
            title="Soft Dreamy"
            subtitle="Pattern A"
            concept="ふんわり甘い、夢見心地のロマンティック"
            accentFont="lp-caveat"
            accentLabel="dreamy ♡"
            style={{
              background:
                'linear-gradient(135deg, #FFE4E1 0%, #FFFFFF 50%, #C9B1E8 140%)',
              borderRadius: 24,
              boxShadow:
                '0 20px 40px -20px rgba(255, 159, 178, 0.4), 0 0 0 1px rgba(255, 159, 178, 0.1)',
              color: '#5A4A5E',
            }}
            paletteChips={['#FF9FB2', '#C9B1E8', '#FFE4E1']}
            icon={<Heart className="h-5 w-5" strokeWidth={1.5} />}
          />

          {/* Pattern B - Elegant Liquid */}
          <PreviewCard
            to="/love-preview/elegant"
            title="Elegant Liquid"
            subtitle="Pattern B"
            concept="ローズゴールドと硝子の静謐なエレガンス"
            accentFont="lp-playfair italic"
            accentLabel="elegant"
            style={{
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.75), rgba(212,165,165,0.12))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 8,
              border: '1px solid rgba(201, 169, 97, 0.3)',
              boxShadow: '0 8px 24px -12px rgba(139, 46, 79, 0.2)',
              color: '#1C1917',
            }}
            paletteChips={['#8B2E4F', '#C9A961', '#D4A5A5']}
            icon={<Sparkles className="h-5 w-5" strokeWidth={1.25} />}
          />

          {/* Pattern C - Playful Clay */}
          <PreviewCard
            to="/love-preview/playful"
            title="Playful Clay"
            subtitle="Pattern C"
            concept="ぽってり粘土の、明るくポップなお遊び"
            accentFont="lp-fredoka"
            accentLabel="playful!"
            style={{
              background: '#FFFFFF',
              borderRadius: 28,
              boxShadow:
                '0 6px 0 #E8445F, 0 14px 28px rgba(255, 107, 138, 0.2)',
              color: '#2D2A32',
              border: '3px solid #FFD166',
            }}
            paletteChips={['#FF6B8A', '#FFD166', '#06D6A0', '#A5D8FF']}
            icon={<Wand2 className="h-5 w-5" strokeWidth={2} />}
          />
        </section>

        <section className="mt-12 text-center">
          <p
            className="lp-sans-jp text-xs leading-relaxed sm:text-sm"
            style={{ color: '#8A7C95' }}
          >
            ※ デザイン採用決定後、本番 LOVE track に反映します。
            <br />
            このページはモックデータのみで動作する、独立したプレビューです。
          </p>
        </section>
      </main>
    </div>
  )
}

interface PreviewCardProps {
  to: string
  title: string
  subtitle: string
  concept: string
  accentFont: string
  accentLabel: string
  style: React.CSSProperties
  paletteChips: string[]
  icon: React.ReactNode
}

function PreviewCard({
  to,
  title,
  subtitle,
  concept,
  accentFont,
  accentLabel,
  style,
  paletteChips,
  icon,
}: PreviewCardProps) {
  return (
    <Link
      to={to}
      className="lp-hover-lift group relative flex flex-col gap-4 p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
      style={style}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="lp-sans-jp text-xs tracking-widest opacity-70">
            {subtitle}
          </p>
          <h2
            className="lp-serif-jp mt-1 text-2xl font-bold leading-tight sm:text-[1.65rem]"
            style={{ letterSpacing: '0.01em' }}
          >
            {title}
          </h2>
        </div>
        <span className="opacity-60">{icon}</span>
      </div>

      <p className="lp-zen text-sm leading-relaxed opacity-85">{concept}</p>

      <div className="flex gap-2">
        {paletteChips.map(c => (
          <span
            key={c}
            className="h-6 w-6 rounded-full"
            style={{ background: c, border: '1px solid rgba(0,0,0,0.08)' }}
          />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className={`${accentFont} text-xl opacity-80`}>
          {accentLabel}
        </span>
        <span className="lp-sans-jp inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase">
          このパターンを見る
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
