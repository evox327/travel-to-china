'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  Eye, ThumbsUp, Calendar, User, Clock, Share2, Bookmark,
  MessageCircle, Star, ChevronDown, ChevronUp, MapPin,
  DollarSign, Utensils, Bed, Car
} from 'lucide-react'

// Static data for Cloudflare deployment fallback
const getStaticGuideData = (id: string): Guide | null => {
  const guides: Record<string, Guide> = {
    'beijing-first-time': {
      _id: 'beijing-first-time',
      title: { en: 'First Time in Beijing: Complete 7-Day Guide', zh: '北京初游：完整7日攻略' },
      excerpt: { 
        en: 'Everything you need to know for your first visit to China\'s capital city, including must-see attractions, local food, and cultural tips.',
        zh: '初次游览中国首都所需了解的一切，包括必看景点、当地美食和文化贴士。'
      },
      content: {
        en: `# Welcome to Beijing: Your Complete 7-Day Guide

Beijing, China's magnificent capital, offers first-time visitors an incredible journey through 3,000 years of history. This comprehensive guide will help you make the most of your week in this amazing city.

## Day 1-2: Imperial Beijing
Start with the iconic Forbidden City and Tiananmen Square. These UNESCO World Heritage sites showcase the grandeur of imperial China.

## Day 3-4: The Great Wall Adventure
Visit the Mutianyu section of the Great Wall for the best combination of accessibility and authentic experience.

## Day 5-6: Cultural Immersion
Explore hutongs, visit temples, and experience local markets. Don't miss the Temple of Heaven and Summer Palace.

## Day 7: Modern Beijing
Discover contemporary Beijing with its shopping districts, modern architecture, and vibrant nightlife.

## Local Food Guide
- **Peking Duck**: The city's signature dish
- **Jianbing**: Street breakfast crepe
- **Hot Pot**: Perfect for social dining
- **Beijing Noodles**: Try zhajiangmian

## Transportation Tips
Use the extensive subway system and get a transportation card for convenience.`,
        zh: '欢迎来到北京：完整7日指南\n\n北京是中国宏伟的首都，为初次游客提供了一次穿越3000年历史的不可思议的旅程。'
      },
      author: { _id: 'author1', name: 'Li Wei', image: '/images/author-li-wei.jpg' },
      category: 'first-time',
      tags: ['Beijing', 'First Time', 'Culture', 'Food'],
      coverImage: '/images/forbidden-city.jpg',
      images: ['/images/forbidden-city.jpg', '/images/hero-great-wall.jpg'],
      readTime: 15,
      views: 2847,
      likes: 89,
      publishedAt: '2024-11-15T10:00:00Z',
      itinerary: [
        {
          day: 1,
          title: 'Arrival & City Center',
          description: 'Get oriented in Beijing and visit Tiananmen Square',
          activities: ['Check into hotel', 'Visit Tiananmen Square', 'Explore Wangfujing Street'],
          tips: ['Exchange money', 'Get local SIM card', 'Download translation app']
        },
        {
          day: 2,
          title: 'Forbidden City',
          description: 'Full day exploring the imperial palace',
          activities: ['Early morning Forbidden City visit', 'Jingshan Park for sunset views'],
          tips: ['Book tickets online', 'Bring comfortable shoes', 'Allow full day']
        }
      ],
      budget: [
        {
          category: 'Accommodation',
          description: 'Hotel costs per night',
          lowBudget: 200,
          midBudget: 500,
          highBudget: 1200,
          currency: 'CNY'
        },
        {
          category: 'Food',
          description: 'Daily meal expenses',
          lowBudget: 100,
          midBudget: 300,
          highBudget: 800,
          currency: 'CNY'
        }
      ]
    },
    'shanghai-food': {
      _id: 'shanghai-food',
      title: { en: 'Shanghai Food Paradise: Local Eats Guide', zh: '上海美食天堂：本地美食指南' },
      excerpt: {
        en: 'Discover the best local food in Shanghai, from street snacks to fine dining, with insider tips on where locals actually eat.',
        zh: '发现上海最好的本地美食，从街头小吃到精致餐饮，内含当地人真正用餐地点的内幕贴士。'
      },
      content: {
        en: `# Shanghai Food Paradise: Your Ultimate Culinary Guide

Shanghai's food scene is a delicious blend of traditional Shanghainese cuisine and international flavors. This guide will take you on a culinary journey through the city's best eats.

## Must-Try Shanghainese Dishes
- **Xiaolongbao**: Soup dumplings that are Shanghai's signature
- **Shengjianbao**: Pan-fried soup buns
- **Red-braised pork**: Sweet and savory comfort food
- **Hairy crab**: Seasonal delicacy (autumn)

## Best Food Districts
- **Yu Garden area**: Traditional snacks
- **French Concession**: International cuisine
- **Nanjing Road**: Street food and restaurants
- **Xintiandi**: Upscale dining`,
        zh: '上海美食天堂：您的终极美食指南\n\n上海的美食场景是传统上海菜和国际风味的美味融合。'
      },
      author: { _id: 'author2', name: 'Lisa Wang', image: '/images/author-lisa-wang.jpg' },
      category: 'food',
      tags: ['Shanghai', 'Food', 'Local Cuisine', 'Restaurants'],
      coverImage: '/images/shanghai-food.jpg',
      images: ['/images/shanghai-food.jpg'],
      readTime: 12,
      views: 1923,
      likes: 76,
      publishedAt: '2024-11-10T14:30:00Z'
    }
  }
  return guides[id] || null
}

