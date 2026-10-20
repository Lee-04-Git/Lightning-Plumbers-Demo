import { AnimatePresence, motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { projects, site, type Project } from '../../config/site'
import { defaultWhatsAppMessage, whatsappHref } from '../../lib/contact'
import { buttonClass } from '../ui/buttonClass'
import { WhatsAppIcon } from '../ui/Icons'
import { expo } from '../ui/motion'
import { LineReveal, Photo, Reveal } from '../ui/primitives'

/** The kinds of work, in the order they're offered. */
const order: Project['category'][] = ['Solar geysers', 'Electric geysers', 'Bathrooms', 'Water supply', 'Repairs & maintenance']
const categories = ['All', ...order.filter((c) => projects.some((p) => p.category === c))]

/** The photo shown in the WhatsApp chat preview at the end. */
const chatPhoto = projects.find((p) => p.slug === 'kitchen-tap')!.images[0]

/** Every photo of every job, grouped by type of work. */
const allPhotos = order.flatMap((c) =>
  projects.filter((p) => p.category === c).flatMap((p) => p.images.map((img) => ({ project: p, img }))),
)

/**
 * The job photo wall: every photo in the same frame, in a tidy grid, each captioned with
 * the job, the suburb and the month. Filter by type of work.
 */
export function Gallery() {
  const [params, setParams] = useSearchParams()
  const requested = params.get('category')
  const filter = requested && categories.includes(requested) ? requested : 'All'
  const shown = filter === 'All' ? allPhotos : allPhotos.filter((ph) => ph.project.category === filter)

  const choose = (c: string) =>
    setParams(c === 'All' ? {} : { category: c }, { replace: true, preventScrollReset: true })

  return (
    <section aria-labelledby="gallery-title" className="bg-mist-50 pt-20 pb-24 sm:pt-24 sm:pb-32">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="gallery-title" className="display text-[clamp(2.4rem,5vw,4rem)] text-navy-950">
            <LineReveal
              lines={[
                'The proof is in',
                <span key="p" className="text-brand-600">
                  the pipework.
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-steel-600">
              Every photo here was taken on the job and posted by the business. No stock images, no staging, just
              honest work from around Cape Town.
            </p>
          </Reveal>
        </div>

        {/* filter */}
        <Reveal delay={0.15} className="mt-10">
          <div
            role="group"
            aria-label="Show photos by type of work"
            className="-mx-1 flex gap-1 overflow-x-auto px-1 py-1 [scrollbar-width:none] sm:justify-center"
          >
            {categories.map((c) => {
              const active = c === filter
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(c)}
                  className={`relative min-h-11 shrink-0 cursor-pointer rounded-full px-5 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors ${
                    active ? 'text-white' : 'text-steel-600 hover:bg-navy-950/[0.05] hover:text-navy-950'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="showcase-tab"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      className="absolute inset-0 rounded-full bg-navy-950"
                    />
                  )}
                  <span className="relative">{c === 'All' ? 'All work' : c}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* the wall */}
        <p className="sr-only" aria-live="polite">
          Showing {filter === 'All' ? 'all photos' : `${filter} photos`}
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-10 grid grid-cols-2 gap-x-3 gap-y-7 sm:mt-12 sm:gap-x-5 sm:gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10"
          >
            {shown.map(({ project, img }, i) => (
              <motion.li
                key={img.base}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: expo, delay: (i % 4) * 0.05 }}
              >
                <figure className="group">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-mist-200">
                    <Photo
                      {...img}
                      sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                      className="size-full object-cover contrast-[1.05] saturate-[1.08] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="mt-3">
                    <span className="line-clamp-2 block min-h-[2.5em] text-sm leading-[1.25] font-semibold text-navy-950 sm:line-clamp-1 sm:min-h-0 sm:truncate sm:text-[0.9375rem]">
                      {project.title}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-steel-500 sm:text-sm">
                      {project.place} · {project.date}
                    </span>
                  </figcaption>
                </figure>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* sign-off: send a photo of your own job */}
        <Reveal className="mt-20 sm:mt-28">
          <div className="relative grid items-center gap-12 overflow-hidden rounded-[2rem] bg-[#e8f9ef] px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:px-16">
            {/* soft green glow for depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-whatsapp/20 blur-3xl"
            />

            <div className="relative lg:col-span-7">
              <h3 className="display text-[clamp(2.25rem,4.4vw,3.75rem)] text-navy-950">
                Got a job that looks
                <br className="max-sm:hidden" /> like one of these?
              </h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-steel-600">
                Snap a photo of yours and send it on WhatsApp. It’s the quickest way to show what’s going on, and the
                job can be assessed and quoted.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <a
                  href={whatsappHref(defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass('whatsapp', 'lg')}
                >
                  <WhatsAppIcon className="size-5" />
                  Send a photo on WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center font-display font-semibold text-navy-950 underline decoration-whatsapp-dark decoration-2 underline-offset-[6px] transition-colors hover:text-brand-600 hover:decoration-brand-600"
                >
                  Or send an enquiry
                </Link>
              </div>
            </div>

            {/* what you'd send: a little WhatsApp chat preview */}
            <div aria-hidden="true" className="relative lg:col-span-5">
              <div className="mx-auto w-full max-w-[20rem] rotate-2 overflow-hidden rounded-[1.75rem] bg-[#efeae2] shadow-[0_30px_60px_-30px_rgb(10_27_48/0.45)] ring-1 ring-black/5 transition-transform duration-500 ease-out-expo hover:rotate-0 lg:mr-0">
                <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/15">
                    <WhatsAppIcon className="size-4" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold">{site.name}</span>
                    <span className="block text-xs text-white/75">{site.phone.display}</span>
                  </span>
                </div>
                <div className="space-y-2 p-4">
                  <div className="ml-auto w-[85%] rounded-xl rounded-tr-sm bg-[#d9fdd3] p-1.5 shadow-sm">
                    <div className="aspect-[4/3] overflow-hidden rounded-lg">
                      <Photo {...chatPhoto} alt="" widths={[480]} sizes="260px" className="size-full object-cover" />
                    </div>
                    <p className="px-1.5 pt-2 pb-0.5 text-[0.8125rem] leading-snug text-navy-950">
                      {defaultWhatsAppMessage}
                    </p>
                    <p className="px-1.5 text-right text-[0.6875rem] text-steel-500">
                      now <span className="text-[#53bdeb]">✓✓</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
