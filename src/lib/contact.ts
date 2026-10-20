import { site, type ServiceId } from '../config/site'

export const telHref = `tel:${site.phone.tel}`

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${site.whatsapp.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}


export const mailtoHref = `mailto:${site.email.address}`

export function mailHref(subject: string, body: string) {
  return `mailto:${site.email.address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const defaultWhatsAppMessage = 'Hi, I would like to enquire about your plumbing services.'

/** A service the quote form can be pre-filled with, via /contact?service=… */
export type PrefillId = ServiceId | 'other'

export const quoteHref = (service?: PrefillId) => (service ? `/contact?service=${service}` : '/contact')
