import { motion } from 'framer-motion'
import { PhoneCall, FileText, Clock, Shield, Zap } from 'lucide-react'

const trust = [
  { icon: Clock,  label: 'Response within 24 hours' },
  { icon: Shield, label: 'No upfront payment required' },
  { icon: Zap,    label: '100% satisfaction guaranteed' },
]

function scrollToContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-neutral-900 dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-white/25 text-xs font-semibold uppercase tracking-widest">Work With Us</span>
          <h2 className="font-display font-bold text-white text-3xl md:text-5xl mt-3 leading-tight">
            Ready to Build Something
            <br className="hidden sm:block" /> That Sells?
          </h2>
          <p className="text-white/40 text-base md:text-lg mt-4 max-w-md mx-auto leading-relaxed">
            Every great brand started with one conversation. Let's start yours.
          </p>
        </motion.div>

        {/* Two CTA cards */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          {/* Card 1 — Book a Call (lime accent) */}
          <div className="group relative bg-[#C2FF00] rounded-2xl p-8 md:p-10 flex flex-col overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            onClick={scrollToContact}
          >
            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-black/8 pointer-events-none" />

            <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center mb-6 flex-shrink-0">
              <PhoneCall size={22} className="text-black" />
            </div>

            <h3 className="font-display font-bold text-black text-2xl mb-3">Book a Discovery Call</h3>
            <p className="text-black/60 text-sm leading-relaxed mb-8 flex-1">
              15 minutes. No pressure. We'll learn about your business and tell you exactly what you need — for free.
            </p>

            <button
              onClick={scrollToContact}
              className="self-start flex items-center gap-2 bg-black text-[#C2FF00] font-bold text-sm px-6 py-3 rounded-full hover:bg-neutral-900 transition-colors"
            >
              Book a Call <span aria-hidden>→</span>
            </button>
          </div>

          {/* Card 2 — Ask for a Quote */}
          <div
            className="group relative bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-8 md:p-10 flex flex-col overflow-hidden cursor-pointer hover:bg-white/8 transition-all duration-300"
            onClick={scrollToContact}
          >
            {/* Decorative circle */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

            <div className="w-12 h-12 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mb-6 flex-shrink-0">
              <FileText size={22} className="text-white/70" />
            </div>

            <h3 className="font-display font-bold text-white text-2xl mb-3">Ask for a Quote</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1">
              Tell us what you need and we'll send a fully tailored proposal with scope, timeline, and pricing within 24 hours.
            </p>

            <button
              onClick={scrollToContact}
              className="self-start flex items-center gap-2 border border-white/20 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-white/10 hover:border-white/40 transition-all"
            >
              Request a Quote <span aria-hidden>→</span>
            </button>
          </div>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/35 text-xs">
              <Icon size={13} className="text-[#C2FF00]/60 flex-shrink-0" />
              {label}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
