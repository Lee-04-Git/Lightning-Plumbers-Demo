import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects, services, type Img, type ServiceId } from '../../config/site'
import { expo } from '../ui/motion'
import { Photo } from '../ui/primitives'

/** A job photo, framed on its subject. */
const shot = (slug: string, img: number, position = '50% 50%'): Img => ({
  ...projects.find((p) => p.slug === slug)!.images[img],
  position,
})

/** Three of the business's own photos per service: [front, left, right]. */
const stacks: Record<ServiceId, Img[]> = {
  electrical: [
    shot('geyser-relocation', 0, '30% 45%'),
    shot('geyser-relocation', 1),
    shot('solar-maitland', 2, '45% 60%'),
  ],
  solar: [shot('solar-diepriver', 0, '50% 45%'), shot('solar-maitland', 0, '60% 20%'), shot('solar-surrey', 0, '50% 40%')],
  maintenance: [shot('kitchen-tap', 0, '45% 55%'), shot('burst-seapoint', 0, '50% 45%'), shot('outdoor-sink', 0)],
}

const order: ServiceId[] = ['electrical', 'solar', 'maintenance']

/** Rotation/offset of the two back prints once fanned out, and how far they spread on hover. */
const fan = [
  { rotate: -8, x: '-9%', hover: 'group-hover:-translate-x-[6%] group-hover:-rotate-4' },
  { rotate: 7, x: '9%', hover: 'group-hover:translate-x-[6%] group-hover:rotate-4' },
]

function PhotoPrint({ img, className = '' }: { img: Img; className?: string }) {
  return (
    <div
      className={`size-full overflow-hidden rounded-[1.25rem] border-[6px] border-white bg-white shadow-[0_24px_50px_-24px_rgb(10_27_48/0.55)] ${className}`}
    >
      <Photo
        {...img}
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 35vw, 60vw"
        className="size-full rounded-[0.85rem] object-cover contrast-[1.05] saturate-[1.1]"
      />
    </div>
  )
}

/**
 * The core services as rows, one above the other: a fanned stack of real job prints on one side
 * and that service's details beside it, alternating sides. The prints fan out as each row scrolls
 * into view, spread further on hover, and the front print lifts.
 */
export function ServicePanels() {
  const panels = order.map((id) => services.find((s) => s.id === id)!)

  return (
    <ol className="mt-14 border-t border-navy-950/10 lg:mt-20">
      {panels.map((s, i) => {
        const [front, ...back] = stacks[s.id]
        const flip = i % 2 === 1
        return (
          <motion.li
            key={s.id}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.3 }}
            className="border-b border-navy-950/10"
          >
            <Link
              to={`/services#${s.id}`}
              className="group grid items-center gap-9 py-12 sm:gap-10 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20"
            >
              {/* the stack */}
              <div className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
                <div className="relative mx-auto aspect-[4/5] w-[56%] max-w-[15rem] sm:w-[46%] sm:max-w-[18rem] lg:w-[64%]">
                  {back.map((img, b) => (
                    <motion.div
                      key={img.base}
                      aria-hidden="true"
                      variants={{
                        hidden: { rotate: 0, x: '0%', opacity: 0 },
                        shown: {
                          rotate: fan[b].rotate,
                          x: fan[b].x,
                          opacity: 1,
                          transition: { duration: 1, ease: expo, delay: 0.25 + b * 0.06 },
                        },
                      }}
                      className="absolute inset-0"
                    >
                      <PhotoPrint
                        img={{ ...img, alt: '' }}
                        className={`transition-transform duration-700 ease-out-expo ${fan[b].hover}`}
                      />
                    </motion.div>
                  ))}
                  <motion.div
                    variants={{
                      hidden: { y: 40, opacity: 0 },
                      shown: { y: 0, opacity: 1, transition: { duration: 0.9, ease: expo } },
                    }}
                    className="absolute inset-0"
                  >
                    <PhotoPrint
                      img={front}
                      className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-3 group-hover:scale-[1.03]"
                    />
                  </motion.div>
                </div>
              </div>

              {/* details */}
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  shown: { y: 0, opacity: 1, transition: { duration: 0.8, ease: expo, delay: 0.15 } },
                }}
                className={`max-sm:text-center lg:col-span-6 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}
              >
                <p className="flex items-center gap-3 text-sm font-semibold text-brand-600 max-sm:justify-center">
                  <span className="font-mono">0{i + 1}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-brand-600/40" />
                  {s.short}
                </p>
                <h3 className="mt-4 text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.02] font-extrabold tracking-[-0.04em] text-navy-950 transition-colors duration-300 group-hover:text-brand-600">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-950/85 max-sm:mx-auto max-sm:mt-4">{s.body}</p>
                <p className="mt-3 max-w-xl leading-relaxed text-steel-600 max-sm:hidden">{s.detail}</p>
                <span className="mt-7 inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-navy-950 max-sm:mt-6 max-sm:flex max-sm:min-h-14 max-sm:w-full max-sm:justify-between max-sm:rounded-full max-sm:py-2 max-sm:pr-2 max-sm:pl-6 max-sm:ring-1 max-sm:ring-navy-950/15">
                  Explore {s.short.toLowerCase()}
                  <span className="flex size-10 items-center justify-center rounded-full bg-signal-500 transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </span>
              </motion.div>
            </Link>
          </motion.li>
        )
      })}
    </ol>
  )
}
