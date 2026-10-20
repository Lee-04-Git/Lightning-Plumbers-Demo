import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { Banner } from '../layout/Banner'
import { Magnetic } from '../ui/Button'
import { buttonClass } from '../ui/buttonClass'
import { expo, PAGE_IN } from '../ui/motion'
import { Eyebrow, LineReveal, Underline } from '../ui/primitives'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: expo, delay: PAGE_IN + delay },
})

const facts = [
  { label: 'Speciality', value: 'Electric & solar geysers' },
  { label: 'Based in', value: `${site.location.suburb}, ${site.location.area}` },
]

export function Hero() {
  return (
    <Banner image="home" next="text-mist-50" tall>
      <div className="container-site pt-16 pb-24 sm:pb-28 lg:pb-32">
        <div className="max-w-3xl">
          <motion.div {...fadeUp(0)}>
            <Eyebrow tone="dark">Plumbing &amp; geyser specialists · Somerset West</Eyebrow>
          </motion.div>
          <h1 id="hero-title" className="display mt-6 text-[clamp(3.4rem,9.2vw,8.25rem)] text-white">
            <LineReveal
              onLoad
              delay={PAGE_IN + 0.05}
              lines={[
                'Fast. Reliable.',
                <span key="r">
                  <span className="relative inline-block text-signal-400">
                    Plumb Perfect
                    <Underline onLoad delay={PAGE_IN + 0.75} className="text-wave-300" />
                  </span>
                </span>,
              ]}
            />
          </h1>
          <motion.p {...fadeUp(0.35)} className="mt-8 max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl">
            We offer residential & commercial plumbing services throughout the Helderberg region.
          </motion.p>

          <motion.div {...fadeUp(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <Link to="/contact" className={`${buttonClass('accent', 'lg')} w-full sm:w-auto`}>
                Enquire about a job
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/services" className={`${buttonClass('outline-light', 'lg')} w-full sm:w-auto`}>
                Explore our services
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <motion.dl
          {...fadeUp(0.65)}
          className="mt-14 grid max-w-2xl gap-5 border-t border-white/20 pt-6 sm:grid-cols-2"
        >
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="label text-navy-200">{f.label}</dt>
              <dd className="mt-1.5 font-display text-[1.0625rem] leading-snug font-bold text-white">{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </Banner>
  )
}
