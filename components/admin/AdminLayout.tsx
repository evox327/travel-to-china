'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, MapPin, BookOpen, Users, MessageCircle, 
  Settings, LogOut, Menu, X, BarChart3, PlusCircle,
  Bell, Search
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // 检查用户权限
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!session || session.user.role !== 'admin') {
    router.push('/')
    return null
  }

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Attractions', href: '/admin/attractions', icon: MapPin },
    { name: 'Travel Guides', href: '/admin/guides', icon: BookOpen },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Reviews', href: '/admin/reviews', icon: MessageCircle },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                {item.name}
              </a>
            ))}
          </div>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || ''}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {session.user.name?.[0]}
                </span>
              </div>
            )}
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-700">{session.user.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <button
              onClick={() => signOut()}
              className="text-gray-400 hover:text-gray-500"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-gray-900">
                {title}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              {/* Notifications */}
              <button className="relative text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Quick actions */}
              <div className="flex items-center space-x-2">
                <a
                  href="/admin/attractions/new"
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Attraction</span>
                </a>
                <a
                  href="/admin/guides/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Guide</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout