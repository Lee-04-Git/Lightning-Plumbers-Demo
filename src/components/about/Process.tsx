import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { expo } from '../ui/motion'
import { Eyebrow, LineReveal } from '../ui/primitives'

const steps = [
  {
    title: 'Get in touch',
    text: 'Call, send a WhatsApp message or use the enquiry form with a short description of the job.',
  },
  {
    title: 'Assessment & quotation',
    text: 'Your plumbing or geyser requirements are assessed and you receive a quotation.',
  },
  {
    title: 'The work gets done',
    text: 'Once you’re happy to go ahead, the installation or maintenance work is carried out.',
  },
]

/** Three steps joined by a pipe that fills as you scroll. */
export function Process() {
  const stepsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 85%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <section aria-labelledby="how-title" className="bg-mist-100 py-24 sm:py-32">
      <div ref={stepsRef} className="container-site">
        <Eyebrow>How a job works</Eyebrow>
        <h2 id="how-title" className="display mt-5 text-[clamp(2.6rem,5.4vw,4.5rem)] text-navy-950">
          <LineReveal lines={['Three steps', 'to sorted.']} />
        </h2>
        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute top-[1.625rem] right-0 left-7 hidden h-[6px] rounded-full bg-mist-200 ring-1 ring-mist-300 md:block"
          >
            <motion.div
              style={{ scaleX: fill }}
              className="h-full origin-left rounded-full bg-linear-to-r from-wave-300 to-wave-500"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute top-7 bottom-7 left-[1.5625rem] w-[6px] rounded-full bg-mist-200 ring-1 ring-mist-300 md:hidden"
          >
            <motion.div
              style={{ scaleY: fill }}
              className="h-full origin-top rounded-full bg-linear-to-b from-wave-300 to-wave-500"
            />
          </div>
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: expo, delay: i * 0.12 }}
                className="flex gap-5 md:block"
              >
                <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-[3px] border-navy-950 bg-mist-50 font-mono font-semibold text-navy-950 ring-[6px] ring-mist-100">
                  0{i + 1}
                </span>
                <div className="md:mt-7 md:pr-6">
                  <h3 className="text-[1.75rem] leading-tight font-extrabold tracking-[-0.03em] text-navy-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-steel-600">{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
