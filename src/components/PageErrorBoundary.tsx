import { Component, type ReactNode } from 'react'
import { buttonClass } from './ui/buttonClass'

const RELOAD_KEY = 'pir-reloaded-for-update'

/** True when a lazily loaded page file couldn't be fetched (usually an old copy of the site after an update). */
const isChunkError = (error: unknown) =>
  error instanceof Error &&
  /dynamically imported module|Importing a module script failed|Failed to fetch|error loading dynamically|ChunkLoadError/i.test(
    `${error.name} ${error.message}`,
  )

/**
 * Catches a page that fails to load or render, so visitors never get a blank screen.
 * If the cause is an out-of-date page file, it reloads once to fetch the current version.
 */
export class PageErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    if (!isChunkError(error)) return
    try {
      if (!sessionStorage.getItem(RELOAD_KEY)) {
        sessionStorage.setItem(RELOAD_KEY, '1')
        window.location.reload()
      }
    } catch {
      // storage unavailable: show the fallback instead of risking a reload loop
    }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <section className="flex min-h-svh items-center bg-navy-950 pt-[4.75rem] text-white">
        <div className="container-site py-24">
          <h1 className="display text-[clamp(2.5rem,6vw,4.5rem)]">This page didn’t load.</h1>
          <p className="mt-5 max-w-md text-lg text-navy-100">
            The website may have just been updated. Reloading usually fixes it.
          </p>
          <button type="button" onClick={() => window.location.reload()} className={`${buttonClass('accent', 'lg')} mt-8`}>
            Reload the page
          </button>
        </div>
      </section>
    )
  }
}
