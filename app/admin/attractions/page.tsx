'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  Search, Filter, Plus, Edit3, Trash2, Eye, 
  Star, MapPin, MoreHorizontal, Calendar
} from 'lucide-react'

interface Attraction {
  _id: string
  name: Record<string, string>
  location: {
    city: string
    province: string
  }
  category: string
  rating: number
  reviewCount: number
  isActive: boolean
  createdAt: string
}

const AttractionsManagement = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
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

  useEffect(() => {
    fetchAttractions()
  }, [currentPage, selectedCategory, selectedStatus, searchTerm])

  const fetchAttractions = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      })

      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      if (searchTerm) params.append('search', searchTerm)

      const response = await fetch(`/api/attractions?${params}`)
      const data = await response.json()

      setAttractions(data.attractions || [])
      setTotalPages(data.pagination?.pages || 1)
    } catch (error) {
      console.error('Error fetching attractions:', error)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this attraction?')) {
      return
    }

    try {
      const response = await fetch(`/api/attractions/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setAttractions(attractions.filter(attraction => attraction._id !== id))
        alert('Attraction deleted successfully!')
      } else {
        alert('Error deleting attraction')
      }
    } catch (error) {
      console.error('Error deleting attraction:', error)
      alert('Error deleting attraction')
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/attractions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      })

      if (response.ok) {
        setAttractions(attractions.map(attraction => 
          attraction._id === id 
            ? { ...attraction, isActive: !currentStatus }
            : attraction
        ))
      }
    } catch (error) {
      console.error('Error updating attraction status:', error)
    }
  }

  return (
    <AdminLayout title="Attractions Management">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Attractions</h2>
            <p className="text-gray-600">Manage tourist attractions and destinations</p>
          </div>
          <a
            href="/admin/attractions/new"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Attraction</span>
          </a>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search attractions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Category Filter */}
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

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedStatus('all')
                setCurrentPage(1)
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Attractions Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attraction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attractions.map((attraction) => (
                      <tr key={attraction._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {attraction.name.en}
                            </div>
                            <div className="text-sm text-gray-500 chinese-font">
                              {attraction.name.zh}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-900">
                            <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                            {attraction.location.city}, {attraction.location.province}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                            {attraction.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm text-gray-900">{attraction.rating}</span>
                            <span className="ml-1 text-sm text-gray-500">({attraction.reviewCount})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleStatus(attraction._id, attraction.isActive)}
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              attraction.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {attraction.isActive ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            {new Date(attraction.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <a
                              href={`/attractions/${attraction._id}`}
                              className="text-gray-400 hover:text-gray-600"
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                            <a
                              href={`/admin/attractions/${attraction._id}/edit`}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit"
                            >
                              <Edit3 className="h-4 w-4" />
                            </a>
                            <button
                              onClick={() => handleDelete(attraction._id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing page <span className="font-medium">{currentPage}</span> of{' '}
                          <span className="font-medium">{totalPages}</span>
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          
                          {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            const page = i + 1
                            return (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  currentPage === page
                                    ? 'z-10 bg-red-50 border-red-500 text-red-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </button>
                            )
                          })}
                          
                          <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AttractionsManagement