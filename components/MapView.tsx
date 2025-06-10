'use client'

import { useState, useEffect } from 'react'
import { MapPin, Navigation, Maximize2, Minimize2 } from 'lucide-react'

interface MapViewProps {
  latitude: number
  longitude: number
  name: string
  address?: string
  zoom?: number
  className?: string
}

const MapView = ({ 
  latitude, 
  longitude, 
  name, 
  address, 
  zoom = 15, 
  className = "" 
}: MapViewProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  // 使用高德地图静态地图API作为示例
  // 在实际部署中，您需要申请高德地图API密钥
  const getStaticMapUrl = () => {
    const apiKey = 'your-amap-api-key' // 需要替换为实际的API密钥
    const baseUrl = 'https://restapi.amap.com/v3/staticmap'
    
    return `${baseUrl}?location=${longitude},${latitude}&zoom=${zoom}&size=600*400&markers=mid,0xFF0000:${longitude},${latitude}&key=${apiKey}`
  }

  // 百度地图链接（用于在新窗口打开）
  const getBaiduMapUrl = () => {
    return `https://api.map.baidu.com/marker?location=${latitude},${longitude}&title=${encodeURIComponent(name)}&content=${encodeURIComponent(address || '')}&output=html&src=webapp.baidu.openAPIdemo`
  }

  // 高德地图链接
  const getAmapUrl = () => {
    return `https://uri.amap.com/marker?position=${longitude},${latitude}&name=${encodeURIComponent(name)}&src=mypage&coordinate=gaode&callnative=0`
  }

  const handleOpenInMaps = (type: 'baidu' | 'amap' | 'google') => {
    let url = ''
    
    switch (type) {
      case 'baidu':
        url = getBaiduMapUrl()
        break
      case 'amap':
        url = getAmapUrl()
        break
      case 'google':
        url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
        break
    }
    
    window.open(url, '_blank')
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <>
      <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${className}`}>
        {/* Map Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent z-10 p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">{name}</h3>
                {address && <p className="text-sm opacity-90">{address}</p>}
              </div>
            </div>
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-black/20 rounded-lg hover:bg-black/40 transition-colors"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Static Map Display */}
        <div className="aspect-video relative">
          {/* 使用静态地图图片作为示例 */}
          <div 
            className="w-full h-full bg-gradient-to-br from-green-100 via-blue-50 to-blue-100 flex items-center justify-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
              <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{name}</h4>
              <p className="text-sm text-gray-600 mb-4">
                Coordinates: {latitude.toFixed(4)}, {longitude.toFixed(4)}
              </p>
              <div className="text-xs text-gray-500">
                Interactive map integration available with API key
              </div>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button
            onClick={() => handleOpenInMaps('amap')}
            className="bg-white shadow-lg rounded-lg p-2 hover:bg-gray-50 transition-colors"
            title="Open in Amap"
          >
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">高</span>
            </div>
          </button>
          <button
            onClick={() => handleOpenInMaps('baidu')}
            className="bg-white shadow-lg rounded-lg p-2 hover:bg-gray-50 transition-colors"
            title="Open in Baidu Maps"
          >
            <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">百</span>
            </div>
          </button>
          <button
            onClick={() => handleOpenInMaps('google')}
            className="bg-white shadow-lg rounded-lg p-2 hover:bg-gray-50 transition-colors"
            title="Open in Google Maps"
          >
            <Navigation className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl bg-white rounded-lg overflow-hidden">
            {/* Fullscreen Header */}
            <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 z-20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{name}</h3>
                    {address && <p className="text-sm text-gray-600">{address}</p>}
                  </div>
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Minimize2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Fullscreen Map */}
            <div className="pt-20 h-full">
              <div className="w-full h-full bg-gradient-to-br from-green-100 via-blue-50 to-blue-100 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center">
                  <MapPin className="h-16 w-16 text-red-600 mx-auto mb-6" />
                  <h4 className="text-2xl font-semibold text-gray-900 mb-4">{name}</h4>
                  <p className="text-gray-600 mb-6">
                    Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleOpenInMaps('amap')}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Open in Amap
                    </button>
                    <button
                      onClick={() => handleOpenInMaps('baidu')}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Open in Baidu Maps
                    </button>
                    <button
                      onClick={() => handleOpenInMaps('google')}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Open in Google Maps
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Full interactive map requires API integration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MapView