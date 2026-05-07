import { motion } from 'framer-motion'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const faqs = [
  { q: 'What is the deadline for a typical project?', a: 'Most websites are delivered in 2–4 weeks. Larger e-commerce builds or full-package projects typically take 4–8 weeks. We\'ll give you a clear timeline before we start.' },
  { q: 'Do you offer ongoing support after launch?', a: 'Yes. All packages include post-launch support (30–90 days depending on your plan). We also offer ongoing monthly retainers for brands that want a long-term growth partner.' },
  { q: 'What if I only need design on development, not both?', a: 'No problem. We can handle design-only or development-only projects. Just tell us what you need during the discovery call and we\'ll tailor the scope accordingly.' },
  { q: 'Do you work with only big brands?', a: 'Not at all. We work with businesses at all stages — from brand new startups to established companies. What matters is your commitment to growth, not your current size.' },
  { q: 'What platforms do you build on?', a: 'We specialize in Shopify, WordPress, and Framer — choosing the best platform based on your business needs, not what\'s easiest for us.' },
  { q: 'How does payment work?', a: 'We work on a 50/50 structure — 50% to begin, 50% on completion. This keeps the project moving and protects both sides.' },
  { q: 'Can you manage our social media and run ads too?', a: 'Yes. Our Growth and Premium packages include ad management (Meta/Google) and social media management. We handle everything from strategy to execution.' },
  { q: 'I\'m not sure which package is right for me?', a: 'Take our free 3-minute Online Visibility Assessment — it gives you a personalised diagnosis and recommendation based on where your business actually is right now.' },
]

export default function FAQ() {
  return (
    <section className="py-20 md:py-28 bg-black">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-white/25 text-xs font-semibold uppercase tracking-widest">FAQ</span>
          <h2 className="font-display font-bold text-white text-3xl md:text-5xl mt-3">FAQs</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
