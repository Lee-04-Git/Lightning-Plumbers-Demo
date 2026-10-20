import { ArrowUpRight, ChevronRight, Mail, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { EnquiryForm } from '../components/contact/EnquiryForm'
import { PageHero } from '../components/layout/PageHero'
import { PageShell } from '../components/layout/PageShell'
import { buttonClass } from '../components/ui/buttonClass'
import { WhatsAppIcon } from '../components/ui/Icons'
import { Reveal } from '../components/ui/primitives'
import { site } from '../config/site'
import { defaultWhatsAppMessage, mailtoHref, telHref, whatsappHref } from '../lib/contact'

/** One contact detail: icon, label and a large tappable value. */
function DetailRow({ href, icon, label, value }: { href: string; icon: ReactNode; label: string; value: string }) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-center gap-4 rounded-2xl p-4 transition-colors duration-200 hover:bg-white sm:gap-5 sm:p-5"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-steel-500">{label}</span>
          <span className="mt-0.5 block font-display text-[clamp(1.25rem,2.4vw,1.625rem)] leading-tight font-bold tracking-[-0.02em] break-normal text-navy-950">
            {/* long email addresses wrap before the @, never mid-word */}
            {value.includes('@') ? (
              <>
                {value.slice(0, value.indexOf('@'))}
                <wbr />
                {value.slice(value.indexOf('@'))}
              </>
            ) : (
              value
            )}
          </span>
        </span>
        <ChevronRight
          aria-hidden="true"
          className="size-5 shrink-0 text-steel-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-navy-950"
        />
      </a>
    </li>
  )
}

export default function ContactPage() {
  return (
    <PageShell path="/contact">
      <PageHero
        banner="contact"
        next="text-mist-50"
        index="05"
        label="Contact"
        lines={[
          'Ready Whenever',
          <span key="t" className="text-signal-400">
            You Need.
          </span>,
        ]}
        intro="Call, email or send a WhatsApp message. Tell us what's going on and the job can be assessed and quoted."
      />

      <section aria-label="Contact details and enquiry form" className="bg-mist-50 py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <h2 className="label text-brand-600">Contact details</h2>
            <ul className="-mx-4 mt-4 grid gap-1 sm:-mx-5">
              <DetailRow
                href={telHref}
                icon={<Phone aria-hidden="true" className="size-5" />}
                label="Phone"
                value={site.phone.display}
              />
              <DetailRow
                href={mailtoHref}
                icon={<Mail aria-hidden="true" className="size-5" />}
                label="Email"
                value={site.email.address}
              />
            </ul>

            <div className="mt-8 rounded-3xl bg-[#e8f9ef] p-6 ring-1 ring-whatsapp/25 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-whatsapp text-navy-950">
                  <WhatsAppIcon className="size-6" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold tracking-[-0.02em] text-navy-950">Prefer WhatsApp?</p>
                  <p className="text-steel-600">Chat with us directly, from your phone or computer.</p>
                </div>
              </div>
              <a
                href={whatsappHref(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass('whatsapp', 'lg')} mt-6 w-full`}
              >
                <WhatsAppIcon className="size-5" />
                Open WhatsApp chat
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