const getStaticGuideReviews = (guideId: string): Review[] => {
  return [
    {
      _id: 'review1',
      user: { name: 'Sarah Chen', image: '/images/avatar-sarah-chen.jpg' },
      rating: 5,
      comment: 'Incredibly detailed and helpful guide! Used it for my Beijing trip and it was perfect.',
      helpful: 15,
      publishedAt: '2024-12-01T10:00:00Z'
    },
    {
      _id: 'review2',
      user: { name: 'Michael Zhang', image: '/images/avatar-michael-zhang.jpg' },
      rating: 4,
      comment: 'Great recommendations, especially for food. The itinerary was very practical.',
      helpful: 8,
      publishedAt: '2024-11-28T16:20:00Z'
    }
  ]
}

interface Guide {
  _id: string
  title: Record<string, string>
  content: Record<string, string>
  excerpt: Record<string, string>
  author: {
    _id: string
    name: string
    image?: string
  }
  category: string
  tags: string[]
  coverImage: string
  images: string[]
  readTime: number
  views: number
  likes: number
  publishedAt: string
  itinerary?: {
    day: number
    title: string
    description: string
    activities: string[]
    tips: string[]
  }[]
  budget?: {
    category: string
    description: string
    lowBudget: number
    midBudget: number
    highBudget: number
    currency: string
  }[]
  recommendations?: {
    hotels: {
      name: string
      price: string
      rating: number
      description: string
    }[]
    restaurants: {
      name: string
      cuisine: string
      priceRange: string
      rating: number
      description: string
    }[]
    attractions: {
      name: string
      price: string
      duration: string
      rating: number
      description: string
    }[]
  }
}

interface Review {
  _id: string
  user: {
    name: string
    image?: string
  }
  rating: number
  comment: string
  helpful: number
  publishedAt: string
}

const GuideDetailPage = () => {
  const { data: session } = useSession()
  const params = useParams()
  const guideId = params.id as string

  const [guide, setGuide] = useState<Guide | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('overview')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showFullItinerary, setShowFullItinerary] = useState(false)

  useEffect(() => {
    fetchGuide()
    fetchReviews()
  }, [guideId])

  const fetchGuide = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/guides/${guideId}`)
      if (response.ok) {
        const data = await response.json()
        setGuide(data.guide)
      } else {
        // Fallback to static data for Cloudflare deployment
        const staticGuide = getStaticGuideData(guideId)
        if (staticGuide) {
          setGuide(staticGuide)
        }
      }
    } catch (error) {
      console.error('Error fetching guide:', error)
      // Fallback to static data for Cloudflare deployment
      const staticGuide: Guide = {
        _id: guideId,
        title: { en: 'Ultimate Beijing Travel Guide', zh: '北京终极旅游指南' },
        content: { 
          en: `# Welcome to Beijing, China's Imperial Capital

