import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const services = ['Branding', 'Website Design', 'Running Ads', 'Automation', 'Business Consulting', 'Social Media Management', 'Full Package']

const inputClass = [
  'w-full rounded-xl px-4 py-3 text-sm transition-all outline-none',
  'bg-white border border-neutral-200 text-neutral-900',
  'dark:bg-[#1e1e1e] dark:border-white/10 dark:text-white',
  'placeholder:text-neutral-400 dark:placeholder:text-white/30',
  'focus:border-neutral-400 focus:bg-neutral-50 dark:focus:border-white/35 dark:focus:bg-[#161616]',
].join(' ')

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      service: form.service,
      message: form.message.trim(),
    })
    setLoading(false)
    if (dbError) {
      setError('Something went wrong. Please try again or email us directly.')
      return
    }
    setSent(true)
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-white dark:bg-[#2C2C2C]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-neutral-400 dark:text-white/25 text-xs font-semibold uppercase tracking-widest">Get In Touch</span>
            <h2 className="font-display font-bold text-neutral-900 dark:text-white text-3xl md:text-5xl mt-3 leading-tight">
              Let's Talk Your
              <br />
              Next Project
            </h2>
            <p className="text-neutral-500 dark:text-white/35 text-lg mt-5 leading-relaxed max-w-md">
              Ready to stop being invisible online? Tell us where you are and where you want to go.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: Mail,    label: 'apluxmediaofficial@gmail.com' },
                { icon: Phone,   label: '+2348135557817' },
                { icon: MapPin,  label: 'Lagos, Nigeria' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 text-neutral-500 dark:text-white/40 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-200 dark:bg-white/5 dark:border-white/8 flex items-center justify-center flex-shrink-0">
                    <item.icon size={13} className="text-neutral-400 dark:text-white/40" />
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-neutral-50 border border-neutral-200 dark:bg-white/[0.03] dark:border-white/12 rounded-2xl p-7"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <CheckCircle2 size={40} className="text-[#C2FF00] mb-4" strokeWidth={1.5} />
                <h3 className="font-display font-bold text-neutral-900 dark:text-white text-xl mb-2">Message Sent!</h3>
                <p className="text-neutral-500 dark:text-white/40 text-sm">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-5">
                  <p className="font-display font-bold text-neutral-900 dark:text-white text-lg">Fill This Form Below</p>
                  <p className="text-neutral-400 dark:text-white/30 text-xs mt-1">We'll respond within 24 hours.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 dark:text-white/40 mb-1.5">Your Name</label>
                    <input type="text" required placeholder="Chinedu Okeke" value={form.name} onChange={set('name')} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 dark:text-white/40 mb-1.5">Email</label>
                    <input type="email" required placeholder="you@example.com" value={form.email} onChange={set('email')} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-white/40 mb-1.5">Type of Business</label>
                  <input type="text" placeholder="e.g. Fashion brand" value={form.company} onChange={set('company')} className={inputClass} />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-white/40 mb-1.5">What do you need from us?</label>
                  <select value={form.service} onChange={set('service')} className={[inputClass, 'cursor-pointer'].join(' ')}>
                    <option value="" disabled>Select service…</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-white/40 mb-1.5">Tell Us About Your Project</label>
                  <textarea rows={4} placeholder="Goals, timeline, budget…" value={form.message} onChange={set('message')} className={[inputClass, 'resize-none'].join(' ')} />
                </div>

                {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black font-bold text-sm tracking-wide hover:bg-neutral-700 dark:hover:bg-white/90 active:scale-[0.98] transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? <><Loader2 size={14} className="animate-spin" /> Sending…</>
                    : <><Send size={14} strokeWidth={2.5} /> Send Message</>
                  }
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
