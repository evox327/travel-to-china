'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  Users, MapPin, BookOpen, MessageCircle, 
  TrendingUp, Eye, Star, Calendar
} from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  totalAttractions: number
  totalGuides: number
  totalReviews: number
  monthlyVisits: number
  averageRating: number
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalAttractions: 0,
    totalGuides: 0,
    totalReviews: 0,
    monthlyVisits: 0,
    averageRating: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // 这里应该调用API获取真实数据，现在使用模拟数据
      setTimeout(() => {
        setStats({
          totalUsers: 1247,
          totalAttractions: 156,
          totalGuides: 89,
          totalReviews: 3421,
          monthlyVisits: 45632,
          averageRating: 4.6
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase' as const
    },
    {
      title: 'Attractions',
      value: stats.totalAttractions.toString(),
      icon: MapPin,
      color: 'bg-green-500',
      change: '+3',
      changeType: 'increase' as const
    },
    {
      title: 'Travel Guides',
      value: stats.totalGuides.toString(),
      icon: BookOpen,
      color: 'bg-purple-500',
      change: '+5',
      changeType: 'increase' as const
    },
    {
      title: 'Reviews',
      value: stats.totalReviews.toLocaleString(),
      icon: MessageCircle,
      color: 'bg-yellow-500',
      change: '+8%',
      changeType: 'increase' as const
    },
    {
      title: 'Monthly Visits',
      value: stats.monthlyVisits.toLocaleString(),
      icon: Eye,
      color: 'bg-red-500',
      change: '+15%',
      changeType: 'increase' as const
    },
    {
      title: 'Average Rating',
      value: stats.averageRating.toString(),
      icon: Star,
      color: 'bg-orange-500',
      change: '+0.1',
      changeType: 'increase' as const
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New user John Doe registered',
      time: '2 minutes ago',
      icon: Users
    },
    {
      id: 2,
      type: 'review_posted',
      message: 'New review posted for Great Wall of China',
      time: '15 minutes ago',
      icon: MessageCircle
    },
    {
      id: 3,
      type: 'guide_published',
      message: 'Travel guide "Beijing Food Tour" published',
      time: '1 hour ago',
      icon: BookOpen
    },
    {
      id: 4,
      type: 'attraction_updated',
      message: 'Forbidden City information updated',
      time: '2 hours ago',
      icon: MapPin
    }
  ]

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
          <p className="opacity-90">
            Here's what's happening with your China travel platform today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500 font-medium">{card.change}</span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`${card.color} rounded-lg p-3`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="/admin/activities"
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  View all activities →
                </a>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="/admin/attractions/new"
                  className="bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg p-4 text-center transition-colors"
                >
                  <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-red-600">Add Attraction</p>
                </a>
                <a
                  href="/admin/guides/new"
                  className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition-colors"
                >
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-600">Create Guide</p>
                </a>
                <a
                  href="/admin/users"
                  className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition-colors"
                >
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-600">Manage Users</p>
                </a>
                <a
                  href="/admin/reviews"
                  className="bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-lg p-4 text-center transition-colors"
                >
                  <MessageCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-yellow-600">Review Queue</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Most Popular Content</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Popular Attractions */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Top Attractions</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Great Wall of China', views: '12.5K', rating: 4.9 },
                    { name: 'Forbidden City', views: '8.9K', rating: 4.8 },
                    { name: 'Terracotta Army', views: '6.7K', rating: 4.7 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.views} views</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Guides */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Top Travel Guides</h4>
                <div className="space-y-3">
                  {[
                    { name: '10-Day Beijing to Shanghai', views: '5.2K', likes: 432 },
                    { name: 'Foodie\'s Guide to Sichuan', views: '4.1K', likes: 321 },
                    { name: 'Ancient Silk Road Adventure', views: '3.8K', likes: 287 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.views} views</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600">{item.likes} likes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard