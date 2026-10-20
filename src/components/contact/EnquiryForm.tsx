import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, ChevronDown, Mail, Pencil } from 'lucide-react'
import { useId, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { moreServices, services, site } from '../../config/site'
import { mailHref, whatsappHref, type PrefillId } from '../../lib/contact'
import { buttonClass } from '../ui/buttonClass'
import { WhatsAppIcon } from '../ui/Icons'
import { ease } from '../ui/motion'

type Channel = 'whatsapp' | 'email'
type Values = { name: string; phone: string; service: string; message: string }
type Errors = Partial<Record<keyof Values, string>>

const OTHER = 'Something else / not sure'
const options = [...services.map((s) => s.title), ...moreServices.map((m) => m.title), OTHER]
const empty: Values = { name: '', phone: '', service: '', message: '' }

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  const digits = v.phone.replace(/[^\d]/g, '')
  if (!digits) e.phone = 'Please enter a contact number.'
  else if (digits.length < 9 || digits.length > 13 || /[^\d\s()+-]/.test(v.phone))
    e.phone = 'Please enter a valid number, e.g. 082 123 4567.'
  if (!v.service) e.service = 'Please choose a service.'
  if (v.message.trim().length < 10) e.message = 'Please add a few words about the job.'
  return e
}

const compose = (v: Values) =>
  [
    `Hi ${site.name}, I'd like to enquire about a job.`,
    '',
    `Name: ${v.name.trim()}`,
    `Contact number: ${v.phone.trim()}`,
    `Service: ${v.service}`,
    '',
    v.message.trim(),
  ].join('\n')

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-1.5 overflow-hidden pt-1.5 text-sm text-red-700"
        >
          <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

/**
 * Enquiry form with no backend: it writes the message out and opens WhatsApp or the visitor's
 * email app with it, ready to send. It says plainly that nothing is sent until they press Send.
 */
export function EnquiryForm() {
  const uid = useId()
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [sentTo, setSentTo] = useState<Channel | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  // /contact?service=solar pre-selects a service; ?service=other&about=Blocked%20drains picks that service
  const [params] = useSearchParams()
  const key = `${params.get('service')}|${params.get('about')}`
  const [applied, setApplied] = useState<string | null>(null)
  if (key !== applied) {
    setApplied(key)
    const prefill = params.get('service') as PrefillId | null
    const about = params.get('about')
    const title =
      (about && options.find((o) => o === about)) ||
      (prefill === 'other' ? OTHER : services.find((s) => s.id === prefill)?.title)
    if (title) setValues((v) => ({ ...v, service: title }))
  }

  const set = <K extends keyof Values>(k: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [k]: value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const hrefFor = (channel: Channel) =>
    channel === 'whatsapp'
      ? whatsappHref(compose(values))
      : mailHref(`Enquiry: ${values.service || 'plumbing'}`, compose(values))

  const send = (channel: Channel) => {
    const found = validate(values)
    setErrors(found)
    const first = (Object.keys(found) as (keyof Values)[])[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const url = hrefFor(channel)
    if (channel === 'whatsapp') {
      const win = window.open(url, '_blank', 'noopener,noreferrer')
      if (!win) window.location.assign(url)
    } else {
      window.location.assign(url)
    }
    setSentTo(channel)
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    send('whatsapp')
  }

  const field = (k: keyof Values) => ({
    id: `${uid}-${k}`,
    name: k,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${uid}-${k}-error` : undefined,
  })
  const input = (k: keyof Values) =>
    `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-navy-950 placeholder:text-steel-500/70 transition-[border-color,box-shadow] focus:outline-none focus:ring-4 ${
      errors[k]
        ? 'border-red-500 focus:ring-red-500/15'
        : 'border-mist-300 hover:border-steel-500 focus:border-brand-500 focus:ring-brand-400/20'
    }`
  const labelClass = 'text-sm font-semibold text-navy-950'

  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgb(10_27_48/0.05),0_30px_60px_-40px_rgb(10_27_48/0.35)] ring-1 ring-navy-950/[0.06] sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sentTo ? (
          <motion.div
            key="status"
            ref={statusRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
            className="focus:outline-none"
          >
            <CheckCircle2 aria-hidden="true" className="size-12 text-whatsapp-dark" />
            <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-navy-950">
              Your message is ready in {sentTo === 'whatsapp' ? 'WhatsApp' : 'your email app'}
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-steel-600">
              It hasn’t been sent yet. Check it over and press <strong className="text-navy-950">Send</strong> there to
              reach {site.name}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={hrefFor(sentTo)}
                target={sentTo === 'whatsapp' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={buttonClass(sentTo === 'whatsapp' ? 'whatsapp' : 'navy')}
              >
                {sentTo === 'whatsapp' ? <WhatsAppIcon className="size-4" /> : <Mail aria-hidden="true" className="size-4" />}
                Open again
              </a>
              <button type="button" onClick={() => setSentTo(null)} className={buttonClass('outline')}>
                <Pencil aria-hidden="true" className="size-4" />
                Edit enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
            aria-labelledby={`${uid}-title`}
          >
            <h2 id={`${uid}-title`} className="text-[1.75rem] leading-tight font-bold tracking-[-0.03em] text-navy-950">
              Send an enquiry
            </h2>
            <p className="mt-2 text-steel-600">A few details and we can take a look at the job.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className={labelClass}>
                  Name
                </label>
                <input
                  {...field('name')}
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={input('name')}
                />
                <FieldError id={`${uid}-name-error`} message={errors.name} />
              </div>
              <div>
                <label htmlFor={`${uid}-phone`} className={labelClass}>
                  Contact number
                </label>
                <input
                  {...field('phone')}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="082 123 4567"
                  value={values.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  className={input('phone')}
                />
                <FieldError id={`${uid}-phone-error`} message={errors.phone} />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor={`${uid}-service`} className={labelClass}>
                Service
              </label>
              <div className="relative">
                <select
                  {...field('service')}
                  value={values.service}
                  onChange={(e) => set('service', e.target.value)}
                  className={`${input('service')} cursor-pointer appearance-none pr-11 ${values.service ? '' : 'text-steel-500'}`}
                >
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {options.map((o) => (
                    <option key={o} value={o} className="text-navy-950">
                      {o}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute top-[calc(50%+4px)] right-4 size-5 -translate-y-1/2 text-steel-500"
                />
              </div>
              <FieldError id={`${uid}-service-error`} message={errors.service} />
            </div>

            <div className="mt-5">
              <label htmlFor={`${uid}-message`} className={labelClass}>
                What’s going on?
              </label>
              <textarea
                {...field('message')}
                rows={4}
                placeholder="e.g. Our geyser is leaking and needs replacing. It’s in the roof."
                value={values.message}
                onChange={(e) => set('message', e.target.value)}
                className={`${input('message')} resize-y`}
              />
              <FieldError id={`${uid}-message-error`} message={errors.message} />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className={`${buttonClass('whatsapp', 'lg')} sm:flex-1`}>
                <WhatsAppIcon className="size-5" />
                Send via WhatsApp
              </button>
              <button type="button" onClick={() => send('email')} className={`${buttonClass('outline', 'lg')} sm:flex-1`}>
                <Mail aria-hidden="true" className="size-4" />
                Send via email
              </button>
            </div>
            <p className="mt-4 text-center text-sm text-steel-500">
              This opens WhatsApp or your email app with the message written out. Nothing is sent until you press Send.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
