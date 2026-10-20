import { motion } from 'framer-motion'
import { reviews } from '../../config/site'
import { expo } from '../ui/motion'
import { Eyebrow, LineReveal, Reveal, Stars } from '../ui/primitives'

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

/**
 * Customer testimonials from Google reviews. All authentic 5-star reviews from real customers.
 */
export function Reviews() {
  // Show all 9 reviews
  const cards = reviews
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  return (
    <section aria-labelledby="reviews-title" className="bg-mist-50 py-24 sm:py-32">
      <div className="container-site">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow>Testimonials</Eyebrow>
          <h2 id="reviews-title" className="display mt-5 text-[clamp(2.6rem,5.4vw,4.5rem)] text-navy-950">
            <LineReveal
              lines={[
                'What our',
                <span key="c" className="text-brand-600">
                  customers say.
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.1}>
            <div className="mt-8 inline-flex items-center gap-4 rounded-full bg-white px-5 py-3 shadow-[0_1px_2px_rgb(11_24_41/0.06)] ring-1 ring-navy-950/[0.06]">
              <span className="font-display text-2xl font-extrabold text-navy-950">{average.toFixed(1)}</span>
              <Stars rating={Math.round(average)} className="[&_svg]:size-5" />
              <span className="text-sm text-steel-600">
                from {reviews.length} customer reviews
              </span>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {cards.map((r, i) => {
            return (
              <motion.li
                key={r.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: expo, delay: i * 0.1 }}
              >
                <figure
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white p-7 text-navy-950 shadow-[0_1px_2px_rgb(11_24_41/0.06)] ring-1 ring-navy-950/[0.06] transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgb(11_24_41/0.4)] sm:p-9"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-6 right-5 font-display text-[9rem] leading-none font-extrabold text-mist-200"
                  >
                    ”
                  </span>

                  <Stars rating={r.rating} className="relative" />

                  <blockquote
                    className="relative mt-6 flex-1 font-display text-[1.625rem] leading-[1.15] font-bold tracking-[-0.025em]"
                  >
                    {r.kind === 'quote' ? `“${r.text}”` : r.text}
                  </blockquote>

                  <figcaption
                    className="relative mt-8 flex items-center gap-4 border-t border-navy-950/[0.08] pt-6"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-base font-bold text-brand-600"
                    >
                      {initials(r.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[1.0625rem] leading-tight font-bold">{r.name}</span>
                      <span className="mt-1 block text-sm text-steel-500">
                        {r.topic ?? 'Customer'}
                        {r.kind === 'summary' && ' · Review summary'}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
