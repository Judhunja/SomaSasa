/**
 * Main App Component for SomaNow
 * AI-powered learning platform for Kenya
 */

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { I18nProvider } from './contexts/I18nContext'
import Layout from './components/layout/Layout'

// Import pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import LessonsPage from './pages/dashboard/LessonsPage'
import ProgressPage from './pages/dashboard/ProgressPage'
import CirclesPage from './pages/dashboard/CirclesPage'
import ProfilePage from './pages/dashboard/ProfilePage'
import SettingsPage from './pages/dashboard/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import IntegrationTestPage from './pages/IntegrationTestPage'
import TestPage from './pages/TestPage'

export default function App() {
  console.log('🏗️ SomaNow: App component rendering...')
  
  // Unregister any existing service workers and clear cache
  useEffect(() => {
    console.log('🔧 SomaNow: Setting up service worker cleanup...')
    const clearPWACache = async () => {
      // Unregister all service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        for(let registration of registrations) {
          registration.unregister()
          console.log('Service worker unregistered:', registration)
        }
      }
      
      // Clear all caches
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(cacheName => {
            console.log('Deleting cache:', cacheName)
            return caches.delete(cacheName)
          })
        )
      }
      
      // Remove any PWA-related DOM elements that might be lingering
      const existingNotifications = document.querySelectorAll('[class*="offline"], [class*="update"], [class*="pwa"]')
      existingNotifications.forEach(el => el.remove())
    }
    
    clearPWACache()
  }, [])

  console.log('🎨 SomaNow: Rendering app structure...')

  return (
    <I18nProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Public routes */}
                <Route index element={<HomePage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignUpPage />} />
                  
                  {/* Dashboard routes */}
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="dashboard/lessons" element={<LessonsPage />} />
                  <Route path="dashboard/progress" element={<ProgressPage />} />
                  <Route path="dashboard/circles" element={<CirclesPage />} />
                  <Route path="dashboard/profile" element={<ProfilePage />} />
                  <Route path="dashboard/settings" element={<SettingsPage />} />
                  
                  {/* Test route for integration testing */}
                  <Route path="test" element={<IntegrationTestPage />} />
                  
                  {/* Simple test route for debugging */}
                  <Route path="simple-test" element={<TestPage />} />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </div>
          </Router>
      </AuthProvider>
    </I18nProvider>
  )
}


