import { PageHero } from '../components/layout/PageHero'
import { PageShell } from '../components/layout/PageShell'
import { Gallery } from '../components/showcase/Gallery'

export default function ShowcasePage() {
  return (
    <PageShell path="404">
      <PageHero
        banner="showcase"
        next="text-mist-50"
        eyebrow={false}
        index="04"
        label="Showcase"
        lines={[
          'Our work,',
          <span key="a" className="text-signal-400">
            up close.
          </span>,
        ]}
        intro="Jobs posted by Lightning Plumbers, from rooftop solar geysers to burst pipes and bathrooms. Every photo is the business's own."
      />
      <Gallery />
    </PageShell>
  )
}
