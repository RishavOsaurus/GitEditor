import React, { useState, useEffect } from 'react'
import './App.css'

interface IconProps {
  className?: string
}

const GithubIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)

const SunIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
)

const MoonIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
)

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (saved === 'light' || saved === 'dark') return saved
    } catch (err) {
      void err
    }
    return 'dark'
  })

  const applyTheme = (t: 'light' | 'dark') => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(t)
    if (typeof window !== 'undefined') document.documentElement.setAttribute('data-theme', t)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    applyTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch (err) {
      void err
    }
  }

  const genState = (): string => {
    try {
      const arr = new Uint8Array(16)
      window.crypto.getRandomValues(arr)
      return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('')
    } catch {
      // fallback
      return Math.random().toString(36).slice(2)
    }
  }

  const handleGithubSignIn = () => {
    const clientId = (import.meta.env.VITE_GITHUB_CLIENT_ID as string) || ''
    const redirectUri = (import.meta.env.VITE_GITHUB_REDIRECT_URI as string) || `${window.location.origin}`
    const scope = 'read:user user:email'
    const state = genState()
    try { localStorage.setItem('oauth_state', state) } catch (err) { void err }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope,
      state,
      allow_signup: 'true'
    })

    window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`
  }

  useEffect(() => {
    // Apply current theme on mount and whenever it changes
    applyTheme(theme)
  }, [theme])

  return (
    <div className="fill-screen-hero flex min-h-screen w-full transition-colors duration-500 bg-gray-50 dark:bg-gray-900">
      <button
        onClick={toggleTheme}
        className="theme-toggle absolute top-6 right-6 z-50 p-2 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg transition-transform hover:scale-110 active:scale-95 group"
        aria-label="Toggle Theme"
      >
        {theme === 'light' ? (
          <MoonIcon className="w-6 h-6 text-gray-800 group-hover:text-indigo-600 transition-colors" />
        ) : (
          <SunIcon className="w-6 h-6 text-yellow-400 group-hover:text-yellow-200 transition-colors" />
        )}
      </button>

      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 md:px-16 relative overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob dark:bg-purple-900 dark:mix-blend-lighten"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:bg-yellow-900 dark:mix-blend-lighten"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:bg-pink-900 dark:mix-blend-lighten"></div>

        <div className="relative z-10 w-full max-w-md animate-fade-in-up">
          <div className="mb-10 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-6">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">Welcome back</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Join thousands of developers building the future. Sign in to access your dashboard.</p>
          </div>

          <div className="mt-8 space-y-6">
            <button
              type="button"
              onClick={handleGithubSignIn}
              className="github-signin-button group relative flex w-full justify-center items-center gap-3 py-4 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#24292F] dark:focus:ring-offset-gray-900 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl shadow-md"
            >
              <GithubIcon className="h-6 w-6 group-hover:animate-bounce" />
              <span className="text-lg">Sign in with GitHub</span>
            </button>

            <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
              By signing in, you agree to our{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 underline decoration-indigo-400/30 underline-offset-4">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 underline decoration-indigo-400/30 underline-offset-4">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 lg:w-1/2 transition-all duration-500">
        <div className="absolute inset-0 bg-linear-to-l from-transparent to-gray-50/20 dark:to-gray-900/40 z-10" />
        <img
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out hover:scale-105 transform"
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Abstract 3D Shape"
        />

        <div className="absolute bottom-10 left-10 right-10 z-20 backdrop-blur-sm bg-white/10 dark:bg-black/20 p-6 rounded-2xl border border-white/20 shadow-2xl">
          <p className="text-white text-lg font-medium italic">"Software is a great combination between artistry and engineering."</p>
          <p className="text-white/80 text-sm mt-2 font-bold uppercase tracking-wider">— Bill Gates</p>
        </div>
      </div>
    </div>
    )
  }

  export default App
