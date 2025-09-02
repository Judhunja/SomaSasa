/**
 * Profile Page - Placeholder
 */

import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useI18n } from '../../contexts/I18nContext'

export default function ProfilePage() {
  const { user } = useAuth()
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-8">
        <h1 className="text-2xl font-bold text-kenya-brown mb-6">
          {t('nav.profile')}
        </h1>
        
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-kenya-green rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {user?.full_name || user?.email}
            </h2>
            <p className="text-gray-600 capitalize">{user?.role}</p>
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p>{t('pages.comingSoon')}</p>
        </div>
      </div>
    </div>
  )
}
