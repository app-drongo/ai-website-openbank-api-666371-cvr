import { Pricing } from '@/components/sections/pricing'

export default function PricingPage() {
  return (
    <main>
      <section id="pricing">
        <Pricing />
      </section>
    </main>
  )
}

export const metadata = {
  title: 'Pricing - OpenBank API',
  description: 'Choose the perfect plan for your financial application. Transparent pricing with enterprise-grade features.',
}