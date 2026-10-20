import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PageHero } from '../components/layout/PageHero'
import { PageShell } from '../components/layout/PageShell'
import { SendPhotoSection } from '../components/services/SendPhotoSection'
import { buttonClass } from '../components/ui/buttonClass'
import { expo } from '../components/ui/motion'
import { ClipReveal, LineReveal, Photo, Reveal } from '../components/ui/primitives'
import { moreServices, projects, services, type Img, type ServiceId } from '../config/site'
import { quoteHref } from '../lib/contact'
import { scrollToId } from '../lib/scroll'

/* ─────────────────────────── Data ─────────────────────────── */

/** The job photos shown with each service: [project slug, photo index, framing]. */
const gallery: Record<ServiceId, [slug: string, img: number, position?: string][]> = {
  electrical: [
    ['geyser-relocation', 0, '30% 45%'],
    ['geyser-relocation', 1],
  ],
  solar: [
    ['solar-maitland', 0, '60% 25%'],
    ['solar-diepriver', 0, '50% 45%'],
    ['solar-surrey', 1],
  ],
  maintenance: [
    ['burst-seapoint', 0, '50% 45%'],
    ['kitchen-tap', 0, '45% 55%'],
    ['outdoor-sink', 0],
  ],
}
const photosFor = (id: ServiceId) =>
  gallery[id].map(([slug, img, position]) => {
    const p = projects.find((x) => x.slug === slug)!
    const image: Img = { ...p.images[img], ...(position ? { position } : {}) }
    return { image, job: p.title, place: p.place }
  })

const sections = [
  ...services.map((s) => ({ id: s.id as string, label: s.short })),
  { id: 'how', label: 'How it works' },
  { id: 'more', label: 'More services' },
]

const steps = [
  { title: 'Get in touch', text: 'Call, send a WhatsApp message or use the enquiry form with a short description of the job.' },
  { title: 'Assessment & quotation', text: 'Your plumbing or geyser requirements are assessed and you receive a quotation.' },
  { title: 'The work gets done', text: 'Once you’re happy to go ahead, the installation or maintenance work is carried out.' },
]

/* ─────────────────────────── Overview ─────────────────────────── */

