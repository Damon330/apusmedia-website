import { motion } from 'framer-motion'
import { ShoppingBag, Globe, Zap } from 'lucide-react'

const platforms = [
  {
    icon: ShoppingBag,
    name: 'Shopify',
    description: 'E-commerce storefronts that convert. High-performance Shopify stores optimised for sales, mobile, and speed.',
    samples: [
      { image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80', label: 'Fashion Store' },
      { image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80', label: 'Beauty & Skincare' },
    ],
  },
  {
    icon: Globe,
    name: 'WordPress',
    description: 'Scalable websites built for growth. From corporate sites to content-heavy blogs that rank and convert.',
    samples: [
      { image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80', label: 'Business Site' },
      { image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80', label: 'Blog & Magazine' },
    ],
  },
  {
    icon: Zap,
    name: 'Framer',
    description: 'Design-led sites with fluid motion. For brands that need to stand out — interactive, animated, unforgettable.',
    samples: [
      { image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&q=80', label: 'Agency Portfolio' },
      { image: 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=400&q=80', label: 'Product Launch' },
    ],
  },
]

export default function Platforms() {
  return (
    <section className="py-20 md:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-white/25 text-xs font-semibold uppercase tracking-widest">Tech Stack</span>
          <h2 className="font-display font-bold text-white text-3xl md:text-5xl mt-3">
            We Build With the Best
          </h2>
          <p className="text-white/30 text-lg mt-3 max-w-xl mx-auto">
            We pick the right platform for your business — not the easiest one for us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group bg-white/[0.03] border border-white/6 rounded-2xl p-5 md:p-6 hover:border-white/12 hover:bg-white/[0.05] active:border-white/12 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center">
                  <platform.icon size={16} className="text-white/60" />
                </div>
                <h3 className="font-display font-bold text-white text-lg">{platform.name}</h3>
              </div>
              <p className="text-white/35 text-sm leading-relaxed mb-5">{platform.description}</p>
              <div className="grid grid-cols-2 gap-2">
                {platform.samples.map(sample => (
                  <div key={sample.label} className="relative overflow-hidden rounded-xl aspect-video bg-white/5">
                    <img src={sample.image} alt={sample.label} className="w-full h-full object-cover opacity-50 grayscale group-hover:opacity-70 transition-opacity" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                      <span className="text-white/60 text-xs">{sample.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
