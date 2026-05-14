import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import GradientButton from '@/components/ui/button-1'

const trustItems = ['10+ Brands Served', '★★★★★ Rated', '4 Years Experience', '100% Satisfaction']

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* Background photo — man is right-side, city left; anchor to right */}
      <img
        src="/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-[78%_25%] md:object-right"
      />

      {/* Left-to-right gradient so text stays readable */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_25%,rgba(0,0,0,0.70)_50%,rgba(0,0,0,0.25)_70%,transparent_90%)]" />

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Content — left-aligned */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center min-h-screen pt-20 pb-12">
        <div className="max-w-[520px] md:max-w-[580px]">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-7 md:mb-9"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse flex-shrink-0" />
            <span className="text-xs text-white/65 font-medium tracking-wide">
              Web Design · Branding · Growth
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="font-display font-extrabold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight mb-6"
          >
            Stop Getting
            <br />
            Outmarketed.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="text-white/60 text-base md:text-lg leading-relaxed mb-10 md:mb-12"
          >
            We help businesses dominate online with conversion-driven branding,
            high-impact websites, and growth strategies that generate real sales.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="flex flex-wrap items-center gap-4 mb-12 md:mb-16"
          >
            <GradientButton width="auto" height="52px" onClick={() => navigate('/assessment')}>
              Take the Free Assessment
            </GradientButton>
            <button
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-white/65 hover:text-white active:text-white text-sm font-medium transition-colors py-2 min-h-[48px]"
            >
              See Our Work <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Trust strip — items separated by | */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-white/40 text-xs"
          >
            {trustItems.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 && <span className="text-white/20 select-none">|</span>}
                {item}
              </span>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
