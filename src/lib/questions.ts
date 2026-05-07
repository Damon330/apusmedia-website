export interface QuestionOption {
  label: string
  points: number
}

export interface Question {
  title: string
  sub: string
  options?: QuestionOption[]
  isLeadForm?: boolean
}

export const QUESTIONS: Question[] = [
  {
    title: 'Which best describes your business right now?',
    sub: 'Phase 1 · Let\'s understand where you\'re starting from.',
    options: [
      { label: 'Just starting — I have an idea or new venture', points: 1 },
      { label: 'Operating 1–2 years, still finding my footing', points: 2 },
      { label: 'Established 3–5 years, steady but want more growth', points: 4 },
      { label: '5+ years, profitable and ready to scale online', points: 5 },
    ],
  },
  {
    title: 'How do most of your customers currently find you?',
    sub: 'Be honest — this tells us a lot.',
    options: [
      { label: 'Word of mouth and referrals only', points: 1 },
      { label: 'Social media (Instagram, Facebook, WhatsApp)', points: 3 },
      { label: 'A mix of referrals, social, and walk-ins', points: 4 },
      { label: 'Google searches and my website bring most leads', points: 5 },
    ],
  },
  {
    title: 'Do you currently have a professional website?',
    sub: 'Phase 2 · Identifying the gaps.',
    options: [
      { label: 'No website at all', points: 1 },
      { label: 'Just a social media page or WhatsApp catalog', points: 2 },
      { label: 'A basic site I built myself or with a template', points: 3 },
      { label: 'Yes — professionally designed and up to date', points: 5 },
    ],
  },
  {
    title: 'When potential customers Google your type of business in your area, what shows up?',
    sub: '',
    options: [
      { label: 'I honestly have no idea', points: 1 },
      { label: 'Only my competitors', points: 2 },
      { label: 'My social pages, but not a website', points: 3 },
      { label: 'My business shows up clearly with website + reviews', points: 5 },
    ],
  },
  {
    title: 'How often do you lose a deal because a customer couldn\'t easily find info about you online?',
    sub: '',
    options: [
      { label: 'All the time — it\'s a real problem', points: 1 },
      { label: 'Often enough to worry me', points: 2 },
      { label: 'Occasionally', points: 3 },
      { label: 'Almost never', points: 5 },
    ],
  },
  {
    title: 'If your business doubled its inbound leads in the next 6 months, what would that mean for you?',
    sub: 'Phase 3 · Imagining what\'s possible.',
    options: [
      { label: 'It would change my life and my family\'s future', points: 5 },
      { label: 'It would let me hire and finally grow', points: 4 },
      { label: 'It would be nice but I\'m not sure I could handle it', points: 2 },
      { label: 'I\'m not really focused on growth right now', points: 1 },
    ],
  },
  {
    title: 'Where do you want your business to be 12 months from now?',
    sub: '',
    options: [
      { label: 'Still figuring it out', points: 1 },
      { label: 'More consistent — fewer dry months', points: 3 },
      { label: 'Recognised as a top option in my area or niche', points: 4 },
      { label: 'A category leader, attracting clients on autopilot', points: 5 },
    ],
  },
  {
    title: 'If we showed you a clear plan to fix your online visibility, how ready are you to act?',
    sub: 'Phase 4 · Readiness check.',
    options: [
      { label: 'Ready now — I just need the right partner', points: 5 },
      { label: 'Ready in the next 30–60 days', points: 4 },
      { label: 'Curious, but probably 3–6 months away', points: 2 },
      { label: 'Just exploring — no plans yet', points: 1 },
    ],
  },
  {
    title: 'What\'s your realistic budget to invest in getting your business online properly?',
    sub: 'We\'ll match recommendations to your stage.',
    options: [
      { label: 'I can invest seriously — I see this as ROI', points: 5 },
      { label: 'I have a modest budget and want the most for it', points: 4 },
      { label: 'Tight budget but I\'m willing to start small', points: 2 },
      { label: 'No budget right now — just learning', points: 1 },
    ],
  },
  {
    title: 'Where should we send your personalised results?',
    sub: 'Phase 5 · We\'ll email your full diagnosis + 90-day roadmap instantly.',
    isLeadForm: true,
  },
]

export interface ScoreBand {
  key: 'critical' | 'developing' | 'growing' | 'thriving'
  label: string
  color: string
  bgClass: string
  textClass: string
  diagnosis: string
  bridge: string
  cta: string
  testimonials: { q: string; n: string; r: string }[]
}

