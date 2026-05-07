import { motion } from 'framer-motion'
import { Target, TrendingUp, Users } from 'lucide-react'

const pillars = [
  { icon: Target, label: 'Visibility First' },
  { icon: TrendingUp, label: 'Measurable Growth' },
  { icon: Users, label: 'Real Partnership' },
]

export default function Mission() {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-white/25 text-xs font-semibold uppercase tracking-widest">Our Mission</span>
            <div className="mt-4 pl-5 border-l border-white/20">
              <h2 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight">
                "We exist to bridge the gap between{' '}
                <span className="text-white/40">visibility</span> and profitability."
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            <p className="text-white/40 text-lg leading-relaxed">
              Most businesses are invisible online — not because they aren't good enough, but because they haven't been shown how to communicate their value clearly and consistently.
            </p>
            <p className="text-white/40 text-lg leading-relaxed">
              We're not just a design or marketing agency. We're your growth partner — building the systems, brand, and strategy that turn your online presence into a predictable revenue engine.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {pillars.map(pillar => (
                <div key={pillar.label} className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-full px-4 py-2 text-sm text-white/50">
                  <pillar.icon size={13} className="text-white/40" />
                  {pillar.label}
                </div>
              ))}
            </div>
            <div className="bg-white/[0.03] border border-white/6 rounded-2xl p-6">
              <p className="text-white/50 text-sm leading-relaxed italic">
                "We specialize in website design for e-commerce businesses — building stores engineered to convert visitors into paying customers."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
