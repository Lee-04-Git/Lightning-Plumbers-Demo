import { Hero } from '../components/home/Hero'
import { ServicesOverview } from '../components/home/ServicesOverview'
import { WhyChooseUs } from '../components/home/WhyChooseUs'
import { PageShell } from '../components/layout/PageShell'

export default function HomePage() {
  return (
    <PageShell path="/">
      <Hero />
      <WhyChooseUs />
      <ServicesOverview />
    </PageShell>
  )
}
