'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  Search, Filter, MapPin, BookOpen, Star, Eye, 
  Clock, Calendar, User, Loader2, TrendingUp
} from 'lucide-react'

interface SearchResult {
  _id: string
  type: 'attraction' | 'guide'
  name?: Record<string, string>
  title?: Record<string, string>
  description?: Record<string, string>
  excerpt?: Record<string, string>
  location?: {
    city: string
    province: string
  }
  images?: string[]
  coverImage?: string
  category: string
  rating?: number
  reviewCount?: number
  readTime?: number
  views?: number
  likes?: number
  author?: {
    name: string
    image?: string
  }
  publishedAt?: string
}

interface SearchSuggestion {
  text: string
  type: 'attraction' | 'city' | 'category'
}

const SearchPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [searchType, setSearchType] = useState(searchParams.get('type') || 'all')
  const [results, setResults] = useState<{
    attractions: SearchResult[]
    guides: SearchResult[]
    total: number
  }>({ attractions: [], guides: [], total: 0 })
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
      performSearch(query, searchType)
    }
  }, [searchParams])

  const performSearch = async (query: string, type: string = 'all') => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        q: query,
        type: type,
        limit: '20'
      })

      const response = await fetch(`/api/search?${params}`)
      const data = await response.json()

      setResults(data.results)
      setSuggestions(data.suggestions || [])
    } catch (error) {
      console.error('Search error:', error)
    }
    setLoading(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const params = new URLSearchParams()
    params.set('q', searchQuery)
    if (searchType !== 'all') params.set('type', searchType)

    router.push(`/search?${params.toString()}`)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.text)
    setShowSuggestions(false)
    
    const params = new URLSearchParams()
    params.set('q', suggestion.text)
    if (suggestion.type === 'attraction') params.set('type', 'attractions')
    if (suggestion.type === 'category') params.set('type', 'guides')

    router.push(`/search?${params.toString()}`)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const getResultUrl = (result: SearchResult) => {
    return result.type === 'attraction' 
      ? `/attractions/${result._id}` 
      : `/guides/${result._id}`
  }

  const getResultTitle = (result: SearchResult) => {
    return result.type === 'attraction' 
      ? result.name?.en || result.name?.zh 
      : result.title?.en || result.title?.zh
  }

  const getResultDescription = (result: SearchResult) => {
    return result.type === 'attraction' 
      ? result.description?.en || result.description?.zh 
      : result.excerpt?.en || result.excerpt?.zh
  }

  const getResultImage = (result: SearchResult) => {
    return result.type === 'attraction' 
      ? result.images?.[0] 
      : result.coverImage
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Search Header */}
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Search China Travel
              </h1>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="relative">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={handleInputFocus}
                      placeholder="Search for attractions, guides, cities..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                    />
                    
                    {/* Search Suggestions */}
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                        <div className="p-2">
                          <div className="text-xs text-gray-500 font-medium mb-2">Suggestions</div>
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-2"
                            >
                              {suggestion.type === 'attraction' && <MapPin className="h-4 w-4 text-gray-400" />}
                              {suggestion.type === 'city' && <MapPin className="h-4 w-4 text-blue-500" />}
                              {suggestion.type === 'category' && <BookOpen className="h-4 w-4 text-green-500" />}
                              <span className="text-sm">{suggestion.text}</span>
                              <span className="text-xs text-gray-400 capitalize">{suggestion.type}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="all">All</option>
                    <option value="attractions">Attractions</option>
                    <option value="guides">Guides</option>
                  </select>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                    <span>Search</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Search Results */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-red-600 mx-auto mb-4" />
                  <p className="text-gray-600">Searching...</p>
                </div>
              </div>
            ) : searchQuery && results.total > 0 ? (
              <>
                {/* Results Summary */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    Found <span className="font-semibold">{results.total}</span> results for "
                    <span className="font-semibold">{searchQuery}</span>"
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1 max-w-md">
                  <button
                    onClick={() => setSearchType('all')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      searchType === 'all'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All ({results.total})
                  </button>
                  <button
                    onClick={() => setSearchType('attractions')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      searchType === 'attractions'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Attractions ({results.attractions.length})
                  </button>
                  <button
                    onClick={() => setSearchType('guides')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      searchType === 'guides'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Guides ({results.guides.length})
                  </button>
                </div>

                {/* Results Grid */}
                <div className="space-y-8">
                  {/* Attractions Results */}
                  {(searchType === 'all' || searchType === 'attractions') && results.attractions.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-red-600" />
                        Attractions ({results.attractions.length})
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.attractions.map((result) => (
                          <a
                            key={result._id}
                            href={getResultUrl(result)}
                            className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={getResultImage(result)}
                                alt={getResultTitle(result)}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                                {getResultTitle(result)}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {getResultDescription(result)}
                              </p>
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{result.location?.city}</span>
                                </div>
                                {result.rating && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                    <span>{result.rating}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Guides Results */}
                  {(searchType === 'all' || searchType === 'guides') && results.guides.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                        Travel Guides ({results.guides.length})
                      </h2>
                      <div className="space-y-4">
                        {results.guides.map((result) => (
                          <a
                            key={result._id}
                            href={getResultUrl(result)}
                            className="group block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="md:flex">
                              <div className="md:w-1/4">
                                <div className="aspect-video md:aspect-square overflow-hidden">
                                  <img
                                    src={getResultImage(result)}
                                    alt={getResultTitle(result)}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                              </div>
                              <div className="md:w-3/4 p-6">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                      {getResultTitle(result)}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                      {getResultDescription(result)}
                                    </p>
                                    
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                      {result.author && (
                                        <div className="flex items-center space-x-1">
                                          <User className="h-3 w-3" />
                                          <span>{result.author.name}</span>
                                        </div>
                                      )}
                                      {result.readTime && (
                                        <div className="flex items-center space-x-1">
                                          <Clock className="h-3 w-3" />
                                          <span>{result.readTime} min read</span>
                                        </div>
                                      )}
                                      {result.views && (
                                        <div className="flex items-center space-x-1">
                                          <Eye className="h-3 w-3" />
                                          <span>{result.views.toLocaleString()}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <span className="ml-4 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium capitalize">
                                    {result.category.replace('-', ' ')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : searchQuery && results.total === 0 ? (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find anything matching "{searchQuery}". Try different keywords or browse our categories.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="/attractions"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Browse Attractions
                  </a>
                  <a
                    href="/guides"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Browse Guides
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
                <p className="text-gray-600">
                  Discover amazing attractions and travel guides across China
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default SearchPage