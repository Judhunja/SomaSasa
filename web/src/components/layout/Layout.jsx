/**
 * Main Layout Component for SomaNow
 * Responsive layout with navigation
 */

import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useI18n } from '../../contexts/I18nContext'
import Header from './Header'
import Navigation from './Navigation'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { t } = useI18n()
  
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [location])

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-kenya-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kenya-red mx-auto mb-4"></div>
          <p className="text-kenya-brown">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  // Public routes that don't need authentication
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/about', '/contact']
  const isPublicRoute = publicRoutes.includes(location.pathname)

  // Redirect to login if not authenticated and not on public route
  if (!user && !isPublicRoute) {
    navigate('/login', { replace: true })
    return null
  }

  const isDashboard = location.pathname.startsWith('/dashboard')
  const isLanding = location.pathname === '/'

  return (
    <div className="min-h-screen bg-kenya-cream">
      {/* Header */}
      <Header 
        onMenuClick={() => setSidebarOpen(true)}
        showMenu={isDashboard}
      />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar Navigation (Dashboard only) */}
        {isDashboard && (
          <>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
              </div>
            )}

            {/* Sidebar */}
            <div className={`
              fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <Navigation onItemClick={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* Main Content */}
        <div className={`flex-1 ${isDashboard ? 'lg:ml-0' : ''}`}>
          <main className={`
            ${isDashboard ? 'p-4 lg:p-6' : ''}
            ${isLanding ? '' : 'pt-16'}
            min-h-screen
          `}>
            <Outlet />
          </main>
        </div>
      </div>

      {/* Footer (not on dashboard) */}
      {!isDashboard && <Footer />}

      {/* Mobile Navigation (Dashboard only) */}
      {isDashboard && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
          <div className="grid grid-cols-4 py-2">
            <button
              onClick={() => navigate('/dashboard')}
              className={`flex flex-col items-center py-2 px-1 ${
                location.pathname === '/dashboard' 
                  ? 'text-kenya-red' 
                  : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs">{t('nav.dashboard')}</span>
            </button>

            <button
              onClick={() => navigate('/dashboard/lessons')}
              className={`flex flex-col items-center py-2 px-1 ${
                location.pathname.startsWith('/dashboard/lessons') 
                  ? 'text-kenya-red' 
                  : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-xs">{t('nav.lessons')}</span>
            </button>

            <button
              onClick={() => navigate('/dashboard/circles')}
              className={`flex flex-col items-center py-2 px-1 ${
                location.pathname.startsWith('/dashboard/circles') 
                  ? 'text-kenya-red' 
                  : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs">{t('nav.circles')}</span>
            </button>

            <button
              onClick={() => navigate('/dashboard/profile')}
              className={`flex flex-col items-center py-2 px-1 ${
                location.pathname.startsWith('/dashboard/profile') 
                  ? 'text-kenya-red' 
                  : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">{t('nav.profile')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
