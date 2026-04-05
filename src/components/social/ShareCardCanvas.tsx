import { useRef, useEffect, useCallback } from 'react'
import type { CoreParams } from '@/types/diagnosis'

interface ShareCardCanvasProps {
  jobName: string
  tier: string
  matchScore: number
  animalName: string
  group: string
  coreParams: CoreParams
  displayName: string
  onGenerated?: (dataUrl: string) => void
}

const TIER_COLORS: Record<string, string> = {
  legend: '#facc15',
  expert: '#a78bfa',
  standard: '#60a5fa',
  basic: '#34d399',
}

const paramLabels: Record<keyof CoreParams, string> = {
  communication: 'COMM',
  specialist: 'SPEC',
  marketing: 'MKTG',
  ai: 'AI',
}

export function ShareCardCanvas({
  jobName, tier, matchScore, animalName, group,
  coreParams, displayName, onGenerated,
}: ShareCardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = 600
    const h = 340
    canvas.width = w
    canvas.height = h

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, w, h)
    bg.addColorStop(0, '#0f0e17')
    bg.addColorStop(1, '#1a1930')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)

    // Border
    ctx.strokeStyle = '#8b7355'
    ctx.lineWidth = 2
    ctx.strokeRect(8, 8, w - 16, h - 16)

    // Inner glow border
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.15)'
    ctx.lineWidth = 1
    ctx.strokeRect(12, 12, w - 24, h - 24)

    // Title area
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 28px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(jobName, w / 2, 60)

    // Tier badge
    const tierColor = TIER_COLORS[tier] || TIER_COLORS.basic
    ctx.fillStyle = tierColor
    ctx.font = 'bold 14px sans-serif'
    const tierLabel = tier === 'legend' ? 'Tier S' : tier === 'expert' ? 'Tier A' : tier === 'standard' ? 'Tier B' : 'Tier C'
    ctx.fillText(tierLabel, w / 2, 85)

    // Match score
    ctx.fillStyle = '#e8e0d0'
    ctx.font = '16px sans-serif'
    ctx.fillText(`Match: ${matchScore}%`, w / 2, 110)

    // Match score bar
    const barY = 120
    const barW = 200
    const barH = 8
    const barX = (w - barW) / 2
    ctx.fillStyle = '#1a1930'
    ctx.beginPath()
    ctx.roundRect(barX, barY, barW, barH, 4)
    ctx.fill()
    ctx.fillStyle = '#ffd700'
    ctx.beginPath()
    ctx.roundRect(barX, barY, barW * matchScore / 100, barH, 4)
    ctx.fill()

    // Animal + Group
    ctx.fillStyle = '#9a94a8'
    ctx.font = '14px sans-serif'
    ctx.fillText(`${animalName} / ${group}`, w / 2, 155)

    // Core params bars
    const keys: (keyof CoreParams)[] = ['communication', 'specialist', 'marketing', 'ai']
    const paramBarW = 120
    const paramBarH = 12
    const startY = 180
    const leftX = 140
    const rightX = leftX + paramBarW + 10

    keys.forEach((key, i) => {
      const y = startY + i * 28
      const x = i < 2 ? leftX : rightX
      const row = i < 2 ? i : i - 2
      const finalY = startY + row * 28

      // Label
      ctx.fillStyle = '#9a94a8'
      ctx.font = '11px sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(paramLabels[key], x - 8, finalY + 10)

      // Bar bg
      ctx.fillStyle = '#1a1930'
      ctx.beginPath()
      ctx.roundRect(x, finalY, paramBarW, paramBarH, 3)
      ctx.fill()

      // Bar value
      ctx.fillStyle = '#ffd700'
      ctx.beginPath()
      ctx.roundRect(x, finalY, paramBarW * coreParams[key] / 100, paramBarH, 3)
      ctx.fill()

      // Value text
      ctx.fillStyle = '#e8e0d0'
      ctx.font = '10px sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText(`${coreParams[key]}`, x + paramBarW + 6, finalY + 10)
    })

    // Display name
    ctx.fillStyle = '#e8e0d0'
    ctx.font = 'bold 14px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(displayName, w / 2, 280)

    // Footer
    ctx.fillStyle = '#8b7355'
    ctx.font = '11px sans-serif'
    ctx.fillText('ABILITY JOB DIAGNOSIS', w / 2, 320)

    // Notify parent
    if (onGenerated) {
      onGenerated(canvas.toDataURL('image/png'))
    }
  }, [jobName, tier, matchScore, animalName, group, coreParams, displayName, onGenerated])

  useEffect(() => {
    draw()
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[600px] mx-auto rounded-lg"
      style={{ imageRendering: 'auto' }}
    />
  )
}
