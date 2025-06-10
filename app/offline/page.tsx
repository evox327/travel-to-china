'use client'

import { useState, useEffect } from 'react'
import { Wifi, WifiOff, RefreshCw, MapPin, BookOpen, Camera } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const OfflinePage = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [lastVisited, setLastVisited] = useState<string[]>([])

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Get last visited pages from localStorage
    const visitedPages = localStorage.getItem('discover-china-visited-pages')
    if (visitedPages) {
      setLastVisited(JSON.parse(visitedPages))
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRefresh = () => {
    if (isOnline) {
      window.location.reload()
    }
  }

  const offlineFeatures = [
    {
      icon: <MapPin className="h-8 w-8 text-red-600" />,
      title: "Cached Attractions",
      description: "Browse previously visited attraction details even offline"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Saved Guides",
      description: "Access your bookmarked travel guides without internet"
    },
    {
      icon: <Camera className="h-8 w-8 text-green-600" />,
      title: "Photo Gallery",
      description: "View cached images from attractions you've explored"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Status Header */}
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              {isOnline ? (
                <div className="p-4 bg-green-100 rounded-full">
                  <Wifi className="h-12 w-12 text-green-600" />
                </div>
              ) : (
                <div className="p-4 bg-red-100 rounded-full">
                  <WifiOff className="h-12 w-12 text-red-600" />
                </div>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isOnline ? "You're Back Online!" : "You're Offline"}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {isOnline 
                ? "Great! Your internet connection has been restored. You can now access all features of Discover China."
                : "No worries! You can still explore China with our offline features. Some content from your previous visits is available below."
              }
            </p>

            {isOnline && (
              <button
                onClick={handleRefresh}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Refresh Page</span>
              </button>
            )}
          </div>

          {/* Offline Features */}
          {!isOnline && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Available Offline Features
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {offlineFeatures.map((feature, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recently Visited */}
          {lastVisited.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recently Visited
              </h2>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="space-y-4">
                  {lastVisited.slice(0, 5).map((page, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-gray-700">{page}</span>
                      </div>
                      <button 
                        onClick={() => window.location.href = page}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Revisit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tips for Offline Usage */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              💡 Tips for Better Offline Experience
            </h3>
            <ul className="text-blue-800 space-y-2">
              <li>• Visit attractions and guides while online to cache them for offline viewing</li>
              <li>• Save important travel information to your device's notes app</li>
              <li>• Download offline maps of China before your trip</li>
              <li>• Take screenshots of important information like addresses and phone numbers</li>
            </ul>
          </div>

          {/* Connection Status */}
          <div className="mt-8 text-center">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
              isOnline 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              <span>
                Connection Status: {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default OfflinePage