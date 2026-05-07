import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { ScoreBand } from '@/lib/questions'
import { MetalButton } from '@/components/ui/liquid-glass-button'

interface Props { score: number; band: ScoreBand; firstName: string }

export default function Results({ score, band, firstName }: Props) {
  const navigate = useNavigate()
  const [displayScore, setDisplayScore] = useState(0)
  const [dialPct, setDialPct] = useState(0)

  useEffect(() => {
    let frame = 0
    const total = 50
    const timer = setInterval(() => {
      frame++
      const n = Math.round((frame / total) * score)
      setDisplayScore(n)
      setDialPct(Math.round((n / 50) * 100))
      if (frame >= total) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [score])

  const bandBadge: Record<string, string> = {
    critical: 'bg-white/5 text-white/50 border-white/10',
    developing: 'bg-white/5 text-white/50 border-white/10',
    growing: 'bg-white/5 text-white/50 border-white/10',
    thriving: 'bg-white text-black border-white/20',
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
      <span className={cn('inline-block px-4 py-1.5 rounded-full text-sm font-semibold border mb-6', bandBadge[band.key])}>
        {band.label}
      </span>

      {/* Dial */}
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40 rounded-full flex items-center justify-center"
          style={{ background: `conic-gradient(#ffffff ${dialPct}%, rgba(255,255,255,0.05) 0)`, transition: 'background 0.05s linear' }}>
          <div className="absolute inset-3 bg-black rounded-full flex flex-col items-center justify-center">
            <span className="font-display font-extrabold text-white text-3xl leading-none">{displayScore}</span>
            <span className="text-white/30 text-xs mt-1">out of 50</span>
          </div>
        </div>
      </div>

      <h2 className="font-display font-bold text-white text-xl md:text-2xl mb-3">
        {firstName ? `${firstName}, here's your Online Visibility Diagnosis` : 'Your Online Visibility Diagnosis'}
      </h2>
      <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto mb-5">{band.diagnosis}</p>

      <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4 mb-6 max-w-lg mx-auto text-left">
        <p className="text-white/50 text-sm leading-relaxed">{band.bridge}</p>
      </div>

      <MetalButton onClick={() => navigate('/#contact')} className="mb-8">
        {band.cta}
      </MetalButton>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
        {band.testimonials.map((t, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/8 rounded-xl p-4 text-left">
            <div className="text-white/40 text-sm mb-2">★★★★★</div>
            <p className="text-white/40 text-xs leading-relaxed mb-3">"{t.q}"</p>
            <p className="text-white text-xs font-semibold">{t.n}</p>
            <p className="text-white/25 text-xs">{t.r}</p>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/')} className="mt-8 text-white/20 hover:text-white/50 text-xs transition-colors">
        ← Back to APUS Media
      </button>
    </motion.div>
  )
}
