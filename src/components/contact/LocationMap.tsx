import { ArrowUpRight, MapPin } from 'lucide-react'
import { site } from '../../config/site'
import { buttonClass } from '../ui/buttonClass'
import { LineReveal, Reveal } from '../ui/primitives'

const { location } = site

/** The street address is only written out once the owner has confirmed it may be public. */
const showStreet = location.showStreetAddress && location.street !== ''
const placeLabel = showStreet
  ? [location.street, location.suburb, location.postalCode, location.city].filter(Boolean).join(', ')
  : `${location.suburb}, ${location.area}`

/**
 * Google Maps embed (no API key needed): searching the business name at the listing's coordinates
 * pins the business's own Google listing. The button opens the listing link the client supplied.
 */
const { map } = location
const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.name)}&ll=${map.lat},${map.lng}&z=15&output=embed`
const mapsHref = map.url

/** Where the business is based, with a map of the area, at the end of the Contact page. */
export function LocationMap() {
  return (
    <section aria-labelledby="location-title" className="bg-white py-16 sm:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-4">
          <p className="label text-brand-600">Location</p>
          <h2 id="location-title" className="display mt-3 text-[clamp(2.2rem,4.2vw,3.5rem)] text-navy-950">
            <LineReveal
              lines={[
                'Based in',
                <span key="s" className="text-brand-600">
                  {location.suburb}.
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.1}>
            <ul className="mt-8 grid gap-5">
              <li className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-steel-500">Based in</span>
                  <span className="mt-0.5 block font-display text-lg font-bold tracking-[-0.02em] text-navy-950">
                    {placeLabel}
                  </span>
                </span>
              </li>
              <li className="border-t border-navy-950/10 pt-5">
                <span className="block text-sm font-medium text-steel-500">Areas served</span>
                <span className="mt-0.5 block leading-relaxed text-navy-950">{site.serviceArea.label}</span>
              </li>
            </ul>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass('navy', 'lg')} mt-8`}
            >
              Open in Google Maps
              <ArrowUpRight aria-hidden="true" className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-8">
          <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-mist-200 ring-1 ring-navy-950/[0.07] sm:aspect-[16/9]">
            <iframe
              title={`Map showing ${site.name} in ${placeLabel}`}
              src={embedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
