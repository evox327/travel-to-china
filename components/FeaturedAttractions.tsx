'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, MapPin, Clock, Users } from 'lucide-react'

interface Attraction {
  _id: string
  name: {
    en: string
    zh: string
  }
  description: {
    en: string
    zh: string
  }
  location: {
    city: string
    province: string
  }
  images: string[]
  category: string
  rating: number
  reviewCount: number
  highlights: string[]
  duration: string
}

const FeaturedAttractions = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedAttractions()
  }, [])

  const fetchFeaturedAttractions = async () => {
    try {
      const response = await fetch('/api/attractions?limit=4&sort=rating')
      const data = await response.json()
      setAttractions(data.attractions || [])
    } catch (error) {
      console.error('Error fetching attractions:', error)
      // 静态数据备用方案
      const staticAttractions: Attraction[] = [
        {
          _id: 'great-wall',
          name: { en: 'Great Wall of China', zh: '长城' },
          description: { en: 'One of the greatest wonders of the world, the Great Wall winds like a dragon through mountains and valleys for over 13,000 miles.', zh: '世界上最伟大的奇迹之一，长城如巨龙般蜿蜒穿越山谷，总长超过13000英里。' },
          location: { city: 'Beijing', province: 'Beijing' },
          images: ['/images/hero-great-wall.jpg'],
          category: 'historical',
          rating: 4.8,
          reviewCount: 15420,
          highlights: ['UNESCO World Heritage', 'Ancient Architecture', 'Mountain Views'],
          duration: '4-6 hours'
        },
        {
          _id: 'forbidden-city',
          name: { en: 'Forbidden City', zh: '紫禁城' },
          description: { en: 'A magnificent palace complex that served as the home of emperors for nearly 500 years, showcasing traditional Chinese architecture.', zh: '宏伟的宫殿建筑群，曾是近500年来皇帝的居所，展示了传统中国建筑风格。' },
          location: { city: 'Beijing', province: 'Beijing' },
          images: ['/images/forbidden-city.jpg'],
          category: 'historical',
          rating: 4.7,
          reviewCount: 23150,
          highlights: ['Imperial Palace', 'Traditional Architecture', 'Historical Artifacts'],
          duration: '3-4 hours'
        },
        {
          _id: 'zhangjiajie',
          name: { en: 'Zhangjiajie National Forest Park', zh: '张家界国家森林公园' },
          description: { en: 'Famous for its towering sandstone pillars and pristine natural beauty, this park inspired the floating mountains in Avatar.', zh: '以耸立的砂岩柱和原始自然美景著称，这个公园启发了《阿凡达》中的悬浮山。' },
          location: { city: 'Zhangjiajie', province: 'Hunan' },
          images: ['/images/zhangjiajie-mountains.jpg'],
          category: 'natural',
          rating: 4.9,
          reviewCount: 8920,
          highlights: ['Avatar Mountains', 'Glass Bridge', 'Cable Cars'],
          duration: 'Full day'
        }
      ]
      setAttractions(staticAttractions)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="attractions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Attractions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover China's most iconic destinations and hidden gems, 
              each offering unique experiences and unforgettable memories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="attractions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Attractions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover China's most iconic destinations and hidden gems, 
            each offering unique experiences and unforgettable memories.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {attractions.map((attraction) => (
            <Link 
              key={attraction._id}
              href={`/attractions/${attraction._id}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer block"
              onClick={(e) => {
                console.log('Link clicked:', `/attractions/${attraction._id}`);
                console.log('Event:', e);
              }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={attraction.images[0]}
                  alt={attraction.name.en}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {attraction.location.city}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{attraction.rating}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {attraction.name.en}
                  </h3>
                  <p className="text-gray-600 chinese-font text-lg">
                    {attraction.name.zh}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {attraction.description.en}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {attraction.highlights.slice(0, 2).map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Info Row */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{attraction.location.province}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{attraction.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{attraction.reviewCount} reviews</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/attractions"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            View All Attractions
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedAttractions