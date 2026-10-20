import { motion, type HTMLMotionProps } from 'framer-motion'
import { Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { WORK_WIDTHS } from '../../config/site'
import { expo } from './motion'

/** Small fade-and-lift for supporting content (8–16px). */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: expo, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Headline lines slide up from behind a mask. Each entry is one line, so wraps stay intentional. */
export function LineReveal({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  onLoad = false,
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  onLoad?: boolean
}) {
  const trigger = onLoad ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.6 } }
  return (
    <motion.span initial="hidden" {...trigger} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 0.95, ease: expo, delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/**
 * Image wipes up into view (clip-path) while its contents settle from a slight zoom.
 * The in-view trigger sits on an unclipped wrapper: Chrome's IntersectionObserver
 * treats a fully clipped element as invisible, so it would never fire.
 */
export function ClipReveal({
  children,
  className = '',
  delay = 0,
  onLoad = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  onLoad?: boolean
}) {
  const trigger = onLoad ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.25 } }
  return (
    <motion.div
      initial="hidden"
      {...trigger}
      className={className.split(' ').includes('absolute') ? className : `relative ${className}`}
    >
      <motion.div
        variants={{
          hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease: expo, delay } },
        }}
        className="absolute inset-0 overflow-hidden rounded-[inherit] bg-mist-200"
      >
        <motion.div
          className="size-full"
          variants={{ hidden: { scale: 1.15 }, show: { scale: 1, transition: { duration: 1.5, ease: expo, delay } } }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** Mono eyebrow with a short "pipe" leading into it. */
export function Eyebrow({
  children,
  tone = 'light',
  className = '',
}: {
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <p className={`label flex items-center gap-3 ${tone === 'dark' ? 'text-signal-300' : 'text-brand-600'} ${className}`}>
      <span aria-hidden="true" className="relative h-[3px] w-8 rounded-full bg-current">
        <span className="absolute -top-[3px] -right-[3px] size-[9px] rounded-full border-2 border-current bg-transparent" />
      </span>
      {children}
    </p>
  )
}

/** Hand-drawn style stroke that draws itself under a word. */
export function Underline({ delay = 0, onLoad = false, className = '' }: { delay?: number; onLoad?: boolean; className?: string }) {
  const trigger = onLoad ? { animate: { pathLength: 1 } } : { whileInView: { pathLength: 1 }, viewport: { once: true } }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -bottom-[0.08em] left-0 h-[0.22em] w-full overflow-visible ${className}`}
    >
      <motion.path
        d="M3 15 C 60 5, 120 5, 170 12 S 260 20, 297 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        {...trigger}
        transition={{ duration: 1.1, ease: expo, delay }}
      />
    </svg>
  )
}

/** Wavy section edge, so colour blocks meet like a waterline instead of a hard cut. */
export function WaveEdge({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 h-8 w-full sm:h-12 ${flip ? 'top-0 rotate-180' : 'top-px -translate-y-full'} ${className}`}
    >
      <path fill="currentColor" d="M0 36 C 240 0, 420 0, 720 30 S 1200 60, 1440 22 V60 H0 Z" />
    </svg>
  )
}

export function Stars({ rating = 5, className = '' }: { rating?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`size-4 ${i < rating ? 'fill-signal-400 text-signal-400' : 'text-mist-300'}`}
        />
      ))}
    </span>
  )
}

/** Responsive WebP image produced by scripts/optimize-images.mjs */
export function Photo({
  base,
  widths = WORK_WIDTHS,
  alt,
  sizes,
  className,
  position,
  priority = false,
}: {
  base: string
  widths?: number[]
  alt: string
  sizes: string
  className?: string
  position?: string
  priority?: boolean
}) {
  const largest = widths[widths.length - 1]
  return (
    <img
      src={`${base}-${widths[Math.min(1, widths.length - 1)]}.webp`}
      srcSet={widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      width={largest}
      height={Math.round(largest * 1.333)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  )
}
