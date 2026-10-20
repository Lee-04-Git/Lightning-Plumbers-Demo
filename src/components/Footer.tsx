import { ArrowUp, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navLinks, site } from '../config/site'
import { defaultWhatsAppMessage, mailtoHref, telHref, whatsappHref } from '../lib/contact'
import { smoothScrollTo } from '../lib/scroll'
import { Wordmark } from './Header'
import { FacebookIcon, WhatsAppIcon } from './ui/Icons'
import { WaveEdge } from './ui/primitives'

const year = new Date().getFullYear()


export function Footer() {
  return (
    <footer className="relative">
      <div className="relative bg-navy-950 pt-16 pb-28 text-navy-300 lg:pb-10">
        <WaveEdge className="text-navy-950" />
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="group inline-block" aria-label={`${site.name}: home`}>
              <Wordmark tone="dark" logo={false} />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed">{site.description}</p>
                          <p className="label mt-4 text-navy-300/80">
                Based in {site.location.suburb}, {site.location.area}
              </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="label text-signal-400">Explore</p>
            <ul className="mt-4 grid gap-1">
              {navLinks.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="group inline-flex min-h-10 items-center gap-2 font-medium text-mist-50 transition-colors hover:text-signal-300"
                  >
                    <span className="h-px w-0 bg-signal-400 transition-[width] duration-300 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

                      <div className="lg:col-span-4">
              <p className="label text-signal-400">Get in touch</p>
              <ul className="mt-4 grid gap-1 text-mist-50">
                <li>
                  <a href={telHref} className="inline-flex min-h-10 items-center gap-3 font-medium hover:text-signal-300">
                    <Phone aria-hidden="true" className="size-4 text-signal-400" />
                    {site.phone.display}
                  </a>
                </li>
                <li>
                  <a
                    href={mailtoHref}
                    className="inline-flex min-h-10 items-center gap-3 font-medium [overflow-wrap:anywhere] hover:text-signal-300"
                  >
                    <Mail aria-hidden="true" className="size-4 shrink-0 text-signal-400" />
                    {site.email.address}
                  </a>
                </li>
              </ul>
              <ul aria-label="Social" className="mt-6 flex items-center gap-3">
                {[
                  {
                    href: site.facebook.url,
                    label: 'Lightning Plumbers on Facebook',
                    icon: <FacebookIcon className="size-5" />,
                    tone: 'bg-[#1877f2] hover:shadow-[0_10px_24px_-8px_rgb(24_119_242/0.8)]',
                  },
                  {
                    href: whatsappHref(defaultWhatsAppMessage),
                    label: 'Chat with Lightning Plumbers on WhatsApp',
                    icon: <WhatsAppIcon className="size-5" />,
                    tone: 'bg-whatsapp text-navy-950 hover:shadow-[0_10px_24px_-8px_rgb(37_211_102/0.8)]',
                  },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in a new tab)`}
                      className={`flex size-12 items-center justify-center rounded-full text-white ring-4 ring-white/5 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:scale-105 active:scale-95 ${s.tone}`}
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
        </div>

        <div className="container-site mt-14 flex flex-col gap-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>
              © {year} {site.name}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => smoothScrollTo(0)}
            className="group inline-flex min-h-11 cursor-pointer items-center gap-3 self-start text-mist-50 sm:self-auto"
          >
            Back to top
            <span className="flex size-10 items-center justify-center rounded-full ring-1 ring-mist-50/25 transition-[transform,background-color] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:bg-signal-500 group-hover:ring-brand-500">
              <ArrowUp aria-hidden="true" className="size-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
