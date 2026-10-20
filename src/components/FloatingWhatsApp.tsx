import { motion } from 'framer-motion'
import { defaultWhatsAppMessage, whatsappHref } from '../lib/contact'
import { WhatsAppIcon } from './ui/Icons'
import { expo } from './ui/motion'

/**
 * WhatsApp shortcut, always visible on every page and screen size. It sits above the
 * page-transition overlay so it never disappears, and sits beside the mobile quick-contact bar.
 */
export function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappHref(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: expo, delay: 0.8 }}
      className="group fixed in-data-[menu=open]:hidden right-4 bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+0.25rem)] z-[85] flex items-center rounded-full bg-whatsapp p-1 text-navy-950 shadow-[0_16px_36px_-12px_rgb(31_180_87/0.7)] ring-4 ring-mist-50/80 transition-[padding] duration-500 ease-out-expo active:scale-95 sm:right-6 lg:bottom-6 lg:p-1.5 lg:hover:pr-5"
    >
      <span className="flex size-12 items-center justify-center">
        <WhatsAppIcon className="size-6" />
      </span>
      <span className="hidden grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-out-expo group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] lg:grid">
        <span className="overflow-hidden font-display font-semibold whitespace-nowrap">Chat on WhatsApp</span>
      </span>
    </motion.a>
  )
}
