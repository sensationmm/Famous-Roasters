import './index.css'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: parseFloat(process.env.REACT_APP_SENTRY_TRACE_SAMPLE_RATE || ''),
})

const container = document.getElementById('root') as Element
const root = createRoot(container)
if (process.env.NODE_ENV === 'development') {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  root.render(<App />)
}
