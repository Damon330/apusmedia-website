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

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Mission />
      <Stats />
      <Portfolio />
      <Platforms />
      <PricingSection />
      <Team />
      <FAQ />
      <Contact />
    </>
  )
}
