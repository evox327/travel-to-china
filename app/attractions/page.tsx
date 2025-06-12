'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Search, Filter, MapPin, Star, Clock, Users, Grid, List } from 'lucide-react'

interface Attraction {
  _id: string
  name: Record<string, string>
  description: Record<string, string>
  location: {
    city: string
    province: string
  }
  images: string[]
  category: string
  rating: number
  reviewCount: number
  highlights: string[]
  ticketPrice: {
    adult: number
    child: number
    currency: string
  }
  duration: string
}

const AttractionsPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCity, setSelectedCity] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'historical', label: 'Historical' },
    { value: 'natural', label: 'Natural' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'modern', label: 'Modern' },
    { value: 'religious', label: 'Religious' }
  ]

  const cities = [
    { value: 'all', label: 'All Cities' },
    { value: 'Beijing', label: 'Beijing' },
    { value: 'Shanghai', label: 'Shanghai' },
    { value: 'Xi\'an', label: 'Xi\'an' },
    { value: 'Guilin', label: 'Guilin' },
    { value: 'Chengdu', label: 'Chengdu' }
  ]

  useEffect(() => {
    fetchAttractions()
  }, [currentPage, selectedCategory, selectedCity, sortBy, searchTerm])

  const fetchAttractions = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        sort: sortBy,
      })

      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      if (selectedCity !== 'all') params.append('city', selectedCity)
      if (searchTerm) params.append('search', searchTerm)

      const response = await fetch(`/api/attractions?${params}`)
      const data = await response.json()

      setAttractions(data.attractions)
      setTotalPages(data.pagination.pages)
    } catch (error) {
      console.error('Error fetching attractions:', error)
      // 静态数据备用方案
      const staticAttractions: Attraction[] = [
        {
          _id: '1',
          name: { en: 'Great Wall of China', zh: '长城' },
          description: { en: 'A series of fortifications and walls built to protect ancient Chinese states and empires against invasions', zh: '古代中国为防御侵略而建造的一系列防御工事和城墙' },
          location: { city: 'Beijing', province: 'Beijing' },
          images: ['/images/hero-great-wall.jpg'],
          category: 'historical',
          rating: 4.8,
          reviewCount: 15420,
          highlights: ['UNESCO World Heritage Site', 'Ancient Architecture', 'Mountain Views'],
          ticketPrice: { adult: 45, child: 25, currency: 'CNY' },
          duration: '4-6 hours'
        },
        {
          _id: '2',
          name: { en: 'Forbidden City', zh: '紫禁城' },
          description: { en: 'A palace complex in central Beijing that served as the home of emperors for nearly 500 years', zh: '位于北京中心的宫殿建筑群，曾是近500年来皇帝的居所' },
          location: { city: 'Beijing', province: 'Beijing' },
          images: ['/images/forbidden-city.jpg'],
          category: 'historical',
          rating: 4.7,
          reviewCount: 23150,
          highlights: ['Imperial Palace', 'Traditional Architecture', 'Historical Artifacts'],
          ticketPrice: { adult: 60, child: 30, currency: 'CNY' },
          duration: '3-4 hours'
        },
        {
          _id: '3',
          name: { en: 'Zhangjiajie National Forest Park', zh: '张家界国家森林公园' },
          description: { en: 'A unique national forest park known for its towering sandstone pillars and pristine natural beauty', zh: '以耸立的砂岩柱和原始自然美景著称的独特国家森林公园' },
          location: { city: 'Zhangjiajie', province: 'Hunan' },
          images: ['/images/zhangjiajie-mountains.jpg'],
          category: 'natural',
          rating: 4.9,
          reviewCount: 8920,
          highlights: ['Avatar Mountains', 'Glass Bridge', 'Cable Cars'],
          ticketPrice: { adult: 235, child: 115, currency: 'CNY' },
          duration: 'Full day'
        },
        {
          _id: '4',
          name: { en: 'Li River Cruise', zh: '漓江游船' },
          description: { en: 'A scenic cruise along the Li River featuring stunning karst landscape and traditional Chinese countryside', zh: '沿漓江的风景游船，欣赏迷人的喀斯特地貌和传统中国乡村' },
          location: { city: 'Guilin', province: 'Guangxi' },
          images: ['/images/li-river-cruise.jpg'],
          category: 'natural',
          rating: 4.6,
          reviewCount: 12840,
          highlights: ['Karst Mountains', 'River Cruise', 'Rural Scenery'],
          ticketPrice: { adult: 210, child: 105, currency: 'CNY' },
          duration: '4-5 hours'
        }
      ]
      setAttractions(staticAttractions)
      setTotalPages(1)
    }
    setLoading(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchAttractions()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Amazing Attractions
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Explore China's most incredible destinations, from ancient wonders to modern marvels
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="bg-white shadow-lg sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search attractions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Filters */}
              <div className="flex gap-4 items-center">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                  <option value="newest">Newest</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                      <div className="h-3 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {attractions.map((attraction) => (
                      <AttractionCard key={attraction._id} attraction={attraction} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {attractions.map((attraction) => (
                      <AttractionListItem key={attraction._id} attraction={attraction} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const page = i + 1
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border rounded-lg ${
                              currentPage === page
                                ? 'bg-red-600 text-white border-red-600'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const AttractionCard = ({ attraction }: { attraction: Attraction }) => {
  return (
    <Link
      href={`/attractions/${attraction._id}`}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden card-hover block"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={attraction.images[0]}
          alt={attraction.name.en}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
            {attraction.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>{attraction.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
            {attraction.name.en}
          </h3>
          <p className="text-gray-600 chinese-font text-lg">
            {attraction.name.zh}
          </p>
        </div>

        <div className="flex items-center space-x-1 text-gray-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{attraction.location.city}, {attraction.location.province}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {attraction.description.en}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {attraction.highlights.slice(0, 2).map((highlight, index) => (
            <span
              key={index}
              className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-medium"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{attraction.duration}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Users className="h-4 w-4" />
            <span className="text-sm">{attraction.reviewCount} reviews</span>
          </div>
          <div className="text-sm text-gray-600">
            ¥{attraction.ticketPrice.adult}
          </div>
        </div>
      </div>
    </Link>
  )
}

const AttractionListItem = ({ attraction }: { attraction: Attraction }) => {
  return (
    <Link
      href={`/attractions/${attraction._id}`}
      className="group block bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
    >
      <div className="md:flex">
        <div className="md:w-1/3">
          <div className="relative h-48 md:h-full overflow-hidden">
            <img
              src={attraction.images[0]}
              alt={attraction.name.en}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {attraction.category}
              </span>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                {attraction.name.en}
              </h3>
              <p className="text-gray-600 chinese-font text-lg">
                {attraction.name.zh}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>{attraction.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-gray-600 mb-3">
            <MapPin className="h-4 w-4" />
            <span>{attraction.location.city}, {attraction.location.province}</span>
          </div>

          <p className="text-gray-600 mb-4">
            {attraction.description.en}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {attraction.highlights.map((highlight, index) => (
              <span
                key={index}
                className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {highlight}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex space-x-6">
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{attraction.duration}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Users className="h-4 w-4" />
                <span className="text-sm">{attraction.reviewCount} reviews</span>
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              ¥{attraction.ticketPrice.adult}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AttractionsPage