export function getBand(score: number): ScoreBand {
  if (score <= 20) return {
    key: 'critical',
    label: 'Critical Stage',
    color: '#E5484D',
    bgClass: 'bg-red-950/50',
    textClass: 'text-red-400',
    diagnosis: 'Your online presence is in critical condition — and it\'s almost certainly costing you customers every single week. When potential clients search for what you offer, they\'re either finding nothing… or finding your competitors. The good news: this is the easiest stage to fix, because every small improvement creates an outsized return.',
    bridge: 'Before you spend a Naira on ads or a website, you need to understand the 3 fundamentals every small business must get right online.',
    cta: 'Book a Free Strategy Call →',
    testimonials: [
      { q: 'I had zero online presence. After APUS\'s guidance I finally understood what I was missing.', n: 'Adaeze N.', r: 'Bakery Owner, Lagos' },
      { q: 'They didn\'t try to sell me — they educated me. Now I know exactly what to fix first.', n: 'Bola S.', r: 'Tailor & Brand Owner' },
    ],
  }
  if (score <= 34) return {
    key: 'developing',
    label: 'Developing Stage',
    color: '#F2B705',
    bgClass: 'bg-yellow-950/50',
    textClass: 'text-yellow-400',
    diagnosis: 'You\'ve taken some good first steps — maybe a social page, some referrals, perhaps a basic site — but there are clear gaps holding you back. Customers can sometimes find you, but they\'re not convinced fast enough. With the right structure, you could double your inbound enquiries within 90 days.',
    bridge: 'We\'ve helped dozens of businesses at this exact stage break through. The first step is a quick strategy call to map your 90-day plan.',
    cta: 'Book a Free Strategy Call →',
    testimonials: [
      { q: 'The guidance alone gave me a clearer plan than 3 freelancers had in 6 months.', n: 'Ifeanyi O.', r: 'Logistics Founder' },
      { q: 'I implemented just 2 changes and got 4 enquiries in a week.', n: 'Mariam K.', r: 'Beauty Studio Owner' },
    ],
  }
  if (score <= 44) return {
    key: 'growing',
    label: 'Growing Stage',
    color: '#16A37B',
    bgClass: 'bg-emerald-950/50',
    textClass: 'text-emerald-400',
    diagnosis: 'You\'re in a strong position — your business has momentum and you\'ve started building a real online presence. But you\'re in the dangerous middle: not yet optimised enough to dominate. The right strategic upgrades to your website, SEO, and conversion funnel could turn a steady business into a category leader.',
    bridge: 'Businesses at your stage benefit most from a tailored strategy. Let\'s map out exactly what your next 90 days should look like to break through.',
    cta: 'Book a Free 20-Minute Strategy Call →',
    testimonials: [
      { q: 'APUS rebuilt our site and we tripled our quote requests in 3 months.', n: 'Emeka U.', r: 'Interior Design Studio' },
      { q: 'The strategy session alone was worth more than the last agency we paid.', n: 'Funmi A.', r: 'Skincare Brand Founder' },
    ],
  }
  return {
    key: 'thriving',
    label: 'Thriving Stage',
    color: '#2E5BFF',
    bgClass: 'bg-blue-950/50',
    textClass: 'text-blue-400',
    diagnosis: 'Impressive — you\'re already doing most things right. Your business has a clear identity, you\'re being found, and customers are choosing you. At this stage, growth comes from refinement: tightening your funnel, scaling what works, and building digital assets that compound over time.',
    bridge: 'Let\'s look at where the biggest scale opportunities are hiding in your business right now.',
    cta: 'Book a Free Strategy Session →',
    testimonials: [
      { q: 'We thought we\'d plateaued. APUS unlocked a whole new growth lever for us.', n: 'Tunde A.', r: 'E-commerce Founder' },
      { q: 'Finally an agency that thinks like an operator, not just a designer.', n: 'Zainab M.', r: 'Consulting Firm CEO' },
    ],
  }
}

export function calcScore(answers: (number | null)[], questions: Question[]): number {
  let s = 0
  for (let i = 0; i < questions.length - 1; i++) {
    const idx = answers[i]
    if (idx !== null && questions[i].options) {
      s += questions[i].options![idx].points
    }
  }
  return s + 5
}
