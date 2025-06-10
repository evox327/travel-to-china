'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  Search, Filter, MoreHorizontal, User, Mail, 
  Calendar, Shield, Ban, Check, AlertTriangle
} from 'lucide-react'

interface UserData {
  _id: string
  name: string
  email: string
  image?: string
  provider: string
  role: 'user' | 'admin'
  isActive: boolean
  emailVerified?: Date
  createdAt: string
}

const UsersManagement = () => {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchUsers()
  }, [currentPage, selectedRole, selectedStatus, searchTerm])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      // 模拟API调用 - 实际应该调用 /api/admin/users
      setTimeout(() => {
        const mockUsers: UserData[] = [
          {
            _id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            provider: 'credentials',
            role: 'user',
            isActive: true,
            emailVerified: new Date(),
            createdAt: '2024-01-15T10:00:00Z'
          },
          {
            _id: '2',
            name: '张三',
            email: 'zhang@example.com',
            provider: 'facebook',
            role: 'user',
            isActive: true,
            emailVerified: new Date(),
            createdAt: '2024-01-14T15:30:00Z'
          },
          {
            _id: '3',
            name: 'Sarah Chen',
            email: 'sarah@discoverchina.com',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            provider: 'credentials',
            role: 'admin',
            isActive: true,
            emailVerified: new Date(),
            createdAt: '2024-01-01T09:00:00Z'
          },
          {
            _id: '4',
            name: 'Mike Wilson',
            email: 'mike@example.com',
            provider: 'twitter',
            role: 'user',
            isActive: false,
            createdAt: '2024-01-13T12:15:00Z'
          }
        ]

        // 应用筛选
        let filteredUsers = mockUsers
        if (searchTerm) {
          filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
        if (selectedRole !== 'all') {
          filteredUsers = filteredUsers.filter(user => user.role === selectedRole)
        }
        if (selectedStatus !== 'all') {
          filteredUsers = filteredUsers.filter(user => 
            selectedStatus === 'active' ? user.isActive : !user.isActive
          )
        }

        setUsers(filteredUsers)
        setTotalPages(Math.ceil(filteredUsers.length / 10))
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Error fetching users:', error)
      setLoading(false)
    }
  }

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      // 实际应该调用API
      setUsers(users.map(user => 
        user._id === userId 
          ? { ...user, isActive: !currentStatus }
          : user
      ))
      
      const action = currentStatus ? 'deactivated' : 'activated'
      alert(`User ${action} successfully!`)
    } catch (error) {
      console.error('Error updating user status:', error)
      alert('Error updating user status')
    }
  }

  const handleChangeRole = async (userId: string, newRole: 'user' | 'admin') => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return
    }

    try {
      setUsers(users.map(user => 
        user._id === userId 
          ? { ...user, role: newRole }
          : user
      ))
      
      alert(`User role changed to ${newRole} successfully!`)
    } catch (error) {
      console.error('Error changing user role:', error)
      alert('Error changing user role')
    }
  }

  return (
    <AdminLayout title="Users Management">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
          <p className="text-gray-600">Manage registered users and their permissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">1,198</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Ban className="h-4 w-4 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive Users</p>
                <p className="text-2xl font-bold text-gray-900">49</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
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
                setSelectedRole('all')
                setSelectedStatus('all')
                setCurrentPage(1)
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="flex items-center space-x-1">
                              {user.emailVerified ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                              )}
                              <span className="text-xs text-gray-500">
                                {user.emailVerified ? 'Verified' : 'Unverified'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                          {user.provider}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleChangeRole(user._id, e.target.value as 'user' | 'admin')}
                          className={`text-xs font-semibold px-2 py-1 rounded-full border-0 ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block text-left">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default UsersManagement