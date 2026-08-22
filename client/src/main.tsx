import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AccessibilityProvider } from './contexts/AccessibilityContext.tsx'
import { SpeechProvider } from './contexts/SpeechContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccessibilityProvider>
      <SpeechProvider>
        <App />
      </SpeechProvider>
    </AccessibilityProvider>
  </React.StrictMode>,
)
