export type Variant = 'accent' | 'navy' | 'outline' | 'outline-light' | 'light' | 'whatsapp'

// Each variant pairs a base colour with a hover colour that fills up from the
// bottom (a background-size transition), like water rising in a pipe.
const variants: Record<Variant, string> = {
  accent:
    'bg-signal-500 text-navy-950 bg-linear-to-t from-navy-950 to-navy-950 hover:text-white shadow-[0_12px_28px_-12px_rgb(247_108_30/0.65)] hover:shadow-[0_14px_30px_-12px_rgb(10_27_48/0.5)]',
  navy: 'bg-navy-950 text-white bg-linear-to-t from-signal-500 to-signal-500 hover:text-navy-950',
  outline:
    'text-navy-950 ring-[1.5px] ring-inset ring-navy-950/80 bg-linear-to-t from-navy-950 to-navy-950 hover:text-white',
  'outline-light':
    'text-white ring-[1.5px] ring-inset ring-white/50 bg-linear-to-t from-white to-white hover:text-navy-950 hover:ring-white',
  light: 'bg-white text-navy-950 bg-linear-to-t from-navy-950 to-navy-950 hover:text-white',
  whatsapp:
    'bg-whatsapp text-navy-950 bg-linear-to-t from-whatsapp-dark to-whatsapp-dark shadow-[0_12px_28px_-14px_rgb(31_180_87/0.8)]',
}

export const buttonClass = (variant: Variant = 'navy', size: 'md' | 'lg' = 'md') =>
  `group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-display font-semibold whitespace-nowrap bg-no-repeat bg-bottom bg-size-[100%_0%] hover:bg-size-[100%_100%] transition-[background-size,color,box-shadow,transform] duration-500 ease-out-expo active:scale-[0.97] ${
    size === 'lg' ? 'min-h-14 px-7 text-[1.0625rem]' : 'min-h-11 px-5 text-[0.9375rem]'
  } ${variants[variant]}`
