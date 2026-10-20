import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { moreServices } from '../../config/site'
import { expo } from '../ui/motion'
import { Eyebrow, LineReveal, Reveal } from '../ui/primitives'
import { ServicePanels } from './ServicePanels'

export function ServicesOverview() {
  return (
    <section aria-labelledby="services-title" className="bg-mist-100 py-24 sm:py-32">
      <div className="container-site">
        {/* heading */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>What we do</Eyebrow>
            <h2 id="services-title" className="display mt-5 text-[clamp(2.6rem,5.6vw,4.75rem)] text-navy-950">
              <LineReveal
                lines={[
                  'Hot water.',
                  <span key="p" className="text-brand-600">
                    Working pipes.
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="text-lg leading-relaxed text-steel-600">
              Specialists in electric and solar geysers, with everyday plumbing maintenance and repairs covered too.
            </p>
            <Link
              to="/services"
              className="group mt-5 inline-flex min-h-11 items-center gap-2 font-display font-semibold text-navy-950"
            >
              <span className="bg-linear-to-r from-signal-500 to-signal-500 bg-[length:100%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:0%_2px]">
                All services
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <ServicePanels />

        {/* our services */}
        <div className="mt-20 lg:mt-28">
          <Reveal className="flex items-baseline justify-between gap-6 border-b border-navy-950/10 pb-5">
            <h3 className="font-display text-2xl font-bold tracking-[-0.025em] text-navy-950">Our Services</h3>
          </Reveal>
          <ul className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
            {moreServices.map((m, i) => (
              <motion.li
                key={m.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: expo, delay: (i % 3) * 0.06 }}
                className="border-b border-navy-950/10"
              >
                <Link
                  to={`/contact?service=other&about=${encodeURIComponent(m.title)}`}
                  className="group flex items-start justify-between gap-4 py-5"
                >
                  <span>
                    <span className="block font-display text-lg font-bold tracking-[-0.015em] text-navy-950 transition-colors duration-300 group-hover:text-brand-600">
                      {m.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-steel-600">{m.text}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-steel-500 transition-[transform,color] duration-300 group-hover:rotate-45 group-hover:text-signal-500"
                  />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
