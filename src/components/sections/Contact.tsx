import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2, X, Loader2 } from 'lucide-react'
import type { SelectedPlan } from '@/pages/Home'
import { supabase } from '@/lib/supabase'

const services = ['Branding', 'Website Design', 'Running Ads', 'Automation', 'Business Consulting', 'Social Media Management', 'Full Package']

const inputClass = [
  'w-full rounded-xl px-4 py-3 text-sm transition-all outline-none',
  'bg-[#1e1e1e] border border-white/10 text-white',
  'placeholder:text-white/30',
  'focus:border-white/35 focus:bg-[#161616]',
].join(' ')

interface Props {
  selectedPlan?: SelectedPlan | null
  onClearPlan?: () => void
}

export default function Contact({ selectedPlan, onClearPlan }: Props) {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // When a plan is selected from pricing, auto-select "Full Package" service
  useEffect(() => {
    if (selectedPlan) {
      setForm(prev => ({ ...prev, service: selectedPlan.name === 'Premium' ? 'Full Package' : '' }))
    }
  }, [selectedPlan])

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
      selected_plan: selectedPlan?.name ?? null,
      selected_plan_price: selectedPlan?.price ?? null,
    })
    setLoading(false)
    if (dbError) {
      setError('Something went wrong. Please try again or email us directly.')
      return
    }
    setSent(true)
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#2C2C2C]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-white/25 text-xs font-semibold uppercase tracking-widest">Get In Touch</span>
            <h2 className="font-display font-bold text-white text-3xl md:text-5xl mt-3 leading-tight">
              Let's Talk Your
              <br />
              Next Project
            </h2>
            <p className="text-white/35 text-lg mt-5 leading-relaxed max-w-md">
              Ready to stop being invisible online? Tell us where you are and where you want to go.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: Mail, label: 'hello@apusmedia.com' },
                { icon: Phone, label: '+234 800 000 0000' },
                { icon: MapPin, label: 'Lagos, Nigeria' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 text-white/40 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                    <item.icon size={13} className="text-white/40" />
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white/[0.03] border border-white/12 rounded-2xl p-7"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <CheckCircle2 size={40} className="text-white/60 mb-4" strokeWidth={1.5} />
                <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                <p className="text-white/40 text-sm">We'll be in touch within 24 hours.</p>
                {selectedPlan && (
                  <p className="text-white/25 text-xs mt-2">
                    Package enquiry: <span className="text-white/50">{selectedPlan.name} — {selectedPlan.price}</span>
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Heading */}
                <div className="mb-5">
                  <p className="font-display font-bold text-white text-lg">Fill This Form Below</p>
                  <p className="text-white/30 text-xs mt-1">We'll respond within 24 hours.</p>
                </div>

                {/* Pre-selected plan badge */}
                {selectedPlan && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between gap-3 bg-white/8 border border-white/15 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="text-white/40 text-xs mb-0.5">Selected package</p>
                      <p className="text-white font-semibold text-sm">
                        {selectedPlan.name} <span className="text-white/50 font-normal">— {selectedPlan.price}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClearPlan}
                      className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
                      aria-label="Clear selected plan"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                )}

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Chinedu Okeke"
                      value={form.name}
                      onChange={set('name')}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set('email')}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-medium text-white/40 mb-1.5">What's the type of your company?</label>
                  <input
                    type="text"
                    placeholder="e.g. Fashion brand"
                    value={form.company}
                    onChange={set('company')}
                    className={inputClass}
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-xs font-medium text-white/40 mb-1.5">What you need from us?</label>
                  <select
                    value={form.service}
                    onChange={set('service')}
                    className={[inputClass, 'cursor-pointer'].join(' ')}
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" disabled>Select service…</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-white/40 mb-1.5">More About This Project</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project, goals, and timeline…"
                    value={form.message}
                    onChange={set('message')}
                    className={[inputClass, 'resize-none'].join(' ')}
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-white text-black font-bold text-sm tracking-wide hover:bg-white/90 active:scale-[0.98] transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? <><Loader2 size={14} className="animate-spin" /> Sending…</>
                    : <><Send size={14} strokeWidth={2.5} />{selectedPlan ? `Enquire About ${selectedPlan.name} Package` : 'Send Message'}</>
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
