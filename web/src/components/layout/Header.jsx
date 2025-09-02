/**
 * Header Component for SomaNow
 * Main header with navigation and user controls
 */

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useI18n } from '../../contexts/I18nContext'

export default function Header({ onMenuClick, showMenu = true }) {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { t, currentLocale, changeLocale, getAvailableLocales } = useI18n()
  
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const availableLocales = getAvailableLocales()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            {showMenu && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-kenya-red"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}

            {/* Logo */}
            <Link to="/" className="flex items-center ml-2 lg:ml-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-kenya-red rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SN</span>
                </div>
                <span className="ml-2 text-xl font-bold text-kenya-brown hidden sm:block">
                  SomaNow
                </span>
              </div>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-kenya-red"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {availableLocales.map((locale) => (
                    <button
                      key={locale.code}
                      onClick={() => {
                        changeLocale(locale.code)
                        setShowLanguageMenu(false)
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currentLocale === locale.code
                          ? 'bg-kenya-cream text-kenya-red'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {locale.nativeName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-kenya-red"
                >
                  <div className="w-8 h-8 bg-kenya-green rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.full_name || user.email}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>
                    
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      {t('nav.profile')}
                    </Link>
                    
                    <Link
                      to="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      {t('nav.settings')}
                    </Link>
                    
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t('auth.signOut')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-kenya-brown hover:text-kenya-red text-sm font-medium"
                >
                  {t('auth.signIn')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-kenya-red hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  {t('auth.signUp')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showUserMenu || showLanguageMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false)
            setShowLanguageMenu(false)
          }}
        />
      )}
    </header>
  )
}
