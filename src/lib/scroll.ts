/** Native scrolling only: no scroll hijacking. CSS `scroll-behavior` handles smoothness. */

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' })
}

export function smoothScrollTo(top: number) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduce ? 'instant' : 'smooth' })
}

/** Scroll to an in-page anchor, leaving room for the sticky header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 96)
}

/** Freeze page scrolling behind menus and dialogs, without the page jumping sideways. */
export function lockScroll(locked: boolean) {
  const gap = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = locked ? 'hidden' : ''
  document.body.style.paddingRight = locked && gap > 0 ? `${gap}px` : ''
}
