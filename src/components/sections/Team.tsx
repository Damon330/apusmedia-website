import { motion } from 'framer-motion'
import { Linkedin, Twitter } from 'lucide-react'

const team = [
  {
    name: 'Adeusi Adedayo',
    role: 'Growth, Brand & Ads Specialist',
    image: '/team/adedayo.jpg',
  },
  {
    name: 'Adeusi Adedamola',
    role: 'Head of Operations & Business Strategist',
    image: '/team/adedamola.jpg',
  },
  {
    name: 'Oluyemi Henry',
    role: 'Finance, Marketer & Strategist',
    image: '/team/henry.jpg',
  },
]

export default function Team() {
  return (
    <section className="py-20 md:py-28 bg-[#2C2C2C]">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-white/25 text-xs font-semibold uppercase tracking-widest">The Team</span>
          <h2 className="font-display font-bold text-white text-3xl md:text-5xl mt-3">Meet Our Team</h2>
          <p className="text-white/30 text-base md:text-lg mt-3 max-w-lg mx-auto">
            Creatives and strategists obsessed with making your brand impossible to ignore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group text-center"
            >
              {/* Photo */}
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 bg-white/5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle dark overlay at bottom for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Social icons on hover */}
                <div className="absolute inset-0 flex items-end justify-center pb-5 gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[Linkedin, Twitter].map((Icon, j) => (
                    <a
                      key={j}
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <Icon size={13} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Info */}
              <h3 className="font-display font-semibold text-white text-base leading-snug">{member.name}</h3>
              <p className="text-white/35 text-xs mt-1 leading-relaxed">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