Beijing, the capital of China, is a city where ancient history meets modern innovation. With over 3,000 years of history, Beijing offers visitors an incredible journey through Chinese culture, from the magnificent Forbidden City to the bustling streets of modern China.

## Getting Started

Beijing is home to more than 21 million people and serves as China's political, educational, and cultural center. The city seamlessly blends traditional architecture with modern skyscrapers, creating a unique urban landscape that tells the story of China's past, present, and future.

## Top Attractions You Can't Miss

### The Great Wall of China
No visit to Beijing is complete without seeing this iconic symbol of China. The Mutianyu section offers the best combination of accessibility and authenticity.

### Forbidden City
Once home to Chinese emperors, this vast palace complex is now one of the world's most impressive museums.

### Temple of Heaven
A masterpiece of Ming Dynasty architecture where emperors once prayed for good harvests.

### Summer Palace
A stunning imperial garden that showcases Chinese landscape design principles.

## Local Food Scene

Beijing's culinary scene is legendary. Don't miss:
- **Peking Duck**: The city's most famous dish
- **Jianbing**: Popular breakfast crepe
- **Zhajiangmian**: Beijing-style noodles
- **Mongolian Hot Pot**: Perfect for cold winter days

## Getting Around

Beijing has an excellent subway system that connects all major attractions. Consider getting a transportation card for convenience. Taxis and ride-sharing apps like Didi are also widely available.

## Best Time to Visit

Spring (April-May) and autumn (September-October) offer the most pleasant weather. Summer can be hot and humid, while winter is cold but offers fewer crowds.

## Cultural Tips

- Learn basic Mandarin phrases
- Respect local customs at temples
- Bargain at markets but not in malls
- Carry cash as some places don't accept cards

## Budget Planning

- Budget travelers: $30-50 per day
- Mid-range: $50-100 per day  
- Luxury: $150+ per day

