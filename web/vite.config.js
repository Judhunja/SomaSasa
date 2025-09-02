import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // PWA plugin temporarily disabled for testing
  ],
  server: {
    port: 5173,
    host: true // Allow external connections for mobile testing
  },
  preview: {
    port: 4173,
    host: true
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          router: ['react-router-dom'],
          utils: ['date-fns', 'clsx']
        }
      }
    }
  },
  define: {
    // Expose package version to app
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})
