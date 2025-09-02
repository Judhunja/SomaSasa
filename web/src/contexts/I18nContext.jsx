/**
 * I18n Context for SomaNow
 * Provides internationalization capabilities across the app
 */

import React, { createContext, useContext, useEffect, useState } from 'react'
import i18n from '../lib/i18n'

const I18nContext = createContext({})

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function I18nProvider({ children }) {
  console.log('🌐 SomaNow: I18nProvider initializing...')
  const [currentLocale, setCurrentLocale] = useState('en')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('🌐 SomaNow: Loading saved locale...')
    // Load saved locale from localStorage
    const saved = localStorage.getItem('soma_now_locale')
    if (saved && ['en', 'sw'].includes(saved)) {
      console.log('🌐 SomaNow: Found saved locale:', saved)
      setCurrentLocale(saved)
    } else {
      console.log('🌐 SomaNow: Using default locale: en')
    }
    setIsLoading(false)
  }, [])
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    loadLocale(currentLocale)
  }, [currentLocale])

  // Load translations for a locale
  async function loadLocale(locale) {
    if (translations[locale]) {
      i18n.setLocale(locale)
      return
    }

    setIsLoading(true)
    
    try {
      const newTranslations = await i18n.loadTranslations(locale)
      setTranslations(prev => ({
        ...prev,
        [locale]: newTranslations
      }))
      
      i18n.setLocale(locale)
      localStorage.setItem('soma_now_locale', locale)
    } catch (error) {
      console.error(`Failed to load locale ${locale}:`, error)
      // Fallback to English if loading fails
      if (locale !== 'en') {
        await loadLocale('en')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Change locale
  async function changeLocale(locale) {
    if (locale === currentLocale) return
    
    setCurrentLocale(locale)
    await loadLocale(locale)
    
    // Trigger page re-render for direction change
    if (getTextDirection(locale) !== getTextDirection(currentLocale)) {
      document.documentElement.dir = getTextDirection(locale)
    }
  }

  // Get text direction for locale
  function getTextDirection(locale) {
    // Add RTL languages here if needed
    const rtlLocales = []
    return rtlLocales.includes(locale) ? 'rtl' : 'ltr'
  }

  // Translation function with interpolation
  function t(key, params = {}) {
    return i18n.t(key, params)
  }

  // Pluralization function
  function plural(key, count, params = {}) {
    return i18n.plural(key, count, { ...params, count })
  }

  // Format date according to locale
  function formatDate(date, options = {}) {
    return i18n.formatDate(date, options)
  }

  // Format number according to locale
  function formatNumber(number, options = {}) {
    return i18n.formatNumber(number, options)
  }

  // Format currency (Kenyan Shilling)
  function formatCurrency(amount) {
    return i18n.formatCurrency(amount)
  }

  // Format relative time
  function formatRelativeTime(date) {
    return i18n.formatRelativeTime(date)
  }

  // Get available locales
  function getAvailableLocales() {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' }
    ]
  }

  // Get current locale info
  function getCurrentLocaleInfo() {
    const locales = getAvailableLocales()
    return locales.find(l => l.code === currentLocale) || locales[0]
  }

  // Validate translation key exists
  function hasTranslation(key) {
    return i18n.hasKey(key)
  }

  // Get all translations for current locale (for debugging)
  function getTranslations() {
    return translations[currentLocale] || {}
  }

  // Educational content helpers
  function getSubjectName(subjectKey) {
    return t(`subjects.${subjectKey}`, { fallback: subjectKey })
  }

  function getGradeName(gradeKey) {
    return t(`grades.${gradeKey}`, { fallback: gradeKey })
  }

  function getLessonTypeName(typeKey) {
    return t(`lessonTypes.${typeKey}`, { fallback: typeKey })
  }

  function getDifficultyName(difficultyKey) {
    return t(`difficulty.${difficultyKey}`, { fallback: difficultyKey })
  }

  // Kenya-specific helpers
  function getCountyName(countyKey) {
    return t(`counties.${countyKey}`, { fallback: countyKey })
  }

  function getLanguageName(langKey) {
    return t(`languages.${langKey}`, { fallback: langKey })
  }

  // Progress and achievement helpers
  function getProgressDescription(progress) {
    if (progress >= 90) return t('progress.excellent')
    if (progress >= 70) return t('progress.good')
    if (progress >= 50) return t('progress.fair')
    return t('progress.needsImprovement')
  }

  function getAchievementName(achievementKey) {
    return t(`achievements.${achievementKey}.name`, { fallback: achievementKey })
  }

  function getAchievementDescription(achievementKey) {
    return t(`achievements.${achievementKey}.description`, { fallback: '' })
  }

  // Time-based greetings
  function getTimeBasedGreeting() {
    const hour = new Date().getHours()
    
    if (hour < 12) return t('greetings.morning')
    if (hour < 17) return t('greetings.afternoon')
    return t('greetings.evening')
  }

  // Accessibility helpers
  function getScreenReaderText(key, params = {}) {
    return t(`screenReader.${key}`, params)
  }

  // Error message helpers
  function getErrorMessage(errorKey, context = {}) {
    return t(`errors.${errorKey}`, context)
  }

  // Form validation helpers
  function getValidationMessage(field, rule, params = {}) {
    return t(`validation.${field}.${rule}`, params)
  }

  // Navigation helpers
  function getPageTitle(page) {
    const title = t(`pages.${page}.title`, { fallback: page })
    const appName = t('app.name')
    return `${title} - ${appName}`
  }

  function getBreadcrumb(page) {
    return t(`pages.${page}.breadcrumb`, { fallback: t(`pages.${page}.title`, { fallback: page }) })
  }

  // Status message helpers
  function getStatusMessage(status, context = {}) {
    return t(`status.${status}`, context)
  }

  // Action confirmation helpers
  function getConfirmationMessage(action, item = '') {
    return t(`confirmations.${action}`, { item })
  }

  // Notification helpers
  function getNotificationMessage(type, context = {}) {
    return t(`notifications.${type}`, context)
  }

  const value = {
    // State
    currentLocale,
    isLoading,
    translations,
    
    // Core functions
    t,
    plural,
    changeLocale,
    
    // Formatting
    formatDate,
    formatNumber,
    formatCurrency,
    formatRelativeTime,
    
    // Locale info
    getAvailableLocales,
    getCurrentLocaleInfo,
    getTextDirection: () => getTextDirection(currentLocale),
    
    // Utilities
    hasTranslation,
    getTranslations,
    
    // Educational helpers
    getSubjectName,
    getGradeName,
    getLessonTypeName,
    getDifficultyName,
    
    // Kenya-specific helpers
    getCountyName,
    getLanguageName,
    
    // Progress helpers
    getProgressDescription,
    getAchievementName,
    getAchievementDescription,
    
    // UI helpers
    getTimeBasedGreeting,
    getScreenReaderText,
    getErrorMessage,
    getValidationMessage,
    getPageTitle,
    getBreadcrumb,
    getStatusMessage,
    getConfirmationMessage,
    getNotificationMessage
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}
