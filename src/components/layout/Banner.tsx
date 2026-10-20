import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { BANNER_WIDTHS, banners, type BannerKey } from '../../config/site'
import { expo } from '../ui/motion'

/**
 * Full-bleed photo banner that opens every page. The fixed header floats over it, so content
 * starts below the header. A wave at the bottom flows into the next section's colour.
 */
export function Banner({
  image,
  children,
  next = 'text-mist-100',
  tall = false,
}: {
  image: BannerKey
  children: ReactNode
  /** Text colour class matching the next section's background, for the wave edge. */
  next?: string
  tall?: boolean
}) {
  const img = banners[image]
  const largest = BANNER_WIDTHS[BANNER_WIDTHS.length - 1]
  return (
    <section
      className={`relative isolate overflow-hidden bg-navy-950 text-white ${tall ? 'min-h-[92svh] lg:min-h-svh' : ''}`}
    >
      <motion.img
        src={img.base.includes('-background') ? `${img.base}.jpg` : `${img.base}-${BANNER_WIDTHS[0]}.webp`}
        srcSet={img.base.includes('-background') ? undefined : BANNER_WIDTHS.map((w) => `${img.base}-${w}.webp ${w}w`).join(', ')}
        sizes="100vw"
        alt={img.alt}
        width={largest}
        height={Math.round((largest * 7) / 16)}
        fetchPriority="high"
        decoding="async"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: expo }}
        className="absolute inset-0 -z-20 size-full object-cover"
        style={img.position ? { objectPosition: img.position } : undefined}
      />
      {/* keeps the copy readable over any photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950/92 via-navy-950/70 to-navy-950/25"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-navy-950/60 to-transparent" />

      <div className={`relative pt-[4.75rem] ${tall ? 'flex min-h-[inherit] flex-col justify-end' : ''}`}>{children}</div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute inset-x-0 -bottom-px h-8 w-full sm:h-12 ${next}`}
      >
        <path fill="currentColor" d="M0 36 C 240 0, 420 0, 720 30 S 1200 60, 1440 22 V60 H0 Z" />
      </svg>
    </section>
  )
}
