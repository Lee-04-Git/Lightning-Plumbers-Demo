import { Link } from 'react-router-dom'
import { Banner } from '../components/layout/Banner'
import { PageShell } from '../components/layout/PageShell'
import { buttonClass } from '../components/ui/buttonClass'
import { Eyebrow } from '../components/ui/primitives'

export default function NotFoundPage() {
  return (
    <PageShell path="404">
      <Banner image="home" next="text-navy-950">
        <div className="container-site flex min-h-[70vh] flex-col items-start justify-center py-24">
          <Eyebrow tone="dark">404</Eyebrow>
          <h1 className="display mt-5 text-[clamp(3rem,9vw,7rem)] text-white">
            This pipe leads <span className="text-signal-400">nowhere.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-navy-100">
            The page you’re after doesn’t exist. Let’s get you back on track.
          </p>
          <Link to="/" className={`${buttonClass('accent', 'lg')} mt-8`}>
            Back to home
          </Link>
        </div>
      </Banner>
    </PageShell>
  )
}
