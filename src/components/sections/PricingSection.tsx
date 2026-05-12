import { PricingSection } from '@/components/ui/pricing'
import type { SelectedPlan } from '@/pages/Home'

interface Props {
  onSelectPlan: (plan: SelectedPlan) => void
}

const planData = [
  {
    name: 'Starter',
    price: '₦500,000',
    description: 'Everything you need to launch a clean, professional website fast.',
    features: [
      'Up to 5 pages, mobile responsive',
      '1 homepage concept',
      'Basic contact form & social media links',
      'E-commerce: up to 30 products',
      'Simple listings, 1 payment gateway',
      'Basic cart & checkout',
      'Basic SEO setup',
      '1 week post-launch support',
      'Delivery in 1 week',
    ],
    buttonText: 'Get Started',
  },
  {
    name: 'Growth',
    price: '₦950,000',
    description: 'For businesses ready to scale — with richer features and full SEO.',
    features: [
      'Up to 10 pages, 2 homepage concepts',
      'Custom brand styling, blog & photo gallery',
      'Live chat widget',
      'E-commerce: up to 100 products',
      'Categories & filters, 2 payment gateways',
      'Discount codes & order tracking',
      'Full SEO + Google Analytics setup',
      '2 weeks post-launch support',
      'Delivery in 2 weeks',
    ],
    buttonText: 'Start Growing',
    isPopular: true,
  },
  {
    name: 'Premium',
    price: '₦1,400,000',
    description: 'The complete package for brands serious about dominating online.',
    features: [
      'Up to 20 pages, 3 homepage concepts',
      'Custom animations, booking & members area',
      'Multi-language support',
      'E-commerce: unlimited products',
      'Inventory mgmt, multi-currency, abandoned cart',
      'Customer reviews & upsell/cross-sell',
      'Advanced SEO + sitemap + speed tuning',
      'Staff training session',
      '3 weeks post-launch support · Delivery in 3 weeks',
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
