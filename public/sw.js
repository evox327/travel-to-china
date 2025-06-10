const CACHE_NAME = 'discover-china-v1.0.0'
const STATIC_CACHE_NAME = 'discover-china-static-v1.0.0'
const DYNAMIC_CACHE_NAME = 'discover-china-dynamic-v1.0.0'

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/attractions',
  '/guides',
  '/about',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  // Cache first for static assets
  CACHE_FIRST: [
    /\.(?:js|css|woff|woff2|ttf|eot)$/,
    /\/icons\//,
    /\/images\//
  ],
  
  // Network first for API calls
  NETWORK_FIRST: [
    /\/api\//,
    /\/auth\//
  ],
  
  // Stale while revalidate for pages
  STALE_WHILE_REVALIDATE: [
    /\/attractions\//,
    /\/guides\//,
    /\/search/
  ]
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('[SW] Skip waiting')
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('[SW] Claiming clients')
        return self.clients.claim()
      })
  )
})

// Fetch event - handle network requests
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip chrome-extension and external requests
  if (!url.origin.includes(self.location.origin)) {
    return
  }

  event.respondWith(handleRequest(request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  try {
    // API requests - Network first with fallback
    if (isNetworkFirst(url.pathname)) {
      return await networkFirstStrategy(request)
    }
    
    // Static assets - Cache first
    if (isCacheFirst(url.pathname)) {
      return await cacheFirstStrategy(request)
    }
    
    // Pages - Stale while revalidate
    if (isStaleWhileRevalidate(url.pathname)) {
      return await staleWhileRevalidateStrategy(request)
    }
    
    // Default strategy - try cache first, then network
    return await cacheFirstStrategy(request)
    
  } catch (error) {
    console.error('[SW] Request failed:', error)
    return await getOfflineFallback(request)
  }
}

// Network first strategy (for API calls)
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}

// Cache first strategy (for static assets)
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    throw error
  }
}

// Stale while revalidate strategy (for pages)
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME)
  const cachedResponse = await cache.match(request)
  
  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    })
    .catch(() => {
      // Network failed, we'll rely on cache
    })
  
  return cachedResponse || networkResponsePromise
}

// Get offline fallback
async function getOfflineFallback(request) {
  const url = new URL(request.url)
  
  // For navigation requests, show offline page
  if (request.mode === 'navigate') {
    const offlinePage = await caches.match('/offline')
    if (offlinePage) {
      return offlinePage
    }
  }
  
  // For images, return a placeholder
  if (request.destination === 'image') {
    return new Response(
      '<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6b7280">Image not available offline</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    )
  }
  
  // Default offline response
  return new Response('Offline - Content not available', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: { 'Content-Type': 'text/plain' }
  })
}

// Strategy detection helpers
function isCacheFirst(pathname) {
  return CACHE_STRATEGIES.CACHE_FIRST.some(pattern => pattern.test(pathname))
}

function isNetworkFirst(pathname) {
  return CACHE_STRATEGIES.NETWORK_FIRST.some(pattern => pattern.test(pathname))
}

function isStaleWhileRevalidate(pathname) {
  return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE.some(pattern => pattern.test(pathname))
}

// Background sync for failed API requests
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync event:', event.tag)
  
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync())
  }
})

async function handleBackgroundSync() {
  console.log('[SW] Processing background sync')
  // Handle any queued requests when connection is restored
  // This could include failed review submissions, user actions, etc.
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('[SW] Push message received')
  
  const options = {
    body: event.data ? event.data.text() : 'New content available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icons/explore-icon.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/dismiss-icon.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Discover China', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click received')
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    )
  }
})

console.log('[SW] Service worker script loaded')