/**
 * PWA Install Prompt Component
 * Prompts users to install the PWA
 */

import React, { useState } from 'react'
import { useI18n } from '../../contexts/I18nContext'
import { installApp } from '../../lib/pwa'

export default function PWAInstallPrompt({ onDismiss }) {
  const { t } = useI18n()
  const [isInstalling, setIsInstalling] = useState(false)

  const handleInstall = async () => {
    try {
      setIsInstalling(true)
      const success = await installApp()
      if (success) {
        onDismiss()
      }
    } catch (error) {
      console.error('Install failed:', error)
    } finally {
      setIsInstalling(false)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 lg:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-kenya-red rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">EH</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {t('pwa.installTitle')}
            </h3>
            <p className="text-xs text-gray-500">
              {t('pwa.installDescription')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-500 p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="bg-kenya-red hover:bg-red-700 disabled:bg-red-400 text-white px-3 py-1 rounded text-sm font-medium"
          >
            {isInstalling ? t('pwa.installing') : t('pwa.install')}
          </button>
        </div>
      </div>
    </div>
  )
}
