import { AnimatePresence, MotionConfig } from 'framer-motion'
import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { MobileActionBar } from './components/MobileActionBar'
import { PageErrorBoundary } from './components/PageErrorBoundary'
import { scrollToTop } from './lib/scroll'
import HomePage from './pages/HomePage'

// Inner pages are split into their own chunks
const pages = {
  about: () => import('./pages/AboutPage'),
  services: () => import('./pages/ServicesPage'),
  showcase: () => import('./pages/ShowcasePage'),
  contact: () => import('./pages/ContactPage'),
  notFound: () => import('./pages/NotFoundPage'),
}
const AboutPage = lazy(pages.about)
const ServicesPage = lazy(pages.services)
const ShowcasePage = lazy(pages.showcase)
const ContactPage = lazy(pages.contact)
const NotFoundPage = lazy(pages.notFound)


export default function App() {
  const location = useLocation()
  // Warm the page chunks shortly after load so navigation stays instant
  useEffect(() => {
    const warm = () => Object.values(pages).forEach((load) => load())
    const id = setTimeout(warm, 1200)
    return () => clearTimeout(id)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-navy-950 px-4 py-2 font-medium text-mist-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        {/* Wait for the old page's water to fill the screen, then jump to the top before the new page drains in. */}
        <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
          <PageErrorBoundary key={location.pathname}>
            <Suspense fallback={<div className="min-h-svh bg-navy-900" />}>
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/showcase" element={<ShowcasePage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Old URLs from the previous version of the site */}
                <Route path="/projects" element={<Navigate to="/showcase" replace />} />
                <Route path="/testimonials" element={<Navigate to="/about" replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </PageErrorBoundary>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileActionBar />
      <FloatingWhatsApp />
    </MotionConfig>
  )
}
