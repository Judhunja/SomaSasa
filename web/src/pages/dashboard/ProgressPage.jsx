/**
 * Progress Page - Placeholder
 */

import React from 'react'
import { useI18n } from '../../contexts/I18nContext'

export default function ProgressPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-kenya-brown mb-4">
          {t('nav.progress')}
        </h1>
        <p className="text-gray-600 mb-4">
          {t('pages.comingSoon')}
        </p>
        <div className="w-16 h-16 bg-kenya-yellow rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
