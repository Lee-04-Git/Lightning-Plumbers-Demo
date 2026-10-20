import { Link } from 'react-router-dom'
import { projects, site } from '../../config/site'
import { defaultWhatsAppMessage, whatsappHref } from '../../lib/contact'
import { buttonClass } from '../ui/buttonClass'
import { WhatsAppIcon } from '../ui/Icons'
import { Photo, Reveal } from '../ui/primitives'

/** The photo shown in the WhatsApp chat preview. */
const chatPhoto = projects.find((p) => p.slug === 'kitchen-tap')!.images[0]

/** Call-to-action: send a photo of your job on WhatsApp for quick assessment and quote. */
export function SendPhotoSection() {
  return (
    <section className="bg-mist-100 py-20 sm:py-28">
      <div className="container-site">
        <Reveal>
          <div className="relative grid items-center gap-12 overflow-hidden rounded-[2rem] bg-[#e8f9ef] px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:px-16">
            {/* soft green glow for depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-whatsapp/20 blur-3xl"
            />

            <div className="relative lg:col-span-7">
              <h3 className="display text-[clamp(2.25rem,4.4vw,3.75rem)] text-navy-950">
                Got a job that looks
                <br className="max-sm:hidden" /> like one of these?
              </h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-steel-600">
                Snap a photo of yours and send it on WhatsApp. It's the quickest way to show what's going on, and the
                job can be assessed and quoted.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <a
                  href={whatsappHref(defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass('whatsapp', 'lg')}
                >
                  <WhatsAppIcon className="size-5" />
                  Send a photo on WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center font-display font-semibold text-navy-950 underline decoration-whatsapp-dark decoration-2 underline-offset-[6px] transition-colors hover:text-brand-600 hover:decoration-brand-600"
                >
                  Or send an enquiry
                </Link>
              </div>
            </div>

            {/* what you'd send: a little WhatsApp chat preview */}
            <div aria-hidden="true" className="relative lg:col-span-5">
              <div className="mx-auto w-full max-w-[20rem] rotate-2 overflow-hidden rounded-[1.75rem] bg-[#efeae2] shadow-[0_30px_60px_-30px_rgb(10_27_48/0.45)] ring-1 ring-black/5 transition-transform duration-500 ease-out-expo hover:rotate-0 lg:mr-0">
                <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/15">
                    <WhatsAppIcon className="size-4" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold">{site.name}</span>
                    <span className="block text-xs text-white/75">{site.phone.display}</span>
                  </span>
                </div>
                <div className="space-y-2 p-4">
                  <div className="ml-auto w-[85%] rounded-xl rounded-tr-sm bg-[#d9fdd3] p-1.5 shadow-sm">
                    <div className="aspect-[4/3] overflow-hidden rounded-lg">
                      <Photo {...chatPhoto} alt="" widths={[480]} sizes="260px" className="size-full object-cover" />
                    </div>
                    <p className="px-1.5 pt-2 pb-0.5 text-[0.8125rem] leading-snug text-navy-950">
                      {defaultWhatsAppMessage}
                    </p>
                    <p className="px-1.5 text-right text-[0.6875rem] text-steel-500">
                      now <span className="text-[#53bdeb]">✓✓</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
