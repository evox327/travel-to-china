'use client'

import { useState, useEffect } from 'react'
import { Download, X, Smartphone, Monitor } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Check if app is installed on iOS
    if (iOS && (window.navigator as any).standalone) {
      setIsInstalled(true)
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      const event = e as BeforeInstallPromptEvent
      e.preventDefault()
      setDeferredPrompt(event)
      
      // Don't show prompt if already installed or dismissed recently
      const dismissed = localStorage.getItem('pwa-install-dismissed')
      const dismissedTime = dismissed ? parseInt(dismissed) : 0
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000)
      
      if (!dismissed || dismissedTime < oneDayAgo) {
        setTimeout(() => setShowPrompt(true), 3000) // Show after 3 seconds
      }
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('PWA was installed')
      setIsInstalled(true)
      setShowPrompt(false)
      localStorage.removeItem('pwa-install-dismissed')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
        setIsInstalled(true)
      } else {
        console.log('User dismissed the install prompt')
        localStorage.setItem('pwa-install-dismissed', Date.now().toString())
      }
      
      setDeferredPrompt(null)
      setShowPrompt(false)
    } catch (error) {
      console.error('Error during install prompt:', error)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  // Don't show if already installed or in standalone mode
  if (isInstalled || isStandalone) {
    return null
  }

  // iOS install instructions
  if (isIOS && showPrompt) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🇨🇳</span>
              </div>
              <span className="font-semibold text-gray-900">Install Discover China</span>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            Install this app for the best travel experience: offline access, faster loading, and more!
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <div className="text-sm text-blue-800">
              <strong>To install:</strong>
              <ol className="mt-2 space-y-1 ml-4">
                <li>1. Tap the Share button in Safari</li>
                <li>2. Scroll down and tap "Add to Home Screen"</li>
                <li>3. Tap "Add" to confirm</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Android/Chrome install prompt
  if (showPrompt && deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4 max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🇨🇳</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Install Discover China</h3>
              <p className="text-xs text-gray-600">Add to home screen</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Get the full experience with faster loading, offline access, and push notifications.
        </p>
        
        <div className="flex space-x-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Install</span>
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            Not now
          </button>
        </div>
        
        <div className="flex items-center justify-center space-x-4 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Smartphone className="h-3 w-3" />
            <span>Mobile optimized</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Monitor className="h-3 w-3" />
            <span>Offline capable</span>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default PWAInstallPrompt