This comprehensive guide will help you make the most of your Beijing adventure!`, 
          zh: '欢迎来到北京，中国的帝都...' 
        },
        excerpt: { 
          en: 'Complete 7-day Beijing travel guide covering the Great Wall, Forbidden City, local food, and insider tips for first-time visitors.',
          zh: '完整的北京7日旅游指南，涵盖长城、紫禁城、当地美食和初次游览贴士。'
        },
        author: {
          _id: '1',
          name: 'Li Wei',
          image: '/images/avatar-li-wei.jpg'
        },
        category: 'city-guide',
        tags: ['Beijing', 'First Time', 'Culture', 'Food', 'History'],
        coverImage: '/images/forbidden-city.jpg',
        images: [
          '/images/forbidden-city.jpg',
          '/images/hero-great-wall.jpg',
          '/images/author-li-wei.jpg'
        ],
        readTime: 15,
        views: 24680,
        likes: 892,
        publishedAt: '2024-01-15',
        itinerary: [
          {
            day: 1,
            title: 'Arrival & Tiananmen Square',
            description: 'Arrive in Beijing and start with the political heart of China',
            activities: [
              'Check into hotel',
              'Visit Tiananmen Square',
              'Explore surrounding hutongs',
              'Traditional Peking duck dinner'
            ],
            tips: [
              'Arrive early to avoid crowds',
              'Bring ID for security checks',
              'Book duck restaurant in advance'
            ]
          },
          {
            day: 2,
            title: 'Forbidden City & Jingshan Park',
            description: 'Explore the imperial palace and get panoramic city views',
            activities: [
              'Early entry to Forbidden City',
              'Audio guide tour',
              'Lunch in nearby hutong',
              'Sunset at Jingshan Park'
            ],
            tips: [
              'Book tickets online in advance',
              'Wear comfortable walking shoes',
              'Allow 4-5 hours for full exploration'
            ]
          },
          {
            day: 3,
            title: 'Great Wall Adventure',
            description: 'Experience one of the world\'s greatest wonders',
            activities: [
              'Early departure to Mutianyu',
              'Cable car or hiking access',
              'Wall walking and photography',
              'Local farmhouse lunch'
            ],
            tips: [
              'Book tour or arrange private transport',
              'Bring water and snacks',
              'Check weather conditions'
            ]
          }
        ],
        budget: [
          {
            category: 'Accommodation',
            description: 'Per night costs for different comfort levels',
            lowBudget: 25,
            midBudget: 60,
            highBudget: 150,
            currency: 'USD'
          },
          {
            category: 'Food',
            description: 'Daily meal costs including street food to restaurants',
            lowBudget: 10,
            midBudget: 25,
            highBudget: 60,
            currency: 'USD'
          },
          {
            category: 'Transportation',
            description: 'Daily transport including subway and occasional taxis',
            lowBudget: 5,
            midBudget: 15,
            highBudget: 30,
            currency: 'USD'
          }
        ],
        recommendations: {
          hotels: [
            {
              name: 'Beijing Hotel NUO',
              price: '$200-300',
              rating: 4.8,
              description: 'Luxury hotel near Forbidden City with traditional Chinese design'
            },
            {
              name: 'Hutong Inn',
              price: '$50-80',
              rating: 4.2,
              description: 'Boutique courtyard hotel in historic hutong area'
            }
          ],
          restaurants: [
            {
              name: 'Quanjude Roast Duck',
              cuisine: 'Beijing',
              priceRange: '$30-50',
              rating: 4.5,
              description: 'Famous century-old Peking duck restaurant'
            },
            {
              name: 'Ghost Street Food Market',
              cuisine: 'Street Food',
              priceRange: '$5-15',
              rating: 4.3,
              description: 'Authentic local street food experience'
            }
          ],
          attractions: [
            {
              name: 'Forbidden City',
              price: '$8',
              duration: '4-5 hours',
              rating: 4.9,
              description: 'Imperial palace complex with incredible architecture'
            },
            {
              name: 'Great Wall (Mutianyu)',
              price: '$40',
              duration: 'Full day',
              rating: 4.8,
              description: 'Most accessible and scenic section near Beijing'
            }
          ]
        }
      }
      setGuide(staticGuide)
    }
    setLoading(false)
  }

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/guides/${guideId}/reviews`)
      const data = await response.json()
      setReviews(data.reviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      // 静态评论数据
      const staticReviews: Review[] = [
        {
          _id: '1',
          user: { name: 'Sarah Johnson', image: '/images/user-john-doe.jpg' },
          rating: 5,
          comment: 'Incredible guide! Helped me plan the perfect week in Beijing. The itinerary was spot-on and saved me so much research time.',
          helpful: 24,
          publishedAt: '2024-01-20'
        },
        {
          _id: '2',
          user: { name: 'Mike Chen' },
          rating: 4,
          comment: 'Very detailed and well-researched. The budget breakdowns were especially helpful for planning.',
          helpful: 18,
          publishedAt: '2024-01-18'
        }
      ]
      setReviews(staticReviews)
    }
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  const shareGuide = () => {
    if (navigator.share) {
      navigator.share({
        title: guide?.title.en,
        text: guide?.excerpt.en,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-300 rounded-2xl mb-8"></div>
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Guide Not Found</h1>
            <p className="text-gray-600">The guide you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <img
            src={guide.coverImage}
            alt={guide.title.en}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {guide.title.en}
              </h1>
              <p className="text-xl opacity-90 chinese-font">
                {guide.title.zh}
              </p>
            </div>
          </div>
        </section>

        {/* Guide Info Bar */}
        <section className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-6">
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

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    isLiked
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Like</span>
                </button>
                
                <button
                  onClick={toggleBookmark}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    isBookmarked
                      ? 'bg-blue-50 border-blue-200 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </button>
                
                <button
                  onClick={shareGuide}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {['overview', 'itinerary', 'budget', 'recommendations', 'reviews'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeSection === section
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {activeSection === 'overview' && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="prose prose-lg max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: guide.content.en.replace(/\n/g, '<br>').replace(/# /g, '<h1>').replace(/## /g, '<h2>').replace(/### /g, '<h3>')
                      }} />
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {guide.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'itinerary' && guide.itinerary && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel Itinerary</h2>
                    <div className="space-y-6">
                      {guide.itinerary.slice(0, showFullItinerary ? undefined : 3).map((day, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {day.day}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">{day.title}</h3>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{day.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Activities</h4>
                              <ul className="space-y-1">
                                {day.activities.map((activity, i) => (
                                  <li key={i} className="text-gray-600 text-sm flex items-start space-x-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span>{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Pro Tips</h4>
                              <ul className="space-y-1">
                                {day.tips.map((tip, i) => (
                                  <li key={i} className="text-gray-600 text-sm flex items-start space-x-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {guide.itinerary.length > 3 && (
                      <div className="text-center mt-6">
                        <button
                          onClick={() => setShowFullItinerary(!showFullItinerary)}
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2 mx-auto"
                        >
                          <span>{showFullItinerary ? 'Show Less' : `Show All ${guide.itinerary.length} Days`}</span>
                          {showFullItinerary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeSection === 'budget' && guide.budget && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget Planning</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Budget</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Mid-Range</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Luxury</th>
                          </tr>
                        </thead>
                        <tbody>
                          {guide.budget.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100">
                              <td className="py-4 px-4">
                                <div>
                                  <div className="font-medium text-gray-900">{item.category}</div>
                                  <div className="text-sm text-gray-600">{item.description}</div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-green-600 font-medium">${item.lowBudget}</td>
                              <td className="py-4 px-4 text-blue-600 font-medium">${item.midBudget}</td>
                              <td className="py-4 px-4 text-purple-600 font-medium">${item.highBudget}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Note:</strong> Prices are estimates and may vary based on season, exchange rates, and personal preferences. 
                        Budget calculations are per person per day unless otherwise specified.
                      </p>
                    </div>
                  </div>
                )}

                {activeSection === 'recommendations' && guide.recommendations && (
                  <div className="space-y-8">
                    {/* Hotels */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <Bed className="h-6 w-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Recommended Hotels</h2>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {guide.recommendations.hotels.map((hotel, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-gray-900">{hotel.name}</h3>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-600">{hotel.rating}</span>
                              </div>
                            </div>
                            <p className="text-blue-600 font-medium mb-2">{hotel.price}</p>
                            <p className="text-gray-600 text-sm">{hotel.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Restaurants */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <Utensils className="h-6 w-6 text-green-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Recommended Restaurants</h2>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {guide.recommendations.restaurants.map((restaurant, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-600">{restaurant.rating}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">{restaurant.cuisine}</span>
                              <span className="text-green-600 font-medium">{restaurant.priceRange}</span>
                            </div>
                            <p className="text-gray-600 text-sm">{restaurant.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Attractions */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <MapPin className="h-6 w-6 text-red-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Must-Visit Attractions</h2>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {guide.recommendations.attractions.map((attraction, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-gray-900">{attraction.name}</h3>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-600">{attraction.rating}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">{attraction.duration}</span>
                              <span className="text-blue-600 font-medium">{attraction.price}</span>
                            </div>
                            <p className="text-gray-600 text-sm">{attraction.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'reviews' && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Traveler Reviews</h2>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            {review.user.image ? (
                              <img
                                src={review.user.image}
                                alt={review.user.name}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-600" />
                              </div>
                            )}
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                                  <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating
                                            ? 'text-yellow-500 fill-current'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.publishedAt).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <p className="text-gray-700 mb-3">{review.comment}</p>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <button className="flex items-center space-x-1 hover:text-gray-700">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>Helpful ({review.helpful})</span>
                                </button>
                                <button className="flex items-center space-x-1 hover:text-gray-700">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>Reply</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 mt-8 lg:mt-0">
                <div className="sticky top-32 space-y-6">
                  {/* Quick Stats */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Read Time</span>
                        <span className="font-medium">{guide.readTime} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Views</span>
                        <span className="font-medium">{guide.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Likes</span>
                        <span className="font-medium">{guide.likes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category</span>
                        <span className="font-medium capitalize">{guide.category.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Table of Contents */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      {['Overview', 'Itinerary', 'Budget', 'Recommendations', 'Reviews'].map((section) => (
                        <button
                          key={section}
                          onClick={() => setActiveSection(section.toLowerCase())}
                          className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeSection === section.toLowerCase()
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {section}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default GuideDetailPage