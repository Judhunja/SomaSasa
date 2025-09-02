/**
 * Internationalization (i18n) utilities for SomaNow
 * Supports English and Kiswahili with extensible architecture
 */

// Translation keys and texts
const translations = {
  en: {
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      continue: 'Continue',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      submit: 'Submit',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      refresh: 'Refresh',
      retry: 'Retry',
      share: 'Share',
      download: 'Download',
      upload: 'Upload'
    },

    // Navigation
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      lessons: 'Lessons',
      circles: 'Study Circles',
      tutor: 'AI Tutor',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      login: 'Login',
      register: 'Register'
    },

    // Home Page
    home: {
      hero: {
        title: 'Learn, Grow, Excel with SomaNow',
        subtitle: 'AI-powered education platform designed for Kenyan students. Access quality lessons, connect with peers, and get personalized AI tutoring support.'
      },
      cta: {
        getStarted: 'Get Started',
        learnMore: 'Learn More'
      },
      features: {
        title: 'Why Choose SomaNow?'
      }
    },

    // Authentication
    auth: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      forgotPassword: 'Forgot Password?',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      signUp: 'Sign Up',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      resetPassword: 'Reset Password',
      checkEmail: 'Check your email for reset instructions',
      invalidCredentials: 'Invalid email or password',
      accountCreated: 'Account created successfully!'
    },

    // Dashboard
    dashboard: {
      welcome: 'Welcome back',
      welcomeNew: 'Welcome to SomaNow',
      continuelearning: 'Continue Learning',
      recentLessons: 'Recent Lessons',
      myProgress: 'My Progress',
      studyCircles: 'My Study Circles',
      achievements: 'Achievements',
      streak: 'Day Streak',
      points: 'Points',
      lessonsCompleted: 'Lessons Completed',
      averageScore: 'Average Score'
    },

    // Lessons
    lessons: {
      allLessons: 'All Lessons',
      myLessons: 'My Lessons',
      subjects: 'Subjects',
      difficulty: 'Difficulty',
      duration: 'Duration',
      minutes: 'minutes',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      notStarted: 'Not Started',
      inProgress: 'In Progress',
      completed: 'Completed',
      startLesson: 'Start Lesson',
      continueLesson: 'Continue Lesson',
      reviewLesson: 'Review Lesson',
      lessonContent: 'Lesson Content',
      quiz: 'Quiz',
      assignment: 'Assignment',
      resources: 'Resources',
      objectives: 'Learning Objectives'
    },

    // Study Circles
    circles: {
      studyCircles: 'Study Circles',
      myCircles: 'My Circles',
      joinCircle: 'Join Circle',
      createCircle: 'Create Circle',
      circleName: 'Circle Name',
      circleDescription: 'Description',
      subject: 'Subject',
      gradeLevel: 'Grade Level',
      isPublic: 'Public Circle',
      maxMembers: 'Maximum Members',
      members: 'Members',
      moderator: 'Moderator',
      sendMessage: 'Send Message',
      typeMessage: 'Type your message...',
      joinedCircle: 'Joined circle successfully!',
      leftCircle: 'Left circle',
      messageSent: 'Message sent'
    },

    // AI Tutor
    tutor: {
      aiTutor: 'AI Tutor',
      askQuestion: 'Ask a Question',
      typeQuestion: 'Type your question here...',
      examples: 'Examples',
      suggestions: 'Suggestions',
      getHelp: 'Get Help',
      conversation: 'Conversation',
      clearChat: 'Clear Chat',
      newConversation: 'New Conversation',
      thinking: 'Thinking...',
      confidence: 'Confidence',
      relatedTopics: 'Related Topics'
    },

    // Profile
    profile: {
      myProfile: 'My Profile',
      editProfile: 'Edit Profile',
      personalInfo: 'Personal Information',
      learningPreferences: 'Learning Preferences',
      language: 'Language',
      gradeLevel: 'Grade Level',
      subjects: 'Subjects of Interest',
      goals: 'Learning Goals',
      statistics: 'Statistics',
      achievements: 'Achievements',
      profileUpdated: 'Profile updated successfully!'
    },

    // Offline
    offline: {
      offline: 'Offline',
      offlineMode: 'Offline Mode',
      noConnection: 'No internet connection',
      cachedContent: 'Viewing cached content',
      syncWhenOnline: 'Will sync when back online',
      offlineFeatures: 'Available Offline',
      viewLessons: 'View downloaded lessons',
      takeQuizzes: 'Take quizzes',
      viewProgress: 'View your progress',
      readMessages: 'Read cached messages'
    },

    // Subjects
    subjects: {
      mathematics: 'Mathematics',
      english: 'English Language', 
      kiswahili: 'Kiswahili',
      science: 'Science & Nature',
      socialStudies: 'Social Studies',
      financialLiteracy: 'Financial Literacy',
      digitalSkills: 'Digital Skills',
      entrepreneurship: 'Entrepreneurship',
      agriculture: 'Agriculture & Environment',
      health: 'Health & Life Skills'
    },

    // Error messages
    errors: {
      networkError: 'Network error. Please check your connection.',
      serverError: 'Server error. Please try again later.',
      notFound: 'Content not found.',
      unauthorized: 'You are not authorized to access this content.',
      validationError: 'Please check your input and try again.',
      fileUploadError: 'Failed to upload file. Please try again.',
      genericError: 'Something went wrong. Please try again.'
    },

    // Success messages
    success: {
      saved: 'Saved successfully!',
      updated: 'Updated successfully!',
      deleted: 'Deleted successfully!',
      submitted: 'Submitted successfully!',
      sent: 'Sent successfully!',
      synced: 'Synced successfully!'
    }
  },

  sw: {
    // Common - Kawaida
    common: {
      loading: 'Inapakia...',
      error: 'Hitilafu',
      success: 'Imefanikiwa',
      save: 'Hifadhi',
      cancel: 'Ghairi',
      continue: 'Endelea',
      back: 'Rudi',
      next: 'Ifuatayo',
      previous: 'Iliyotangulia',
      close: 'Funga',
      submit: 'Wasilisha',
      edit: 'Hariri',
      delete: 'Futa',
      confirm: 'Thibitisha',
      yes: 'Ndiyo',
      no: 'Hapana',
      search: 'Tafuta',
      filter: 'Chuja',
      sort: 'Panga',
      refresh: 'Onyesha upya',
      retry: 'Jaribu tena',
      share: 'Shiriki',
      download: 'Pakua',
      upload: 'Pakia'
    },

    // Navigation - Uongozaji
    nav: {
      home: 'Nyumbani',
      dashboard: 'Dashibodi',
      lessons: 'Masomo',
      circles: 'Vikundi vya Kusoma',
      tutor: 'Mwalimu wa AI',
      profile: 'Wasifu',
      settings: 'Mipangilio',
      logout: 'Toka',
      login: 'Ingia',
      register: 'Jisajili'
    },

    // Home Page - Ukurasa wa Nyumbani
    home: {
      hero: {
        title: 'Jifunze, Ukue, Stawi na SomaNow',
        subtitle: 'Jukwaa la elimu la AI lililotengenezwa kwa wanafunzi wa Kenya. Pata masomo bora, unganisha na wenzako, na upate msaada wa uongozaji wa kibinafsi wa AI.'
      },
      cta: {
        getStarted: 'Anza Sasa',
        learnMore: 'Jifunze Zaidi'
      },
      features: {
        title: 'Kwa Nini Uchague SomaNow?'
      }
    },

    // Authentication - Utambulisho
    auth: {
      email: 'Barua pepe',
      password: 'Nenosiri',
      confirmPassword: 'Thibitisha Nenosiri',
      fullName: 'Jina Kamili',
      phoneNumber: 'Nambari ya Simu',
      forgotPassword: 'Umesahau nenosiri?',
      dontHaveAccount: 'Huna akaunti?',
      alreadyHaveAccount: 'Una akaunti tayari?',
      signUp: 'Jisajili',
      signIn: 'Ingia',
      signOut: 'Toka',
      resetPassword: 'Weka nenosiri jipya',
      checkEmail: 'Angalia barua pepe yako kwa maelekezo',
      invalidCredentials: 'Barua pepe au nenosiri si sahihi',
      accountCreated: 'Akaunti imeundwa kwa mafanikio!'
    },

    // Dashboard - Dashibodi
    dashboard: {
      welcome: 'Karibu tena',
      welcomeNew: 'Karibu SomaNow',
      continuelearning: 'Endelea Kujifunza',
      recentLessons: 'Masomo ya Hivi Karibuni',
      myProgress: 'Maendeleo Yangu',
      studyCircles: 'Vikundi Vyangu vya Kusoma',
      achievements: 'Mafanikio',
      streak: 'Siku za Mfutatano',
      points: 'Alama',
      lessonsCompleted: 'Masomo Yaliyokamilika',
      averageScore: 'Wastani wa Alama'
    },

    // Lessons - Masomo
    lessons: {
      allLessons: 'Masomo Yote',
      myLessons: 'Masomo Yangu',
      subjects: 'Masomo',
      difficulty: 'Ugumu',
      duration: 'Muda',
      minutes: 'dakika',
      beginner: 'Mwanzo',
      intermediate: 'Wastani',
      advanced: 'Juu',
      notStarted: 'Haujaanza',
      inProgress: 'Unaendelea',
      completed: 'Umekamilika',
      startLesson: 'Anza Somo',
      continueLesson: 'Endelea na Somo',
      reviewLesson: 'Kagua Somo',
      lessonContent: 'Maudhui ya Somo',
      quiz: 'Jaribio',
      assignment: 'Kazi ya Nyumbani',
      resources: 'Rasilimali',
      objectives: 'Malengo ya Kujifunza'
    },

    // Study Circles - Vikundi vya Kusoma
    circles: {
      studyCircles: 'Vikundi vya Kusoma',
      myCircles: 'Vikundi Vyangu',
      joinCircle: 'Jiunge na Kikundi',
      createCircle: 'Unda Kikundi',
      circleName: 'Jina la Kikundi',
      circleDescription: 'Maelezo',
      subject: 'Somo',
      gradeLevel: 'Daraja',
      isPublic: 'Kikundi cha Umma',
      maxMembers: 'Wanachama wa Juu',
      members: 'Wanachama',
      moderator: 'Mkuu',
      sendMessage: 'Tuma Ujumbe',
      typeMessage: 'Andika ujumbe wako...',
      joinedCircle: 'Umejiunge na kikundi kwa mafanikio!',
      leftCircle: 'Umeacha kikundi',
      messageSent: 'Ujumbe umetumwa'
    },

    // AI Tutor - Mwalimu wa AI
    tutor: {
      aiTutor: 'Mwalimu wa AI',
      askQuestion: 'Uliza Swali',
      typeQuestion: 'Andika swali lako hapa...',
      examples: 'Mifano',
      suggestions: 'Mapendekezo',
      getHelp: 'Pata Msaada',
      conversation: 'Mazungumzo',
      clearChat: 'Futa Mazungumzo',
      newConversation: 'Mazungumzo Mapya',
      thinking: 'Ninafikiria...',
      confidence: 'Uhakika',
      relatedTopics: 'Mada Zinazohusiana'
    },

    // Profile - Wasifu
    profile: {
      myProfile: 'Wasifu Wangu',
      editProfile: 'Hariri Wasifu',
      personalInfo: 'Taarifa za Kibinafsi',
      learningPreferences: 'Mapendeleo ya Kujifunza',
      language: 'Lugha',
      gradeLevel: 'Daraja',
      subjects: 'Masomo ya Kipendeleo',
      goals: 'Malengo ya Kujifunza',
      statistics: 'Takwimu',
      achievements: 'Mafanikio',
      profileUpdated: 'Wasifu umesasishwa kwa mafanikio!'
    },

    // Offline - Bila mtandao
    offline: {
      offline: 'Bila Mtandao',
      offlineMode: 'Hali ya Bila Mtandao',
      noConnection: 'Hakuna muunganisho wa mtandao',
      cachedContent: 'Unaona maudhui yaliyohifadhiwa',
      syncWhenOnline: 'Itasawazishwa unapoungana tena',
      offlineFeatures: 'Zinapatikana Bila Mtandao',
      viewLessons: 'Ona masomo yaliyopakuliwa',
      takeQuizzes: 'Fanya majaribio',
      viewProgress: 'Ona maendeleo yako',
      readMessages: 'Soma ujumbe uliohifadhiwa'
    },

    // Subjects - Masomo
    subjects: {
      mathematics: 'Hisabati',
      english: 'Lugha ya Kiingereza',
      kiswahili: 'Kiswahili',
      science: 'Sayansi na Mazingira',
      socialStudies: 'Maarifa ya Jamii',
      financialLiteracy: 'Ujuzi wa Kifedha',
      digitalSkills: 'Ujuzi wa Kidijitali',
      entrepreneurship: 'Uongozi wa Biashara',
      agriculture: 'Kilimo na Mazingira',
      health: 'Afya na Ujuzi wa Maisha'
    },

    // Error messages - Ujumbe wa hitilafu
    errors: {
      networkError: 'Hitilafu ya mtandao. Tafadhali angalia muunganisho wako.',
      serverError: 'Hitilafu ya seva. Tafadhali jaribu tena baadaye.',
      notFound: 'Maudhui hayajapatikana.',
      unauthorized: 'Huna ruhusa ya kufikia maudhui haya.',
      validationError: 'Tafadhali angalia ingizo lako na ujaribu tena.',
      fileUploadError: 'Imeshindwa kupakia faili. Tafadhali jaribu tena.',
      genericError: 'Hitilafu imetokea. Tafadhali jaribu tena.'
    },

    // Success messages - Ujumbe wa mafanikio
    success: {
      saved: 'Imehifadhiwa kwa mafanikio!',
      updated: 'Imesasishwa kwa mafanikio!',
      deleted: 'Imefutwa kwa mafanikio!',
      submitted: 'Imewasilishwa kwa mafanikio!',
      sent: 'Imetumwa kwa mafanikio!',
      synced: 'Imesawazishwa kwa mafanikio!'
    }
  }
}

