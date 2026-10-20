import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { projects, site } from '../../config/site'
import { expo } from '../ui/motion'
import { Eyebrow, LineReveal, Photo, Reveal } from '../ui/primitives'

/** A job photo, framed on its subject, with the job's name and suburb for the caption. */
const job = (slug: string, img: number, position: string) => {
  const p = projects.find((x) => x.slug === slug)!
  return { image: { ...p.images[img], position }, job: p.title, place: p.place }
}

/**
 * Reasons drawn only from verified material: the business's own description,
 * its services flyer, its job posts and the supplied customer reviews.
 * Each one is paired with a real job photo.
 */
const reasons = [
  {
    tag: 'Speciality',
    title: 'Geyser specialists',
    text: 'Electric and solar geyser installations are the core of the business: new installs, replacements, relocations and electric-to-solar conversions.',
    ...job('solar-diepriver', 0, '50% 45%'),
  },
  {
    tag: 'Communication',
    title: 'Prompt, clear contact',
    text: 'Customers mention the prompt response, the assessment and a straightforward quotation process.',
    ...job('kitchen-tap', 0, '45% 55%'),
  },
  {
    tag: 'Workmanship',
    title: 'Genuine, tidy work',
    text: '"Quick fast and genuine workmanship." "Work was done excellent." That\'s how customers have described it.',
    ...job('solar-maitland', 2, '45% 60%'),
  },
  {
    tag: 'Local',
    title: `Rooted in ${site.location.area}`,
    text: `Based in ${site.location.suburb}, but we travel all over the Helderberg Basin, Gordon's Bay, and surrounding areas to help out clients wherever we're needed.`,
    ...job('geyser-relocation', 0, '30% 45%'),
  },
]

/**
 * Sticky photo + scrolling reasons. On large screens the photo stays put and changes to match
 * the reason in the middle of the screen; on small screens each reason shows its own photo.
 */
export function WhyChooseUs() {
  const [active, setActive] = useState(0)
  const items = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    items.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const current = reasons[active]

  return (
    <section aria-labelledby="why-title" className="bg-mist-50 py-24 sm:py-32">
      <div className="container-site grid gap-x-16 lg:grid-cols-12">
        {/* sticky photo (desktop) */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 flex h-[calc(100svh-9rem)] max-h-[46rem] min-h-[34rem] flex-col justify-center">
            <div className="relative">
              <div aria-hidden="true" className="absolute inset-0 translate-x-5 translate-y-5 rounded-[2rem] bg-wave-100" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-mist-200">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: expo }}
                    className="absolute inset-0"
                  >
                    <Photo
                      {...current.image}
                      sizes="(min-width: 1320px) 480px, 38vw"
                      className="size-full object-cover contrast-[1.06] saturate-[1.1]"
                    />
                  </motion.div>
                </AnimatePresence>
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-navy-950/45 to-transparent" />
                <div aria-hidden="true" className="absolute inset-0 rounded-[2rem] ring-1 ring-black/5 ring-inset" />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: expo }}
                    className="absolute bottom-5 left-5 max-w-[80%] rounded-2xl bg-white/95 px-4 py-3 shadow-[0_10px_24px_-12px_rgb(10_27_48/0.55)] backdrop-blur"
                  >
                    <span className="block text-sm leading-tight font-semibold text-navy-950">{current.job}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
            <div aria-hidden="true" className="mt-10 flex gap-2">
              {reasons.map((r, i) => (
                <span key={r.title} className="h-1 flex-1 overflow-hidden rounded-full bg-navy-950/10">
                  <span
                    className={`block h-full origin-left rounded-full bg-signal-500 transition-transform duration-500 ease-out-expo ${
                      i <= active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* heading + reasons */}
        <div className="lg:col-span-7">
          <Eyebrow>Why choose us?</Eyebrow>
          <h2 id="why-title" className="display mt-5 text-[clamp(2.6rem,5.6vw,4.75rem)] text-navy-950">
            <LineReveal
              lines={[
                'Why call',
                <span key="p" className="text-brand-600">
                  Lightning Plumbers?
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-steel-600">
              A local plumbing business that focuses on doing the job properly and keeping you in the loop.
            </p>
          </Reveal>

          <ol className="mt-16 space-y-16 sm:space-y-20 lg:mt-28 lg:space-y-32 lg:pb-[18vh]">
            {reasons.map((r, i) => (
              <li
                key={r.title}
                ref={(el) => {
                  items.current[i] = el
                }}
                data-index={i}
                className={`transition-opacity duration-500 ${i === active ? 'lg:opacity-100' : 'lg:opacity-35'}`}
              >
                <Reveal>
                  <figure className="mb-7 lg:hidden">
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-mist-200 ring-1 ring-black/5 ring-inset">
                      <Photo
                        {...r.image}
                        sizes="(min-width: 640px) 80vw, 100vw"
                        className="size-full object-cover contrast-[1.06] saturate-[1.1]"
                      />
                    </div>
                    <figcaption className="mt-3 text-sm text-steel-500">
                      <span className="font-semibold text-navy-950">{r.job}</span>
                    </figcaption>
                  </figure>
                  <p className="flex items-center gap-4 text-sm font-semibold text-brand-600">
                    <span className="font-mono">0{i + 1}</span>
                    <span aria-hidden="true" className="h-px w-10 bg-brand-600/40" />
                    <span className="label">{r.tag}</span>
                  </p>
                  <h3 className="display mt-5 text-[clamp(2.1rem,4.2vw,3.5rem)] text-navy-950">{r.title}</h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel-600">{r.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
