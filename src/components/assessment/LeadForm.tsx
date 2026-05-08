import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Send } from 'lucide-react'

interface Props { onSubmit: (name: string, email: string) => void }

function validateEmail(email: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) }

const inputClass = [
  'w-full rounded-xl px-4 py-3 text-sm transition-all outline-none',
  'bg-[#1e1e1e] border border-white/10 text-white',
  'placeholder:text-white/30',
  'focus:border-white/35 focus:bg-[#161616]',
].join(' ')

export default function LeadForm({ onSubmit }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = { name: '', email: '' }
    if (name.trim().length < 2) newErrors.name = 'Please enter your name.'
    if (!validateEmail(email)) newErrors.email = 'Please enter a valid email.'
    setErrors(newErrors)
    if (!newErrors.name && !newErrors.email) onSubmit(name.trim(), email.trim())
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h2 className="font-display font-bold text-white text-xl md:text-2xl mb-1.5">
        Where should we send your personalised results?
      </h2>
      <p className="text-white/30 text-sm mb-6">Phase 5 · We'll email your full diagnosis + 90-day roadmap instantly.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-white/40 mb-1.5">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Chinedu Okeke"
            className={inputClass}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-white/40 mb-1.5">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-white text-black font-bold text-sm tracking-wide hover:bg-white/90 active:scale-[0.98] transition-all duration-200 mt-2"
        >
          <Send size={14} strokeWidth={2.5} />
          Show My Results →
        </button>

        <p className="flex items-center justify-center gap-1.5 text-white/20 text-xs pt-1">
          <Lock size={10} /> We respect your privacy. No spam — ever.
        </p>
      </form>
    </motion.div>
  )
}
