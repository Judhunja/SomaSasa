import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('🚀 SomaNow: Starting application...')

// Force clear any lingering PWA caches immediately
const forceClearPWAData = async () => {
  try {
    console.log('🧹 SomaNow: Clearing PWA cache...')
    // Clear all caches
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      for (const cacheName of cacheNames) {
        await caches.delete(cacheName)
        console.log('Cleared cache:', cacheName)
      }
    }
    
    // Clear localStorage and sessionStorage related to PWA and old app name
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.includes('pwa') || key.includes('offline') || key.includes('cache') || key.includes('elimu'))) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
      console.log('Removed localStorage key:', key)
    })
    
    // Remove any lingering offline/PWA notifications from DOM
    const pwaNotes = document.querySelectorAll('[data-pwa], [data-offline], .offline-notice, .update-notice')
    pwaNotes.forEach(el => el.remove())
    console.log('✅ SomaNow: Cache clearing completed')
  } catch (error) {
    console.log('Cache clearing completed with minor issues:', error)
  }
}

// Run cache clearing before app starts
forceClearPWAData()

// Hide loading screen when React app is ready
document.documentElement.classList.add('app-ready')

console.log('🎯 SomaNow: Mounting React app...')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

console.log('✅ SomaNow: React app mounted successfully!')
