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
    accommodation?: string
    transportation?: string
    estimatedCost?: number
  }[]
  relatedAttractions: any[]
}

interface Review {
  _id: string
  user: {
    name: string
    image?: string
  }
  rating: number
  title?: string
  content: string
  likes: number
  createdAt: string
}

const GuideDetailPage = () => {
  const { data: session } = useSession()
  const params = useParams()
  const guideId = params.id as string

  const [guide, setGuide] = useState<Guide | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [expandedDay, setExpandedDay] = useState<number | null>(null)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: ''
  })

  useEffect(() => {
    if (guideId) {
      fetchGuideDetails()
    }
  }, [guideId])

  const fetchGuideDetails = async () => {
    try {
      const response = await fetch(`/api/guides/${guideId}`)
      const data = await response.json()
      
      setGuide(data.guide)
      setReviews(data.reviews)
    } catch (error) {
      console.error('Error fetching guide details:', error)
    }
    setLoading(false)
  }

  const handleLike = async () => {
    if (!session) {
      alert('Please login to like guides')
      return
    }
    
    setLiked(!liked)
    // API call to update likes would go here
  }

  const handleBookmark = async () => {
    if (!session) {
      alert('Please login to bookmark guides')
      return
    }
    
    setBookmarked(!bookmarked)
    // API call to update bookmarks would go here
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session) {
      alert('Please login to submit a review')
      return
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target: guideId,
          targetType: 'Guide',
          ...newReview
        }),
      })

      if (response.ok) {
        const review = await response.json()
        setReviews([review, ...reviews])
        setNewReview({ rating: 5, title: '', content: '' })
        setShowReviewForm(false)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Guide not found</h1>
            <p className="text-gray-600">The travel guide you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative">
          <div className="h-96 md:h-[500px] overflow-hidden">
            <img
              src={guide.coverImage}
              alt={guide.title.en}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <div className="text-white">
                <div className="mb-4">
                  <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium capitalize backdrop-blur-sm">
                    {guide.category.replace('-', ' ')}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {guide.title.en}
                </h1>
                <p className="text-xl chinese-font mb-6">
                  {guide.title.zh}
                </p>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{guide.readTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{guide.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{guide.likes} likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-4 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Author Info */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {guide.author.image ? (
                        <img
                          src={guide.author.image}
                          alt={guide.author.name}
                          className="w-16 h-16 rounded-full"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-8 w-8 text-gray-600" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{guide.author.name}</h3>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Published {new Date(guide.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleLike}
                        className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                          liked
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{guide.likes + (liked ? 1 : 0)}</span>
                      </button>
                      
                      <button
                        onClick={handleBookmark}
                        className={`p-2 rounded-lg transition-colors ${
                          bookmarked
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                      
                      <button className="p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-8">
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

                {/* Content */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: guide.content.en.replace(/\n/g, '<br/>') }} />
                  </div>
                </div>

                {/* Itinerary */}
                {guide.itinerary && guide.itinerary.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
                    
                    <div className="space-y-4">
                      {guide.itinerary.map((day, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                {day.day}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">{day.title}</h3>
                            </div>
                            {expandedDay === day.day ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </button>
                          
                          {expandedDay === day.day && (
                            <div className="px-6 py-4 bg-white">
                              <p className="text-gray-700 mb-4">{day.description}</p>
                              
                              {day.activities.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="font-semibold text-gray-900 mb-2">Activities:</h4>
                                  <ul className="list-disc list-inside space-y-1">
                                    {day.activities.map((activity, actIndex) => (
                                      <li key={actIndex} className="text-gray-700">{activity}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                {day.accommodation && (
                                  <div className="flex items-center space-x-2 text-gray-600">
                                    <Bed className="h-4 w-4" />
                                    <span>{day.accommodation}</span>
                                  </div>
                                )}
                                {day.transportation && (
                                  <div className="flex items-center space-x-2 text-gray-600">
                                    <Car className="h-4 w-4" />
                                    <span>{day.transportation}</span>
                                  </div>
                                )}
                                {day.estimatedCost && (
                                  <div className="flex items-center space-x-2 text-gray-600">
                                    <DollarSign className="h-4 w-4" />
                                    <span>¥{day.estimatedCost}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Attractions */}
                {guide.relatedAttractions && guide.relatedAttractions.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Attractions</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {guide.relatedAttractions.map((attraction, index) => (
                        <a
                          key={index}
                          href={`/attractions/${attraction._id}`}
                          className="group flex space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                        >
                          <img
                            src={attraction.images[0]}
                            alt={attraction.name.en}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {attraction.name.en}
                            </h3>
                            <div className="flex items-center space-x-1 text-gray-600 mt-1">
                              <MapPin className="h-3 w-3" />
                              <span className="text-sm">{attraction.location.city}</span>
                            </div>
                            <div className="flex items-center space-x-1 mt-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600">{attraction.rating}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Section */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Reviews ({reviews.length})
                    </h2>
                    {session && (
                      <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Write Review
                      </button>
                    )}
                  </div>

                  {/* Review Form */}
                  {showReviewForm && (
                    <div className="border border-gray-200 rounded-lg p-6 mb-6">
                      <form onSubmit={handleSubmitReview}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating
                          </label>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => setNewReview({ ...newReview, rating })}
                                className="text-2xl focus:outline-none"
                              >
                                <Star
                                  className={`h-6 w-6 ${
                                    rating <= newReview.rating
                                      ? 'text-yellow-500 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title (Optional)
                          </label>
                          <input
                            type="text"
                            value={newReview.title}
                            onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Give your review a title..."
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Review
                          </label>
                          <textarea
                            value={newReview.content}
                            onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            placeholder="Share your thoughts about this guide..."
                            required
                          />
                        </div>

                        <div className="flex space-x-3">
                          <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                          >
                            Submit Review
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowReviewForm(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {review.user.image ? (
                              <img
                                src={review.user.image}
                                alt={review.user.name}
                                className="w-12 h-12 rounded-full"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-medium">
                                  {review.user.name[0]}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                              <div className="flex space-x-1">
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
                              <span className="text-gray-500 text-sm">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            {review.title && (
                              <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                            )}

                            <p className="text-gray-700 mb-4">{review.content}</p>

                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                                <ThumbsUp className="h-4 w-4" />
                                <span className="text-sm">{review.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                                <MessageCircle className="h-4 w-4" />
                                <span className="text-sm">Reply</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 mt-8 lg:mt-0">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Guide Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Reading Time</h4>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Clock className="h-4 w-4" />
                        <span>{guide.readTime} minutes</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {guide.category.replace('-', ' ')}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Published</h4>
                      <p className="text-gray-700">{new Date(guide.publishedAt).toLocaleDateString()}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Views</h4>
                      <p className="text-gray-700">{guide.views.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                      Download PDF
                    </button>
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