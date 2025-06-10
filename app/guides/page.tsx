'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  Search, Filter, Eye, ThumbsUp, Calendar, User, Clock, 
  BookOpen, ArrowRight, Star, Grid, List 
} from 'lucide-react'

interface Guide {
  _id: string
  title: Record<string, string>
  excerpt: Record<string, string>
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

const GuidesPage = () => {
  const { data: session } = useSession()
  const [guides, setGuides] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = [
    { value: 'all', label: 'All Guides', count: 156 },
    { value: 'first-time', label: 'First Time', count: 45 },
    { value: 'food-culture', label: 'Food & Culture', count: 38 },
    { value: 'adventure', label: 'Adventure', count: 29 },
    { value: 'multi-city', label: 'Multi-City', count: 44 },
    { value: 'budget', label: 'Budget Travel', count: 25 },
    { value: 'luxury', label: 'Luxury Travel', count: 18 }
  ]

  useEffect(() => {
    fetchGuides()
  }, [currentPage, selectedCategory, sortBy, searchTerm])

  const fetchGuides = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        sort: sortBy,
        category: selectedCategory,
      })

      if (searchTerm) params.append('search', searchTerm)

      const response = await fetch(`/api/guides?${params}`)
      const data = await response.json()

      setGuides(data.guides)
      setTotalPages(data.pagination.pages)
    } catch (error) {
      console.error('Error fetching guides:', error)
      // 静态数据备用方案
      const staticGuides: Guide[] = [
        {
          _id: '1',
          title: { en: 'First Time in Beijing: Complete 7-Day Guide', zh: '北京初游：完整7日攻略' },
          excerpt: { en: 'Everything you need to know for your first visit to China\'s capital city, including must-see attractions, local food, and cultural tips.', zh: '初次游览中国首都所需了解的一切，包括必看景点、当地美食和文化贴士。' },
          author: { name: 'Li Wei', image: '/images/authors/li-wei.jpg' },
          category: 'first-time',
          tags: ['Beijing', 'First Time', 'Culture', 'Food'],
          coverImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          readTime: 15,
          views: 24680,
          likes: 892,
          publishedAt: '2024-01-15'
        },
        {
          _id: '2',
          title: { en: 'Ultimate Food Guide to Shanghai', zh: '上海美食终极指南' },
          excerpt: { en: 'Discover the best local dishes, street food, and fine dining experiences in Shanghai\'s vibrant culinary scene.', zh: '发现上海充满活力的美食场景中最好的当地菜肴、街头小吃和精致餐饮体验。' },
          author: { name: 'Zhang Mei', image: '/images/authors/zhang-mei.jpg' },
          category: 'food-culture',
          tags: ['Shanghai', 'Food', 'Restaurants', 'Street Food'],
          coverImage: 'https://images.unsplash.com/photo-1526297003708-f5a1cd62d04a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          readTime: 12,
          views: 18920,
          likes: 654,
          publishedAt: '2024-01-10'
        },
        {
          _id: '3',
          title: { en: 'Adventure Travel in Yunnan Province', zh: '云南省探险旅游' },
          excerpt: { en: 'Epic hiking trails, mountain climbing, and outdoor adventures in one of China\'s most diverse provinces.', zh: '在中国最多样化的省份之一体验史诗般的徒步旅行、登山和户外探险。' },
          author: { name: 'Wang Hao', image: '/images/authors/wang-hao.jpg' },
          category: 'adventure',
          tags: ['Yunnan', 'Adventure', 'Hiking', 'Mountains'],
          coverImage: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          readTime: 18,
          views: 15360,
          likes: 723,
          publishedAt: '2024-01-05'
        },
        {
          _id: '4',
          title: { en: 'Budget Travel: 2 Weeks in China Under $800', zh: '预算旅行：800美元玩转中国两周' },
          excerpt: { en: 'Complete budget guide showing how to explore China for two weeks without breaking the bank, including accommodation and transport tips.', zh: '完整的预算指南，展示如何在不花费太多的情况下游览中国两周，包括住宿和交通贴士。' },
          author: { name: 'Chen Yu', image: '/images/authors/chen-yu.jpg' },
          category: 'budget',
          tags: ['Budget', 'Backpacking', 'Transportation', 'Accommodation'],
          coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          readTime: 20,
          views: 32180,
          likes: 1245,
          publishedAt: '2023-12-28'
        }
      ]
      setGuides(staticGuides)
      setTotalPages(1)
    }
    setLoading(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchGuides()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Expert Travel Guides
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                In-depth travel guides written by local experts and experienced travelers to help you make the most of your China adventure
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
                    placeholder="Search travel guides..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Sort */}
              <div className="flex gap-4 items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="likes">Most Liked</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    setSelectedCategory(category.value)
                    setCurrentPage(1)
                  }}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
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
                    {guides.map((guide) => (
                      <GuideCard key={guide._id} guide={guide} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {guides.map((guide) => (
                      <GuideListItem key={guide._id} guide={guide} />
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
                                ? 'bg-blue-600 text-white border-blue-600'
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

const GuideCard = ({ guide }: { guide: Guide }) => {
  return (
    <Link
      href={`/guides/${guide._id}`}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden card-hover block"
    >
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

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {guide.title.en}
          </h3>
          <p className="text-gray-600 chinese-font">
            {guide.title.zh}
          </p>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {guide.excerpt.en}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {guide.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
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
        </div>

        <div className="mt-4">
          <div className="group flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
            <span>Read Guide</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

const GuideListItem = ({ guide }: { guide: Guide }) => {
  return (
    <Link
      href={`/guides/${guide._id}`}
      className="group block bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
    >
      <div className="md:flex">
        <div className="md:w-1/3">
          <div className="relative h-48 md:h-full overflow-hidden">
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
        </div>
        
        <div className="md:w-2/3 p-6">
          <div className="mb-3">
            <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {guide.title.en}
            </h3>
            <p className="text-gray-600 chinese-font text-lg">
              {guide.title.zh}
            </p>
          </div>

          <p className="text-gray-600 mb-4">
            {guide.excerpt.en}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {guide.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              {guide.author.image ? (
                <img
                  src={guide.author.image}
                  alt={guide.author.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{guide.author.name}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(guide.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{guide.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{guide.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{guide.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GuidesPage