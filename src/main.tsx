import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// After a new deploy, an open tab may ask for page files that no longer exist. Reload once to get the current site.
window.addEventListener('vite:preloadError', (event) => {
  try {
    if (sessionStorage.getItem('pir-reloaded-for-update')) return
    sessionStorage.setItem('pir-reloaded-for-update', '1')
  } catch {
    return
  }
  event.preventDefault()
  window.location.reload()
})
// once a page has rendered fine, allow a future update to reload again
window.addEventListener('load', () => {
  setTimeout(() => {
    try {
      sessionStorage.removeItem('pir-reloaded-for-update')
    } catch {
      // ignore
    }
  }, 10000)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
