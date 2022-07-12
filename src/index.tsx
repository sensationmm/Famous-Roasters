import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

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
