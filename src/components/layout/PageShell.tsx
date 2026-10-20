import { motion, useIsPresent, useReducedMotion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { navLinks, site, type NavPath } from '../../config/site'
import { expo } from '../ui/motion'

/** Wavy edge that leads the water as it rises and falls. */
function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`absolute inset-x-0 h-14 w-full text-navy-900 sm:h-20 ${flip ? 'top-full rotate-180' : 'bottom-full'}`}
    >
      <path fill="currentColor" d="M0 48 C 180 8, 360 8, 540 40 S 900 80, 1080 44 S 1320 8, 1440 32 V80 H0 Z" />
    </svg>
  )
}

/**
 * Wraps each page. On leave, navy "water" rises up to fill the screen; on
 * arrival it keeps rising and drains off the top, revealing the new page with
 * its name on the way. Reduced-motion users get a plain cross-fade.
 */
export function PageShell({ path, children }: { path: NavPath | '404'; children: ReactNode }) {
  const reduce = useReducedMotion()
  // Keep both overlays hidden while idle: the cover only shows while this page is leaving,
  // the reveal hides itself once it has drained away.
  const isPresent = useIsPresent()
  const [revealed, setRevealed] = useState(false)
  const index = navLinks.findIndex((l) => l.path === path)
  const link = navLinks[index]

  useEffect(() => {
    document.title = link ? `${link.title} | ${site.name}` : `Page not found | ${site.name}`
  }, [link])

  return (
    <>
      <motion.div
        className="bg-mist-100"
        initial={{ opacity: reduce ? 0 : 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: reduce ? 0 : 1 }}
        transition={{ duration: reduce ? 0.25 : 0.6 }}
      >
        {children}
      </motion.div>

      {!reduce && (
        <>
          {/* reveal: the water drains upward off the new page */}
          <motion.div
            aria-hidden="true"
            initial={{ y: '0%' }}
            animate={{ y: '-115%' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
            onAnimationComplete={() => setRevealed(true)}
            className={`pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-navy-900 ${revealed ? 'invisible' : ''}`}
          >
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: expo, delay: 0.1 }}
              className="text-center"
            >
              <p className="label text-signal-400">{index >= 0 ? `0${index + 1}` : '404'}</p>
              <p className="mt-2 font-display text-5xl font-extrabold tracking-[-0.045em] text-mist-50 sm:text-7xl">
                {link?.label ?? 'Not found'}
              </p>
            </motion.div>
            <Wave flip />
          </motion.div>

          {/* cover: the water rises over the old page as you leave */}
          <motion.div
            aria-hidden="true"
            initial={{ y: '115%' }}
            animate={{ y: '115%' }}
            exit={{ y: '0%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className={`pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-navy-900 ${isPresent ? 'invisible' : ''}`}
          >
            <Wave />
          </motion.div>
        </>
      )}
    </>
  )
}
