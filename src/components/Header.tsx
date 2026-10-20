import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks, site } from '../config/site'
import { defaultWhatsAppMessage, mailtoHref, telHref, whatsappHref } from '../lib/contact'
import { lockScroll } from '../lib/scroll'
import { buttonClass } from './ui/buttonClass'
import { WhatsAppIcon } from './ui/Icons'
import { expo } from './ui/motion'

export function Wordmark({ tone, logo = true }: { tone: 'light' | 'dark'; logo?: boolean }) {
  const onDark = tone === 'dark'
  return (
    <span className="flex items-center gap-3">
      {logo && (
        <img
          src={onDark ? site.logo.white : site.logo.navy}
          alt=""
          width={44}
          height={44}
          className={`size-10 shrink-0 transition-all duration-700 ease-out-expo group-hover:rotate-[-18deg] sm:size-11 rounded-full object-cover ${onDark ? 'brightness-110 contrast-90' : 'brightness-100'}`}
        />
      )}
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.0625rem] font-extrabold tracking-[-0.02em] whitespace-nowrap uppercase transition-colors duration-300 ${onDark ? 'text-white' : 'text-navy-950'}`}
        >
          Lightning Plumbers
        </span>
      </span>
    </span>
  )
}

/** Two bars that morph into a cross */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-3 w-6">
      <motion.span
        className="absolute left-0 h-[2px] w-6 rounded-full bg-current"
        animate={open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }}
        transition={{ duration: 0.35, ease: expo }}
      />
      <motion.span
        className="absolute right-0 h-[2px] rounded-full bg-current"
        animate={open ? { top: 5, rotate: -45, width: 24 } : { top: 10, rotate: 0, width: 16 }}
        transition={{ duration: 0.35, ease: expo }}
      />
    </span>
  )
}

/** Desktop links: a green bar slides under the active page; others get a hover underline. */
function DesktopNav({ onDark }: { onDark: boolean }) {
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1 xl:gap-2">
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `group relative flex min-h-11 items-center px-3 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors duration-300 xl:px-4 ${
                  onDark
                    ? isActive
                      ? 'text-white'
                      : 'text-white/75 hover:text-white'
                    : isActive
                      ? 'text-navy-950'
                      : 'text-steel-600 hover:text-navy-950'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      className="absolute inset-x-3 bottom-1 h-[3px] rounded-full bg-signal-500 xl:inset-x-4"
                    />
                  ) : (
                    <span
                      className={`absolute inset-x-3 bottom-1 h-[2px] origin-left scale-x-0 rounded-full transition-transform duration-300 ease-out-expo group-hover:scale-x-100 xl:inset-x-4 ${
                        onDark ? 'bg-white/60' : 'bg-navy-950/30'
                      }`}
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Fixed header: transparent over each page's banner, a frosted white bar once you scroll. */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const menuButton = useRef<HTMLButtonElement>(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })

  // close the menu whenever the route changes
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const close = () => window.innerWidth >= 1024 && setOpen(false)
    lockScroll(true)
    // lets other fixed UI (the floating WhatsApp button) step aside while the menu is open
    document.body.dataset.menu = 'open'
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', close)
    return () => {
      lockScroll(false)
      delete document.body.dataset.menu
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', close)
    }
  }, [open])

  const onDark = open || !scrolled

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          open
            ? 'bg-navy-950'
            : scrolled
              ? 'bg-white/90 shadow-[0_1px_0_rgb(10_27_48/0.08),0_10px_30px_-18px_rgb(10_27_48/0.35)] backdrop-blur-xl'
              : 'bg-transparent'
        }`}
      >
        {/* soft shade so white text stays readable over bright banner photos */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-linear-to-b from-navy-950/55 to-transparent transition-opacity duration-300 ${
            scrolled || open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div className="container-site flex h-[4.75rem] items-center justify-between gap-4">
          <Link to="/" aria-label={`${site.name}: home`} className="group rounded-sm">
            <Wordmark tone={onDark ? 'dark' : 'light'} />
          </Link>

          <DesktopNav onDark={onDark} />

          <div className="flex shrink-0 items-center gap-3 lg:hidden">
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`inline-flex size-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${
                onDark ? 'bg-white/10 text-white ring-1 ring-white/25 backdrop-blur' : 'bg-navy-950 text-white'
              }`}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>

        {/* scroll progress, once the bar is solid */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-signal-500 transition-opacity duration-300 ${
            scrolled && !open ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </header>
      {/* Portalled: the header's backdrop-filter would otherwise become the panel's containing block */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.35, ease: expo } }}
              transition={{ duration: 0.6, ease: expo }}
              className="fixed inset-x-0 top-[4.75rem] bottom-0 z-[55] overflow-y-auto bg-navy-950 lg:hidden"
            >
              <nav aria-label="Mobile" className="container-site relative flex min-h-full flex-col pt-4 pb-24">
                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
                >
                  {navLinks.map((link, i) => (
                    <li key={link.path} className="overflow-hidden border-b border-white/10">
                      <motion.div
                        variants={{
                          hidden: { y: '100%' },
                          show: { y: '0%', transition: { duration: 0.7, ease: expo } },
                        }}
                      >
                        <NavLink
                          to={link.path}
                          end={link.path === '/'}
                          onClick={() => setOpen(false)}
                          className="group flex items-center justify-between py-4"
                        >
                          {({ isActive }) => (
                            <>
                              <span className="flex items-baseline gap-4">
                                <span className="label text-navy-300">0{i + 1}</span>
                                <span
                                  className={`font-display text-[2.25rem] leading-none font-extrabold tracking-[-0.04em] transition-colors ${isActive ? 'text-signal-400' : 'text-white group-active:text-signal-300'}`}
                                >
                                  {link.label}
                                </span>
                              </span>
                              {isActive ? (
                                <span aria-hidden="true" className="size-2.5 rounded-full bg-signal-500" />
                              ) : (
                                <ArrowRight aria-hidden="true" className="size-5 text-navy-300" />
                              )}
                            </>
                          )}
                        </NavLink>
                      </motion.div>
                    </li>
                  ))}
                </motion.ul>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.35, ease: expo, duration: 0.6 } }}
                  className="mt-auto grid gap-3 pt-10"
                >
                  <a
                    href={whatsappHref(defaultWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass('whatsapp', 'lg')}
                  >
                    <WhatsAppIcon className="size-5" />
                    Chat on WhatsApp
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <a href={telHref} className={buttonClass('outline-light', 'lg')}>
                      <Phone aria-hidden="true" className="size-4" />
                      Call
                    </a>
                    <a href={mailtoHref} className={buttonClass('outline-light', 'lg')}>
                      <Mail aria-hidden="true" className="size-4" />
                      Email
                    </a>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
