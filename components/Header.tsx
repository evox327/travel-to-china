'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Globe, Menu, X, MapPin, User, LogOut, Search } from 'lucide-react'
import AuthModal from './AuthModal'

const Header = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ]

  const navItems = [
    { key: 'home', label: currentLang === 'zh' ? '首页' : 'Home', href: '/' },
    { key: 'attractions', label: currentLang === 'zh' ? '景点' : 'Attractions', href: '/attractions' },
    { key: 'guides', label: currentLang === 'zh' ? '旅游攻略' : 'Travel Guides', href: '/guides' },
    { key: 'about', label: currentLang === 'zh' ? '关于中国' : 'About China', href: '/about' }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowSearch(false)
    }
  }

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-red-600" />
            <span className="text-xl font-bold text-gray-900">
              {currentLang === 'zh' ? '发现中国' : 'Discover China'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Search & Language Selector & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search China..."
                    className="w-64 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    autoFocus
                    onBlur={() => {
                      if (!searchQuery.trim()) {
                        setShowSearch(false)
                      }
                    }}
                  />
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-gray-700 hover:text-red-600 p-2 transition-colors"
                  title="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-600">
                <Globe className="h-4 w-4" />
                <span className="text-sm">{languages.find(l => l.code === currentLang)?.flag}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {session ? (
              // Authenticated user menu
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || ''}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                  <span className="text-sm font-medium">{session.user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Guest user buttons
              <>
                <button
                  onClick={() => {
                    setAuthModalTab('signin')
                    setShowAuthModal(true)
                  }}
                  className="text-red-600 hover:text-red-700 px-4 py-2 text-sm font-medium"
                >
                  {currentLang === 'zh' ? '登录' : 'Login'}
                </button>
                <button
                  onClick={() => {
                    setAuthModalTab('signup')
                    setShowAuthModal(true)
                  }}
                  className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {currentLang === 'zh' ? '注册' : 'Sign Up'}
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t pt-4 mt-4">
                {session ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || ''}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                      <span className="text-gray-900 font-medium">{session.user.name}</span>
                    </div>
                    <a
                      href="/profile"
                      className="text-gray-700 hover:text-red-600 block px-3 py-2 text-base font-medium"
                    >
                      Profile
                    </a>
                    <a
                      href="/settings"
                      className="text-gray-700 hover:text-red-600 block px-3 py-2 text-base font-medium"
                    >
                      Settings
                    </a>
                    <button
                      onClick={() => signOut()}
                      className="text-gray-700 hover:text-red-600 block px-3 py-2 text-base font-medium w-full text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setAuthModalTab('signin')
                        setShowAuthModal(true)
                        setIsMenuOpen(false)
                      }}
                      className="text-red-600 hover:text-red-700 block px-3 py-2 text-base font-medium"
                    >
                      {currentLang === 'zh' ? '登录' : 'Login'}
                    </button>
                    <button
                      onClick={() => {
                        setAuthModalTab('signup')
                        setShowAuthModal(true)
                        setIsMenuOpen(false)
                      }}
                      className="bg-red-600 text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                    >
                      {currentLang === 'zh' ? '注册' : 'Sign Up'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
      />
    </header>
  )
}

export default Header