import { Process } from '../components/about/Process'
import { Reviews } from '../components/about/Reviews'
import { Story } from '../components/about/Story'
import { Values } from '../components/about/Values'
import { PageHero } from '../components/layout/PageHero'
import { PageShell } from '../components/layout/PageShell'
import { site } from '../config/site'

export default function AboutPage() {
  return (
    <PageShell path="/about">
      <PageHero
        banner="about"
        next="text-mist-50"
        index="02"
        label="About us"
        lines={[
          'Local plumbers,',
          <span key="a" className="text-signal-400">
            doing it right.
          </span>,
        ]}
        intro={`A plumbing business based in ${site.location.suburb}, ${site.location.area}, specialising in electrical and solar geyser installations and plumbing maintenance.`}
      />
      <Story />
      <Values />
      <Process />
      <Reviews />
    </PageShell>
  )
}
