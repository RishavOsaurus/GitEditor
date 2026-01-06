import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Runtime check for Vite env vars — warn if important values are missing.
const env = import.meta.env as Record<string, unknown>
const apiUrl = env.VITE_API_URL as string | undefined
const ghClientId = env.VITE_GITHUB_CLIENT_ID as string | undefined
if (!apiUrl) {
 
  console.warn('VITE_API_URL is not set. The client may not be able to reach the backend.')
}
if (!ghClientId) {

  console.warn('VITE_GITHUB_CLIENT_ID is not set. OAuth login will not work.')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
