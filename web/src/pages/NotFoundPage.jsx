/**
 * Not Found Page
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../contexts/I18nContext'

export default function NotFoundPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-kenya-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-kenya-red rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-4xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold text-kenya-brown mb-4">
          {t('errors.pageNotFound')}
        </h1>
        <p className="text-gray-600 mb-8">
          {t('errors.pageNotFoundDescription')}
        </p>
        <Link
          to="/"
          className="bg-kenya-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium inline-block"
        >
          {t('common.goHome')}
        </Link>
      </div>
    </div>
  )
}
