import { motion } from 'framer-motion'
import { Palette, Megaphone, Bot, BriefcaseBusiness, BarChart2 } from 'lucide-react'

const services = [
  { icon: Palette, title: 'Branding', description: 'Logo, identity systems, and brand guidelines that make you instantly recognisable and trusted.' },
  { icon: Megaphone, title: 'Running Ads', description: 'Targeted paid campaigns on Meta, Google, and TikTok that bring qualified leads, not just clicks.' },
  { icon: Bot, title: 'Automation', description: 'CRM flows, email sequences, and chatbots that work while you sleep — turning leads into customers.' },
  { icon: BriefcaseBusiness, title: 'Business Consulting', description: 'Strategic clarity on positioning, pricing, and growth — so every move you make is the right one.' },
  { icon: BarChart2, title: 'Social Media Management', description: 'Consistent content and community management that keeps your brand top-of-mind and growing.' },
]

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }
const cardVariants = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-neutral-50 dark:bg-[#2C2C2C]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-neutral-400 dark:text-white/30 text-xs font-semibold uppercase tracking-widest">Our Services</span>
          <h2 className="font-display font-bold text-neutral-900 dark:text-white text-3xl md:text-5xl mt-3 max-w-xl leading-tight">
            Everything Your Business Needs to Win Online
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map(service => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group bg-black/[0.03] border border-black/8 dark:bg-white/[0.03] dark:border-white/6 rounded-2xl p-5 md:p-7 hover:border-black/15 hover:bg-black/[0.05] dark:hover:border-white/15 dark:hover:bg-white/[0.05] transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-black/6 border border-black/8 dark:bg-white/6 dark:border-white/8 flex items-center justify-center mb-5 group-hover:bg-[#C2FF00]/15 group-hover:border-[#C2FF00]/30 transition-colors">
                <service.icon size={18} className="text-neutral-500 dark:text-white/60 group-hover:text-[#C2FF00]" />
              </div>
              <h3 className="font-display font-semibold text-neutral-900 dark:text-white text-lg mb-2">{service.title}</h3>
              <p className="text-neutral-500 dark:text-white/35 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            variants={cardVariants}
            className="bg-neutral-900 dark:bg-white rounded-2xl p-5 md:p-7 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display font-bold text-white dark:text-black text-xl mb-2">Not sure where to start?</h3>
              <p className="text-white/60 dark:text-black/60 text-sm leading-relaxed">
                Take our 3-minute assessment and we'll tell you exactly what your business needs most.
              </p>
            </div>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-6 bg-white dark:bg-[#2C2C2C] text-neutral-900 dark:text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/90 dark:hover:bg-black/80 transition-colors self-start"
            >
              Get a Free Consult →
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
