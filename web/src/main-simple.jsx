import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

console.log('🚀 SomaNow: Starting simple app...')

// Hide loading screen immediately
document.documentElement.classList.add('app-ready')

console.log('🎯 SomaNow: Mounting React app...')

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

console.log('✅ SomaNow: React app mounted!')
