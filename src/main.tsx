import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Portfolio from './Portfolio.tsx'

const location = new URL(window.location.href)
if (!location.hash && location.searchParams.get('capture') === 'shelter') {
  location.hash = 'project/shelter'
  window.history.replaceState(null, '', location)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
)
