import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'Zorkle Shop',
    tags: ['E-commerce', 'Shopify'],
    image: '/portfolio/zorkle.jpg',
    href: 'https://www.zorkleshop.com/',
  },
  {
    title: 'Bandyfit',
    tags: ['E-commerce', 'Branding'],
    image: '/portfolio/bandyfit.jpg',
    href: 'https://bandyfit.com.ng/',
  },
  {
    title: 'Dawn — Shopify Theme',
    tags: ['Web Design', 'Shopify'],
    image: '/portfolio/dawn.jpg',
    href: 'https://themes.shopify.com/themes/dawn/presets/dawn',
  },
  {
    title: 'Impulse — Shopify Theme',
    tags: ['Web Design', 'Shopify'],
    image: '/portfolio/impulse.jpg',
    href: 'https://themes.shopify.com/themes/impulse/presets/impulse',
  },
  {
    title: 'Yanka',
    tags: ['E-commerce', 'Web Design'],
    image: '/portfolio/yanka.jpg',
    href: 'https://yanka-demos.myshopify.com/',
  },
  {
    title: 'Prestige — Shopify Theme',
    tags: ['Branding', 'Shopify'],
    image: '/portfolio/prestige.jpg',
    href: 'https://themes.shopify.com/themes/prestige/presets/prestige',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-3"
        >
          <div>
            <span className="text-white/25 text-xs font-semibold uppercase tracking-widest">Portfolio</span>
            <h2 className="font-display font-bold text-white text-3xl md:text-5xl mt-3">Our Projects</h2>
          </div>
          <p className="text-white/30 text-sm max-w-xs">See some of the work we've done for our clients.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-xl bg-white/5 aspect-[4/3] cursor-pointer block"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                loading="lazy"
              />

              {/* Always-visible bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Info — always visible */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm leading-snug">{project.title}</h3>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className="bg-white/15 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={12} className="text-black" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button className="text-white/20 hover:text-white/50 active:text-white/50 text-xs transition-colors border border-white/8 hover:border-white/15 px-5 py-2.5 rounded-full min-h-[40px]">
            View all projects →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
