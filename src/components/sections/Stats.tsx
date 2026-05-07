import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 98, suffix: '+', label: 'Projects Launched' },
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 9, suffix: '+', label: 'Satisfied Customers' },
]

function CountUp({ to, prefix = '', suffix = '', start }: { to: number; prefix?: string; suffix?: string; start: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let frame = 0
    const total = 60
    const timer = setInterval(() => {
      frame++
      setCount(Math.round((frame / total) * to))
      if (frame >= total) clearInterval(timer)
    }, 20)
    return () => clearInterval(timer)
  }, [start, to])
  return <span className="font-display font-extrabold text-5xl md:text-7xl text-white">{prefix}{count}{suffix}</span>
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-black border-y border-white/5">
      <div ref={ref} className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <CountUp to={stat.value} suffix={stat.suffix} start={inView} />
              <p className="text-white/30 text-sm mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
