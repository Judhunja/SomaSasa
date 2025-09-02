/**
 * PWA Utilities for SomaNow
 * PWA features disabled - keeping file for compatibility
 */

/**
 * Disabled - No service worker registration
 */
export async function registerSW() {
  console.log('PWA/Service Worker registration disabled')
  return false
}

/**
 * Disabled - No app installation
 */
export async function installApp() {
  console.log('PWA installation disabled')
  return false
}

/**
 * Always return false - app not installed
 */
export function isAppInstalled() {
  return false
}

/**
 * Disabled - No update checking
 */
export function checkForUpdates() {
  console.log('PWA update checking disabled')
  return false
}

/**
 * Disabled - No update notifications
 */
export function showUpdateNotification() {
  // Disabled
}

/**
 * Disabled - No offline notifications
 */
export function showOfflineNotification() {
  // Disabled
}

export default {
  registerSW,
  installApp,
  isAppInstalled,
  checkForUpdates
}
      registration = await wb.register()
      console.log('Service Worker registered successfully')

      // Listen for messages from SW
      navigator.serviceWorker.addEventListener('message', handleSWMessage)

      return registration
    } catch (error) {
      console.error('Service Worker registration failed:', error)
    }
  } else {
    console.warn('Service Workers not supported')
  }
}

/**
 * Handle messages from service worker
 */
function handleSWMessage(event) {
  const { type, payload } = event.data || {}

  switch (type) {
    case 'SYNC_PENDING_SUBMISSIONS':
      // Trigger IndexedDB sync when background sync occurs
      import('./offlineStorage.js').then(({ default: offlineStorage }) => {
        offlineStorage.syncOfflineQueue()
      })
      break

    case 'CACHE_UPDATED':
      console.log('Cache updated:', payload)
      break

    case 'OFFLINE_READY':
      showOfflineNotification()
      break

    default:
      console.log('Unknown SW message:', type, payload)
  }
}

/**
 * Show update notification
 */
function showUpdateNotification() {
  const notification = document.getElementById('update-available')
  if (notification) {
    notification.classList.remove('hidden')
    
    // Auto-hide after 10 seconds if user doesn't interact
    setTimeout(() => {
      if (!notification.classList.contains('hidden')) {
        notification.classList.add('hidden')
      }
    }, 10000)
  }
}

/**
 * Show offline ready notification
 */
function showOfflineNotification() {
  // Create temporary notification
  const notification = document.createElement('div')
  notification.className = 'fixed bottom-4 left-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in'
  notification.innerHTML = `
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>App ready for offline use!</span>
    </div>
  `
  
  document.body.appendChild(notification)
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

/**
 * Update service worker
 */
export function updateSW() {
  if (wb && updateAvailable) {
    wb.messageSkipWaiting()
  } else {
    window.location.reload()
  }
}

/**
 * PWA Installation Management
 */
let deferredPrompt = null

// Listen for install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
  showInstallPrompt()
})

// Listen for app installed
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed')
  deferredPrompt = null
  hideInstallPrompt()
  
  // Track installation
  if (window.gtag) {
    window.gtag('event', 'pwa_install', {
      event_category: 'engagement'
    })
  }
})

/**
 * Show install prompt
 */
function showInstallPrompt() {
  // Create install prompt if it doesn't exist
  let installPrompt = document.getElementById('install-prompt')
  
  if (!installPrompt) {
    installPrompt = document.createElement('div')
    installPrompt.id = 'install-prompt'
    installPrompt.className = 'fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 animate-slide-up md:left-auto md:w-96'
    installPrompt.innerHTML = `
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h3 class="font-medium">Install Elimu Hub</h3>
          <p class="text-sm opacity-90 mt-1">Get the full app experience with offline access!</p>
          <div class="flex space-x-2 mt-3">
            <button id="install-btn" class="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm">
              Install
            </button>
            <button id="install-dismiss" class="text-blue-200 hover:text-white px-3 py-1 text-sm">
              Not now
            </button>
          </div>
        </div>
        <button id="install-close" class="text-blue-200 hover:text-white ml-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `
    
    document.body.appendChild(installPrompt)
    
    // Add event listeners
    document.getElementById('install-btn').addEventListener('click', installApp)
    document.getElementById('install-dismiss').addEventListener('click', () => {
      hideInstallPrompt()
      // Don't show again for 7 days
      localStorage.setItem('installPromptDismissed', Date.now() + (7 * 24 * 60 * 60 * 1000))
    })
    document.getElementById('install-close').addEventListener('click', hideInstallPrompt)
  }
  
  // Check if user previously dismissed
  const dismissed = localStorage.getItem('installPromptDismissed')
  if (dismissed && Date.now() < parseInt(dismissed)) {
    return
  }
  
  // Show after a delay to not be intrusive
  setTimeout(() => {
    installPrompt.classList.remove('hidden')
  }, 3000)
}

/**
 * Hide install prompt
 */
function hideInstallPrompt() {
  const installPrompt = document.getElementById('install-prompt')
  if (installPrompt) {
    installPrompt.classList.add('hidden')
  }
}

