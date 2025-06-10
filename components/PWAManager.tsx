'use client'

import { useEffect } from 'react'

const PWAManager = () => {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration)
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, show update notification
                  if (confirm('New content is available! Click OK to refresh.')) {
                    window.location.reload()
                  }
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })

      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          console.log('Cache updated for:', event.data.url)
        }
      })
    }

    // Track page visits for offline caching
    const trackPageVisit = () => {
      if (typeof window !== 'undefined') {
        const currentPage = window.location.pathname
        const visitedPages = JSON.parse(
          localStorage.getItem('discover-china-visited-pages') || '[]'
        )
        
        if (!visitedPages.includes(currentPage)) {
          visitedPages.unshift(currentPage)
          // Keep only the last 10 visited pages
          const limitedPages = visitedPages.slice(0, 10)
          localStorage.setItem('discover-china-visited-pages', JSON.stringify(limitedPages))
        }
      }
    }

    trackPageVisit()

    // Handle online/offline events
    const handleOnline = () => {
      console.log('Back online')
      // Sync any pending data
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'SYNC_DATA' })
      }
    }

    const handleOffline = () => {
      console.log('Gone offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return null // This component doesn't render anything
}

export default PWAManager