/** The three core services at a glance, each jumping to its details. */
function Overview() {
  return (
    <section aria-labelledby="overview-title" className="bg-mist-50 pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 id="overview-title" className="display text-[clamp(2.4rem,5vw,4.25rem)] text-navy-950 lg:col-span-7">
            <LineReveal
              lines={[
                'Three things',
                <span key="b" className="text-brand-600">
                  we do best.
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="text-lg leading-relaxed text-steel-600">
              Geysers are the speciality, and everyday plumbing is covered too. Choose a service to see what’s involved.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-16">
          {services.map((s, i) => {
            const [first] = photosFor(s.id)
            return (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: expo, delay: i * 0.08 }}
              >
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(s.id)
                  }}
                  className="group block"
                >
                  <div className="aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-mist-200">
                    <Photo
                      {...first.image}
                      sizes="(min-width: 768px) 31vw, 100vw"
                      className="size-full object-cover contrast-[1.05] saturate-[1.08] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
                    />
                  </div>
                  <p className="mt-5 font-mono text-sm font-semibold text-brand-600">0{i + 1}</p>
                  <h3 className="mt-1.5 text-[1.625rem] leading-tight font-extrabold tracking-[-0.03em] text-navy-950 transition-colors group-hover:text-brand-600">
                    {s.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-steel-600">{s.body}</p>
                  <span className="mt-4 inline-block font-display font-semibold text-navy-950 underline decoration-signal-500 decoration-2 underline-offset-[6px]">
                    See the details
                  </span>
                </a>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ─────────────────────────── Sticky section switcher ─────────────────────────── */

function SectionNav() {
  const [active, setActive] = useState(sections[0].id)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return (
    <nav
      aria-label="Services on this page"
      className="sticky top-[4.75rem] z-30 border-y border-navy-950/[0.07] bg-white/90 backdrop-blur-xl"
    >
      <ul className="container-site flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] lg:justify-center">
        {sections.map((s) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(s.id)
              }}
              aria-current={active === s.id ? 'location' : undefined}
              className={`relative flex min-h-10 items-center rounded-full px-4 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors ${
                active === s.id ? 'text-white' : 'text-steel-600 hover:bg-navy-950/[0.05] hover:text-navy-950'
              }`}
            >
              {active === s.id && (
                <motion.span
                  layoutId="services-nav"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-navy-950"
                />
              )}
              <span className="relative">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ─────────────────────────── One service in detail ─────────────────────────── */

/** One service: its details on one side and a mosaic of its job photos on the other. */
function ServiceDetail({ s, i }: { s: (typeof services)[number]; i: number }) {
  const photos = photosFor(s.id)

  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-title`}
      className={`py-20 sm:py-28 ${i % 2 === 0 ? 'bg-white' : 'bg-mist-50'}`}
    >
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
        {/* details */}
        <div className="lg:col-span-5">
          <div>
            <p className="font-mono text-sm font-semibold text-brand-600">0{i + 1}</p>
            <h2 id={`${s.id}-title`} className="display mt-3 text-[clamp(2.4rem,4.6vw,4rem)] text-navy-950">
              <LineReveal lines={[s.title]} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 text-xl leading-relaxed text-navy-950/85">{s.body}</p>

              <h3 className="mt-10 font-display text-lg font-bold tracking-[-0.02em] text-navy-950">What’s included</h3>
              <ul className="mt-3 border-t border-navy-950/10">
                {s.includes.map((item) => (
                  <li key={item} className="flex items-center gap-4 border-b border-navy-950/10 py-3 text-navy-950">
                    <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-signal-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 font-display text-lg font-bold tracking-[-0.02em] text-navy-950">Good to know</h3>
              <p className="mt-3 leading-relaxed text-steel-600">{s.detail}</p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link to={quoteHref(s.id)} className={buttonClass('accent', 'lg')}>
                  Enquire about this
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* photos: one wide shot over two side by side (or a pair when there are only two) */}
        <ul className="grid grid-cols-2 gap-3 self-start sm:gap-5 lg:col-span-7">
          {photos.map(({ image }, n) => {
            const wide = photos.length === 3 && n === 0
            return (
              <li key={image.base} className={wide ? 'col-span-2' : ''}>
                <figure>
                  <ClipReveal
                    delay={n * 0.1}
                    className={`rounded-[1.5rem] ${wide ? 'aspect-[16/10]' : photos.length === 3 ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}
                  >
                    <Photo
                      {...image}
                      sizes={wide ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                      className="size-full object-cover contrast-[1.05] saturate-[1.08]"
                    />
                  </ClipReveal>
                </figure>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ─────────────────────────── How it works ─────────────────────────── */

function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="bg-wave-100 py-20 sm:py-28">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="how-title" className="display text-[clamp(2.4rem,5vw,4rem)] text-navy-950">
            <LineReveal
              lines={[
                'How a job',
                <span key="w" className="text-brand-600">
                  works.
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-steel-600">
              The same simple process, whether it’s a dripping tap or a new solar geyser.
            </p>
          </Reveal>
        </div>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <span
            aria-hidden="true"
            className="absolute top-[2.25rem] right-[16%] left-[16%] hidden border-t-2 border-dashed border-navy-950/20 md:block"
          />
          {steps.map((step, n) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: expo, delay: n * 0.12 }}
              className="relative text-center"
            >
              <span className="relative mx-auto flex size-[4.5rem] items-center justify-center rounded-full bg-white font-display text-3xl font-extrabold text-brand-600 shadow-[0_10px_30px_-14px_rgb(10_27_48/0.35)]">
                {n + 1}
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.03em] text-navy-950">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-steel-600">{step.text}</p>
            </motion.li>
          ))}
        </ol>
        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <Link to="/contact" className={buttonClass('navy', 'lg')}>
            Start with step one
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────── More services ─────────────────────────── */

/** The flyer's extra services as a clean photo grid; each one starts an enquiry about it. */
function MoreServices() {
  return (
    <section id="more" aria-labelledby="more-title" className="bg-mist-100 py-20 sm:py-28">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 id="more-title" className="display text-[clamp(2.4rem,5vw,4.25rem)] text-navy-950 lg:col-span-7">
            <LineReveal
              lines={[
                'Also on the',
                <span key="j" className="text-brand-600">
                  job sheet.
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="text-lg leading-relaxed text-steel-600">
              More plumbing work that can be booked, from burst pipes to certificates of compliance.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {moreServices.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: expo, delay: (i % 3) * 0.08 }}
              className="row-span-4 grid grid-rows-subgrid gap-y-0"
            >
              <Link
                to={`/contact?service=other&about=${encodeURIComponent(m.title)}`}
                className="group row-span-4 grid grid-rows-subgrid gap-y-0"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-mist-200">
                  <Photo
                    {...m.image}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="size-full object-cover contrast-[1.05] saturate-[1.08] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="mt-5 self-end text-[1.5rem] leading-tight font-extrabold tracking-[-0.03em] text-navy-950 transition-colors group-hover:text-brand-600">
                  {m.title}
                </h3>
                <p className="mt-2 leading-relaxed text-steel-600">{m.text}</p>
                <span className="mt-4 self-start justify-self-start font-display font-semibold text-navy-950 underline decoration-signal-500 decoration-2 underline-offset-[6px]">
                  Enquire about this
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function ServicesPage() {
  const { hash } = useLocation()
  // Arriving from a link like /services#solar: scroll there once the page transition has revealed it.
  useEffect(() => {
    if (!hash) return
    const id = setTimeout(() => scrollToId(hash.slice(1)), 550)
    return () => clearTimeout(id)
  }, [hash])

  return (
    <PageShell path="/services">
      <PageHero
        banner="services"
        next="text-mist-50"
        index="03"
        label="Services"
        lines={[
          'Geysers first.',
          <span key="a" className="text-signal-400">
            Plumbing always.
          </span>,
        ]}
        intro="Specialists in electrical and solar geyser installations, with everyday plumbing maintenance and repairs covered too."
      />
      <Overview />
      <SectionNav />
      {services.map((s, i) => (
        <ServiceDetail key={s.id} s={s} i={i} />
      ))}
      <HowItWorks />
      <MoreServices />
      <SendPhotoSection />
    </PageShell>
  )
}