// Current language state
let currentLanguage = 'en'

// Get user's preferred language from various sources
function detectLanguage() {
  // 1. Check localStorage
  const saved = localStorage.getItem('soma-now-language')
  if (saved && translations[saved]) {
    return saved
  }

  // 2. Check browser language
  const browserLang = navigator.language || navigator.userLanguage
  if (browserLang.startsWith('sw')) {
    return 'sw'
  }

  // 3. Default to English
  return 'en'
}

// Initialize language
currentLanguage = detectLanguage()

/**
 * Translation function
 * @param {string} key - Translation key (e.g., 'common.loading')
 * @param {object} variables - Variables to interpolate
 * @returns {string} Translated text
 */
export function t(key, variables = {}) {
  const keys = key.split('.')
  let value = translations[currentLanguage]

  // Navigate through nested keys
  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) break
  }

  // Fallback to English if translation not found
  if (value === undefined) {
    value = translations.en
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }
  }

  // Final fallback to key itself
  if (value === undefined) {
    console.warn(`Translation missing: ${key}`)
    return key
  }

  // Interpolate variables
  if (typeof value === 'string' && Object.keys(variables).length > 0) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
      return variables[varName] || match
    })
  }

  return value
}

/**
 * Get current language
 * @returns {string} Current language code
 */
