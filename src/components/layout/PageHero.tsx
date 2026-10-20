import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { BannerKey } from '../../config/site'
import { expo, PAGE_IN } from '../ui/motion'
import { Eyebrow, LineReveal } from '../ui/primitives'
import { Banner } from './Banner'

/** Opening for inner pages: a photo banner with the page number, a big headline and one line of intro. */
export function PageHero({
  index,
  label,
  lines,
  intro,
  aside,
  banner,
  next,
  eyebrow = true,
}: {
  index: string
  label: string
  lines: ReactNode[]
  intro?: ReactNode
  aside?: ReactNode
  banner: BannerKey
  /** Background colour class of the section that follows (for the wave edge). */
  next?: string
  /** Show the small "index · label" line above the headline. */
  eyebrow?: boolean
}) {
  return (
    <Banner image={banner} next={next}>
      <div className="container-site grid gap-10 pt-16 pb-24 sm:pt-24 sm:pb-28 lg:grid-cols-12 lg:items-end lg:pt-32 lg:pb-36">
        <div className="lg:col-span-8">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: expo, delay: PAGE_IN }}
            >
              <Eyebrow tone="dark">
                {index} · {label}
              </Eyebrow>
            </motion.div>
          )}
          <h1 className={`display text-[clamp(3rem,8.4vw,7.25rem)] text-white ${eyebrow ? 'mt-6' : ''}`}>
            <LineReveal onLoad delay={PAGE_IN + 0.05} lines={lines} />
          </h1>
        </div>
        {(intro || aside) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: expo, delay: PAGE_IN + 0.3 }}
            className="lg:col-span-4 lg:pb-3"
          >
            {intro && <p className="text-lg leading-relaxed text-navy-100 sm:text-xl">{intro}</p>}
            {aside}
          </motion.div>
        )}
      </div>
    </Banner>
  )
}
