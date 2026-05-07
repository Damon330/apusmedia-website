import { useState } from 'react'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Mission from '@/components/sections/Mission'
import Stats from '@/components/sections/Stats'
import Portfolio from '@/components/sections/Portfolio'
import Platforms from '@/components/sections/Platforms'
import PricingSection from '@/components/sections/PricingSection'
import Team from '@/components/sections/Team'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'

export interface SelectedPlan {
  name: string
  price: string
}

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null)

  const handleSelectPlan = (plan: SelectedPlan) => {
    setSelectedPlan(plan)
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  return (
    <>
      <Hero />
      <Services />
      <Mission />
      <Stats />
      <Portfolio />
      <Platforms />
      <PricingSection onSelectPlan={handleSelectPlan} />
      <Team />
      <FAQ />
      <Contact selectedPlan={selectedPlan} onClearPlan={() => setSelectedPlan(null)} />
    </>
  )
}