export function getCurrentLanguage() {
  return currentLanguage
}

/**
 * Set language
 * @param {string} lang - Language code ('en' or 'sw')
 */
export function setLanguage(lang) {
  if (!translations[lang]) {
    console.warn(`Language '${lang}' not supported`)
    return
  }

  currentLanguage = lang
  localStorage.setItem('soma-now-language', lang)
  
  // Update document language attribute
  document.documentElement.lang = lang

  // Trigger language change event
  window.dispatchEvent(new CustomEvent('languagechange', {
    detail: { language: lang }
  }))
}

/**
 * Get available languages
 * @returns {Array} Array of language objects
 */
export function getAvailableLanguages() {
  return [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' }
  ]
}

/**
 * Check if language is RTL (Right-to-Left)
 * @param {string} lang - Language code
 * @returns {boolean} True if RTL
 */
export function isRTL(lang = currentLanguage) {
  // Neither English nor Swahili are RTL, but this is here for future expansion
  const rtlLanguages = ['ar', 'he', 'fa', 'ur']
  return rtlLanguages.includes(lang)
}

/**
 * Format numbers according to locale
 * @param {number} number - Number to format
 * @param {object} options - Formatting options
 * @returns {string} Formatted number
 */
export function formatNumber(number, options = {}) {
  const locale = currentLanguage === 'sw' ? 'sw-KE' : 'en-KE'
  
  try {
    return new Intl.NumberFormat(locale, options).format(number)
  } catch (error) {
    // Fallback to basic formatting
    return number.toString()
  }
}

/**
 * Format dates according to locale
 * @param {Date|string} date - Date to format
 * @param {object} options - Formatting options
 * @returns {string} Formatted date
 */
export function formatDate(date, options = {}) {
  const locale = currentLanguage === 'sw' ? 'sw-KE' : 'en-KE'
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    }).format(dateObj)
  } catch (error) {
    // Fallback to ISO string
    return dateObj.toISOString().split('T')[0]
  }
}

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now - dateObj
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return diffMinutes <= 1 ? 
        t('common.justNow') || 'Just now' : 
        t('common.minutesAgo', { count: diffMinutes }) || `${diffMinutes} minutes ago`
    }
    return diffHours === 1 ? 
      t('common.hourAgo') || '1 hour ago' : 
      t('common.hoursAgo', { count: diffHours }) || `${diffHours} hours ago`
  } else if (diffDays === 1) {
    return t('common.yesterday') || 'Yesterday'
  } else if (diffDays < 7) {
    return t('common.daysAgo', { count: diffDays }) || `${diffDays} days ago`
  } else {
    return formatDate(dateObj)
  }
}

/**
 * Pluralization helper
 * @param {number} count - Count
 * @param {string} singular - Singular form
 * @param {string} plural - Plural form
 * @returns {string} Correct form based on count
 */
