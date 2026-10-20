import { site } from '../../config/site'
import { ClipReveal, Eyebrow, Reveal } from '../ui/primitives'

export function Story() {
  return (
    <section aria-labelledby="story-title" className="bg-mist-50 py-24 sm:py-32">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Eyebrow>Who we are</Eyebrow>
          <h2 id="story-title" className="sr-only">
            Our story
          </h2>
          <Reveal>
            <p className="drop-cap mt-8 text-xl leading-relaxed text-navy-950 sm:text-2xl sm:leading-relaxed">
              Lightning Plumbers provides comprehensive plumbing maintenance and specialises in advanced water leak detection, turnkey bathroom renovations, and certified electrical and solar geyser installations. With a focus on rapid response times, transparent pricing, and quality workmanship, the business helps residential and commercial properties across the Helderberg region keep their water systems safe and fully compliant.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-6 border-t border-navy-950/10 pt-6 sm:grid-cols-3">
              <div>
                <dt className="label text-steel-500">Based in</dt>
                <dd className="mt-1.5 font-display text-lg leading-snug font-bold text-navy-950">
                  {site.location.suburb}, {site.location.area}
                </dd>
              </div>
              <div>
                <dt className="label text-steel-500">Speciality</dt>
                <dd className="mt-1.5 font-display text-lg leading-snug font-bold text-navy-950">
                  Electric &amp; solar geysers
                </dd>
              </div>
              <div>
                <dt className="label text-steel-500">Working across</dt>
                <dd className="mt-1.5 font-display text-lg leading-snug font-bold text-navy-950">
                  {site.serviceArea.label}
                </dd>
              </div>
            </dl>
          </Reveal>


        </div>

        <figure className="relative lg:col-span-5 lg:col-start-8">
          <ClipReveal className="aspect-[4/5] rounded-[1.75rem] rounded-tr-[9rem]">
            <img 
              src="/images/who-we-are.jpg" 
              alt="Lightning Plumbers team" 
              sizes="(min-width: 1024px) 460px, 92vw" 
              className="size-full object-cover" 
            />
          </ClipReveal>
        </figure>
      </div>
    </section>
  )
}