/**
 * Install the app
 */
export async function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User choice: ${outcome}`)
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }
    
    deferredPrompt = null
    hideInstallPrompt()
  }
}

/**
 * Check if app is installed
 */
export function isAppInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true
}

/**
 * Network status management
 */
export class NetworkStatus {
  constructor() {
    this.isOnline = navigator.onLine
    this.callbacks = []
    this.setupListeners()
  }

  setupListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true
      this.notifyCallbacks('online')
      this.showConnectionStatus('online')
    })

    window.addEventListener('offline', () => {
      this.isOnline = false
      this.notifyCallbacks('offline')
      this.showConnectionStatus('offline')
    })
  }

  notifyCallbacks(status) {
    this.callbacks.forEach(callback => {
      try {
        callback(status, this.isOnline)
      } catch (error) {
        console.error('Network status callback error:', error)
      }
    })
  }

  showConnectionStatus(status) {
    const indicator = document.getElementById('offline-indicator')
    
    if (status === 'offline') {
      if (indicator) {
        indicator.classList.remove('hidden')
      }
    } else {
      if (indicator) {
        indicator.classList.add('hidden')
      }
      
      // Show brief "back online" notification
      const notification = document.createElement('div')
      notification.className = 'fixed bottom-4 left-4 bg-green-600 text-white p-3 rounded-lg shadow-lg z-50 animate-fade-in'
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Back online!</span>
        </div>
      `
      
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.remove()
      }, 2000)
    }
  }

  onStatusChange(callback) {
    this.callbacks.push(callback)
    
    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback)
      if (index > -1) {
        this.callbacks.splice(index, 1)
      }
    }
  }

  getStatus() {
    return {
      isOnline: this.isOnline,
      effectiveType: navigator.connection?.effectiveType || 'unknown',
      downlink: navigator.connection?.downlink || null,
      rtt: navigator.connection?.rtt || null
    }
  }
}

// Create singleton instance
export const networkStatus = new NetworkStatus()

/**
 * App lifecycle management
 */
export class AppLifecycle {
  constructor() {
    this.isVisible = !document.hidden
    this.isBackground = false
    this.setupListeners()
  }

  setupListeners() {
    // Page visibility
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden
      
      if (this.isVisible) {
        this.handleAppForeground()
      } else {
        this.handleAppBackground()
      }
    })

    // Page focus/blur
    window.addEventListener('focus', () => {
      this.handleAppForeground()
    })

    window.addEventListener('blur', () => {
      this.handleAppBackground()
    })

    // Page unload
    window.addEventListener('beforeunload', () => {
      this.handleAppUnload()
    })
  }

  handleAppForeground() {
    console.log('App in foreground')
    this.isBackground = false
    
    // Sync offline data when app comes to foreground
    if (networkStatus.isOnline) {
      import('./offlineStorage.js').then(({ default: offlineStorage }) => {
        offlineStorage.syncOfflineQueue()
      })
    }
  }

  handleAppBackground() {
    console.log('App in background')
    this.isBackground = true
    
    // Register background sync if supported
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register('sync-submissions')
      }).catch(error => {
        console.warn('Background sync registration failed:', error)
      })
    }
  }

  handleAppUnload() {
    console.log('App unloading')
    
    // Save any pending data
    import('./offlineStorage.js').then(({ default: offlineStorage }) => {
      // Attempt to save any pending progress
      // This is best-effort as the page is unloading
    })
  }
}

// Create singleton instance
export const appLifecycle = new AppLifecycle()

/**
 * Performance monitoring
 */
export class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.setupMonitoring()
  }

  setupMonitoring() {
    // Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      this.observeMetric('largest-contentful-paint', (entry) => {
        this.metrics.lcp = entry.startTime
      })

      // First Input Delay (FID)
      this.observeMetric('first-input', (entry) => {
        this.metrics.fid = entry.processingStart - entry.startTime
      })

      // Cumulative Layout Shift (CLS)
      this.observeMetric('layout-shift', (entry) => {
        if (!entry.hadRecentInput) {
          this.metrics.cls = (this.metrics.cls || 0) + entry.value
        }
      })
    }

    // Navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0]
        if (navigation) {
          this.metrics.navigationTiming = {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            totalTime: navigation.loadEventEnd - navigation.requestStart
          }
        }
      }, 0)
    })
  }

  observeMetric(type, callback) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          callback(entry)
        }
      })
      observer.observe({ type, buffered: true })
    } catch (error) {
      console.warn(`Performance observer for ${type} failed:`, error)
    }
  }

  getMetrics() {
    return { ...this.metrics }
  }

  logMetrics() {
    console.table(this.metrics)
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor()

/**
 * Initialize all PWA features
 */
export function initializePWA() {
  console.log('Initializing PWA features...')
  
  // Register service worker
  registerSW()
  
  // Initialize network status monitoring
  networkStatus.getStatus()
  
  // Initialize app lifecycle
  appLifecycle
  
  // Initialize performance monitoring
  performanceMonitor
  
  console.log('PWA initialization complete')
}

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePWA)
  } else {
    initializePWA()
  }
}
