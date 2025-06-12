'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, User, Eye, BookOpen, ArrowRight, Clock } from 'lucide-react'

interface Guide {
  _id: string
  title: {
    en: string
    zh: string
  }
  excerpt: {
    en: string
    zh: string
  }
  author: {
    name: string
    image?: string
  }
  category: string
  tags: string[]
  coverImage: string
  readTime: number
  views: number
  likes: number
  publishedAt: string
}

const TravelGuides = () => {
  const [guides, setGuides] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedGuides()
  }, [])

  const fetchFeaturedGuides = async () => {
    try {
      const response = await fetch('/api/guides?limit=3&sort=popular')
      const data = await response.json()
      setGuides(data.guides || [])
    } catch (error) {
      console.error('Error fetching guides:', error)
      // 静态数据备用方案
      const staticGuides: Guide[] = [
        {
          _id: 'beijing-first-time',
          title: { en: 'First Time in Beijing: Complete 7-Day Guide', zh: '北京初游：完整7日攻略' },
          excerpt: { en: 'Everything you need to know for your first visit to China\'s capital city, including must-see attractions, local food, and cultural tips.', zh: '初次游览中国首都所需了解的一切，包括必看景点、当地美食和文化贴士。' },
          author: { name: 'Li Wei', image: '/images/author-li-wei.jpg' },
          category: 'first-time',
          tags: ['Beijing', 'First Time', 'Culture', 'Food'],
          coverImage: '/images/forbidden-city.jpg',
          readTime: 15,
          views: 2847,
          likes: 89,
          publishedAt: '2024-11-15'
        },
        {
          _id: 'shanghai-food',
          title: { en: 'Shanghai Food Paradise: Local Eats Guide', zh: '上海美食天堂：本地美食指南' },
          excerpt: { en: 'Discover the best local food in Shanghai, from street snacks to fine dining, with insider tips on where locals actually eat.', zh: '发现上海最好的本地美食，从街头小吃到精致餐饮，内含当地人真正用餐地点的内幕贴士。' },
          author: { name: 'Lisa Wang', image: '/images/author-lisa-wang.jpg' },
          category: 'food',
          tags: ['Shanghai', 'Food', 'Local Cuisine', 'Restaurants'],
          coverImage: '/images/shanghai-food.jpg',
          readTime: 12,
          views: 1923,
          likes: 76,
          publishedAt: '2024-11-10'
        }
      ]
      setGuides(staticGuides)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Expert Travel Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth travel guides written by local experts and experienced travelers to help you make the most of your China adventure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Expert Travel Guides
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In-depth travel guides written by local experts and experienced travelers to help you make the most of your China adventure.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Link 
              key={guide._id}
              href={`/guides/${guide._id}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer block"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={guide.coverImage}
                  alt={guide.title.en}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {guide.category.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {guide.title.en}
                  </h3>
                  <p className="text-gray-600 chinese-font">
                    {guide.title.zh}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3 mb-4">
                  {guide.author.image ? (
                    <img
                      src={guide.author.image}
                      alt={guide.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{guide.author.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(guide.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {guide.excerpt.en}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{guide.readTime} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{guide.views.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="group flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                    <span>Read</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/guides"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            View All Travel Guides
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TravelGuides