export function pluralize(count, singular, plural) {
  // English pluralization rules
  if (currentLanguage === 'en') {
    return count === 1 ? singular : plural
  }
  
  // Swahili pluralization (simplified)
  if (currentLanguage === 'sw') {
    // Swahili doesn't have the same plural concept as English
    // but we'll use the plural form for anything != 1
    return count === 1 ? singular : plural
  }
  
  return count === 1 ? singular : plural
}

/**
 * Language direction helper
 * @returns {string} 'ltr' or 'rtl'
 */
export function getLanguageDirection() {
  return isRTL() ? 'rtl' : 'ltr'
}

/**
 * React hook for translations (to be used with contexts)
 */
export function useTranslation() {
  return {
    t,
    language: currentLanguage,
    setLanguage,
    formatNumber,
    formatDate,
    formatRelativeTime,
    pluralize,
    isRTL: isRTL(),
    direction: getLanguageDirection()
  }
}

// Set initial document language
document.documentElement.lang = currentLanguage
document.documentElement.dir = getLanguageDirection()

export default {
  t,
  getCurrentLanguage,
  setLanguage,
  getAvailableLanguages,
  formatNumber,
  formatDate,
  formatRelativeTime,
  pluralize,
  isRTL,
  getLanguageDirection,
  useTranslation
}
