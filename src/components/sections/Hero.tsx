import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { ArrowRight } from 'lucide-react'
import AnomalousMatterHero from '@/components/ui/anomalous-matter-hero'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#06001a]">
      {/* Three.js sphere — centered */}
      <AnomalousMatterHero />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-pattern" />

      {/* Central scrim keeps text readable; outer edge is transparent so the scene shows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_45%,rgba(6,0,26,0.68)_0%,rgba(6,0,26,0.25)_60%,transparent_100%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 md:pt-28 md:pb-20 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5 text-xs text-white/70 mb-8 md:mb-10 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse flex-shrink-0" />
          Web Design · Branding · Growth
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-extrabold text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-6 md:mb-7"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.6)' }}
        >
          Creating Digital
          <br />
          <span className="text-white/80">Masterpieces</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/65 text-base md:text-xl max-w-lg mx-auto mb-10 md:mb-12 leading-relaxed px-2"
          style={{ textShadow: '0 1px 20px rgba(0,0,0,0.8)' }}
        >
          We bridge the gap between visibility and profitability — helping brands convert influence into real, measurable business growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <LiquidButton size="lg" onClick={() => navigate('/assessment')}>
            Take the Free Assessment
          </LiquidButton>

          <button
            onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-white/60 hover:text-white active:text-white text-sm font-medium transition-colors py-2"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}
          >
            See Our Work <ArrowRight size={14} />
          </button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-12 md:mt-16 text-white/35 text-xs"
        >
          {['120+ Brands Served', '★★★★★ Rated', '5+ Years', '100% Satisfaction'].map(item => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
