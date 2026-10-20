import { motion } from 'framer-motion'
import { ClipboardCheck, Hammer, Home, MessageCircle, type LucideIcon } from 'lucide-react'
import { site } from '../../config/site'
import { expo } from '../ui/motion'
import { Eyebrow, LineReveal, Reveal, WaveEdge } from '../ui/primitives'

const values: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ClipboardCheck,
    title: 'Honest quotes',
    text: 'Every job is assessed first and quoted clearly before any work begins.',
  },
  {
    icon: MessageCircle,
    title: 'Responsive communication',
    text: 'Getting back to you promptly, and explaining the work in plain language.',
  },
  {
    icon: Hammer,
    title: 'Quality workmanship',
    text: 'Neat, genuine work, done properly, whether it’s a tap washer or a rooftop solar system.',
  },
  {
    icon: Home,
    title: 'Local and approachable',
    text: `A ${site.location.area} business, looking after homes and properties across Cape Town.`,
  },
]

export function Values() {
  return (
    <section aria-labelledby="values-title" className="relative isolate bg-navy-950 py-24 text-mist-50 sm:py-32">
      <WaveEdge className="text-navy-950" />
      <div aria-hidden="true" className="blueprint-dark absolute inset-0 -z-10" />
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Eyebrow tone="dark">Our approach</Eyebrow>
          <h2 id="values-title" className="display mt-5 text-[clamp(2.6rem,5vw,4.25rem)]">
            <LineReveal
              lines={[
                'Straight talk.',
                <span key="p" className="text-signal-400">
                  Proper work.
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-navy-300">
              What you can expect when you call Lightning Plumbers, from the first message to the finished job.
            </p>
          </Reveal>
        </div>

        <ul className="grid border-t border-mist-50/10 sm:grid-cols-2 lg:col-span-8">
          {values.map((v, i) => (
            <motion.li
              key={v.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: expo, delay: (i % 2) * 0.1 }}
              className={`group border-b border-mist-50/10 py-8 sm:py-10 ${i % 2 === 0 ? 'sm:border-r sm:pr-10' : 'sm:pl-10'}`}
            >
              <div className="flex items-center justify-between">
                <span className="flex size-14 items-center justify-center rounded-[1rem] rounded-tl-[1.75rem] bg-signal-500 text-navy-950 transition-transform duration-500 ease-out-expo group-hover:-rotate-6">
                  <v.icon aria-hidden="true" className="size-6" />
                </span>
                <span className="label text-navy-300">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-[1.75rem] leading-[1.05] font-extrabold tracking-[-0.03em]">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-navy-300">{v.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
