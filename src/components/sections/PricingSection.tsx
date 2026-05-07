import { PricingSection } from '@/components/ui/pricing'
import type { SelectedPlan } from '@/pages/Home'

interface Props {
  onSelectPlan: (plan: SelectedPlan) => void
}

const planData = [
  {
    name: 'Starter',
    price: '₦350,000',
    description: 'Perfect for small businesses ready to establish a professional online presence.',
    features: [
      '5-page professional website',
      'Mobile-responsive design',
      'Basic SEO setup',
      'Contact form integration',
      'Social media links',
      '2 rounds of revisions',
      '30-day post-launch support',
    ],
    buttonText: 'Get Started',
  },
  {
    name: 'Growth',
    price: '₦700,000',
    description: 'For businesses ready to grow — with branding, ads, and a website built to convert.',
    features: [
      'Everything in Starter',
      'Up to 10 pages + blog',
      'Brand identity (logo + guidelines)',
      'Social media setup & templates',
      'Basic ad campaign setup (Meta/Google)',
      'Email marketing integration',
      '60-day post-launch support',
    ],
    buttonText: 'Start Growing',
    isPopular: true,
  },
  {
    name: 'Premium',
    price: '₦1,500,000',
    description: 'Full-service for brands serious about dominating their market online.',
    features: [
      'Everything in Growth',
      'E-commerce store (Shopify / WooCommerce)',
      'Full brand strategy & identity',
      'Ad management (3 months)',
      'Automation & CRM setup',
      'Business consulting session',
      '90-day priority support',
    ],
    buttonText: 'Go Premium',
  },
]

export default function PricingSectionWrapper({ onSelectPlan }: Props) {
  const plans = planData.map(p => ({
    ...p,
    onClick: () => onSelectPlan({ name: p.name, price: p.price }),
  }))

  return (
    <section id="pricing">
      <PricingSection
        plans={plans}
        title="Packages Built for Growth"
        description="No hidden fees. No monthly retainers. One investment — built to pay you back."
      />
    </section>
  )
}
