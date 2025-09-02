/**
 * Navigation Component for SomaNow
 * Sidebar navigation for dashboard pages
 */

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useI18n } from '../../contexts/I18nContext'

export default function Navigation({ onItemClick }) {
  const location = useLocation()
  const { user } = useAuth()
  const { t } = useI18n()

  const navItems = [
    {
      name: t('nav.dashboard'),
      href: '/dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      current: location.pathname === '/dashboard'
    },
    {
      name: t('nav.lessons'),
      href: '/dashboard/lessons',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      current: location.pathname.startsWith('/dashboard/lessons')
    },
    {
      name: t('nav.progress'),
      href: '/dashboard/progress',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      current: location.pathname.startsWith('/dashboard/progress')
    },
    {
      name: t('nav.circles'),
      href: '/dashboard/circles',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      current: location.pathname.startsWith('/dashboard/circles')
    }
  ]

  // Add mentor-specific items
  if (user?.role === 'mentor') {
    navItems.push({
      name: t('nav.mentoring'),
      href: '/dashboard/mentoring',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      current: location.pathname.startsWith('/dashboard/mentoring')
    })
  }

  // Add admin-specific items
  if (user?.role === 'admin') {
    navItems.push(
      {
        name: t('nav.analytics'),
        href: '/dashboard/analytics',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        current: location.pathname.startsWith('/dashboard/analytics')
      },
      {
        name: t('nav.management'),
        href: '/dashboard/management',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        current: location.pathname.startsWith('/dashboard/management')
      }
    )
  }

  // Add AI Tutor for all users
  navItems.push({
    name: t('nav.aiTutor'),
    href: '/dashboard/ai-tutor',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    current: location.pathname.startsWith('/dashboard/ai-tutor')
  })

  // Add settings at the bottom
  navItems.push({
    name: t('nav.settings'),
    href: '/dashboard/settings',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    current: location.pathname.startsWith('/dashboard/settings')
  })

  return (
    <nav className="flex-1 px-2 py-4 space-y-1">
      {/* User info */}
      <div className="mb-6 px-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-kenya-green rounded-full flex items-center justify-center">
            <span className="text-white font-medium">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {user?.full_name || user?.email}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation items */}
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          onClick={onItemClick}
          className={`
            group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150
            ${item.current
              ? 'bg-kenya-cream text-kenya-red'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }
          `}
        >
          <span className={`mr-3 ${item.current ? 'text-kenya-red' : 'text-gray-400 group-hover:text-gray-500'}`}>
            {item.icon}
          </span>
          {item.name}
        </Link>
      ))}

      {/* Quick stats */}
      <div className="mt-8 px-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          {t('dashboard.quickStats')}
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('dashboard.lessonsCompleted')}</span>
            <span className="font-medium text-kenya-red">12</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('dashboard.studyStreak')}</span>
            <span className="font-medium text-kenya-green">5 {t('common.days')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('dashboard.averageScore')}</span>
            <span className="font-medium text-kenya-yellow">85%</span>
          </div>
        </div>
      </div>

      {/* Help section */}
      <div className="mt-8 px-3">
        <Link
          to="/dashboard/help"
          className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
          onClick={onItemClick}
        >
          <svg className="mr-3 w-6 h-6 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t('nav.help')}
        </Link>
      </div>
    </nav>
  )
}
