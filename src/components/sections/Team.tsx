import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TeamMember {
  id: string
  name: string
  role: string
  image: string
}

const team: TeamMember[] = [
  { id: '1', name: 'Adeusi Adedayo', role: 'Growth, Brand & Ads Specialist', image: '/team/adedayo.jpg' },
  { id: '2', name: 'Adeusi Adedamola', role: 'Head of Operations & Business Strategist', image: '/team/adedamola.jpg' },
  { id: '3', name: 'Oluyemi Henry', role: 'Finance, Marketer & Strategist', image: '/team/henry.jpg' },
]

function PhotoCard({
  member, className, hoveredId, onHover,
}: {
  member: TeamMember
  className: string
  hoveredId: string | null
  onHover: (id: string | null) => void
}) {
  const isActive = hoveredId === member.id
  const isDimmed = hoveredId !== null && !isActive

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl cursor-pointer flex-shrink-0 transition-opacity duration-300',
        className,
        isDimmed ? 'opacity-40' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover object-top transition-[filter] duration-500"
        style={{
          filter: isActive
            ? 'grayscale(0) brightness(1)'
            : 'grayscale(1) brightness(0.72)',
        }}
        loading="lazy"
      />
    </div>
  )
}

function MemberRow({
  member, hoveredId, onHover,
}: {
  member: TeamMember
  hoveredId: string | null
  onHover: (id: string | null) => void
}) {
  const isActive = hoveredId === member.id
  const isDimmed = hoveredId !== null && !isActive

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300',
        isDimmed ? 'opacity-35' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2.5">
        {/* Animated indicator pill */}
        <span
          className={cn(
            'h-2.5 rounded-full flex-shrink-0 transition-all duration-300',
            isActive
              ? 'w-5 bg-neutral-900 dark:bg-white'
              : 'w-2.5 bg-neutral-900/20 dark:bg-white/20',
          )}
        />
        <span
          className={cn(
            'font-display font-bold text-lg md:text-xl leading-none tracking-tight transition-colors duration-300',
            isActive
              ? 'text-neutral-900 dark:text-white'
              : 'text-neutral-600 dark:text-white/60',
          )}
        >
          {member.name}
        </span>

        {/* Social icons — slide in on hover */}
        <div
          className={cn(
            'flex items-center gap-1 ml-0.5 transition-all duration-200',
            isActive
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-3 pointer-events-none',
          )}
        >
          <a
            href="#"
            onClick={e => e.stopPropagation()}
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 dark:text-white/35 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={11} />
          </a>
          <a
            href="#"
            onClick={e => e.stopPropagation()}
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 dark:text-white/35 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
            title="Twitter"
          >
            <Twitter size={11} />
          </a>
        </div>
      </div>

      {/* Role */}
      <p className="mt-1.5 pl-[30px] text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400 dark:text-white/30">
        {member.role}
      </p>
    </div>
  )
}

export default function Team() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // One member per column → staggered heights give the masonry feel
  const col1 = team.filter((_, i) => i % 3 === 0)
  const col2 = team.filter((_, i) => i % 3 === 1)
  const col3 = team.filter((_, i) => i % 3 === 2)

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#2C2C2C]">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-neutral-400 dark:text-white/25 text-xs font-semibold uppercase tracking-widest">The Team</span>
          <h2 className="font-display font-bold text-neutral-900 dark:text-white text-3xl md:text-5xl mt-3">Meet Our Team</h2>
          <p className="text-neutral-500 dark:text-white/30 text-base md:text-lg mt-3 max-w-lg mx-auto">
            Creatives and strategists obsessed with making your brand impossible to ignore.
          </p>
        </motion.div>

        {/* Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row items-start gap-10 md:gap-16 select-none"
        >
          {/* ── Staggered photo grid ── */}
          <div className="flex gap-3 flex-shrink-0">
            {/* Column 1 — top-aligned */}
            <div className="flex flex-col gap-3">
              {col1.map(m => (
                <PhotoCard
                  key={m.id}
                  member={m}
                  className="w-[88px] h-[108px] sm:w-[105px] sm:h-[128px] md:w-[118px] md:h-[144px]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>

            {/* Column 2 — pushed down */}
            <div className="flex flex-col gap-3 mt-10 sm:mt-12 md:mt-14">
              {col2.map(m => (
                <PhotoCard
                  key={m.id}
                  member={m}
                  className="w-[98px] h-[120px] sm:w-[118px] sm:h-[144px] md:w-[132px] md:h-[162px]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>

            {/* Column 3 — mid offset */}
            <div className="flex flex-col gap-3 mt-5 sm:mt-6 md:mt-7">
              {col3.map(m => (
                <PhotoCard
                  key={m.id}
                  member={m}
                  className="w-[92px] h-[113px] sm:w-[110px] sm:h-[135px] md:w-[124px] md:h-[152px]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>
          </div>

          {/* ── Name + role list ── */}
          <div className="flex flex-col gap-6 pt-1 flex-1">
            {team.map(m => (
              <MemberRow
                key={m.id}
                member={m}
                hoveredId={hoveredId}
                onHover={setHoveredId}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
