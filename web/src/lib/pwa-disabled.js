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
