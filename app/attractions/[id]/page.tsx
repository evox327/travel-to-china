'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MapView from '@/components/MapView'
import { 
  MapPin, Star, Clock, Users, Phone, Globe, Mail, 
  Calendar, Camera, Heart, Share2, ChevronLeft, ChevronRight,
  MessageCircle, ThumbsUp
} from 'lucide-react'

interface Attraction {
  _id: string
  name: Record<string, string>
  description: Record<string, string>
  location: {
    city: string
    province: string
    coordinates: {
      lat: number
      lng: number
    }
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
  bestTimeToVisit: string[]
  openingHours: {
    open: string
    close: string
    note?: string
  }
  contact: {
    phone?: string
    website?: string
    email?: string
  }
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
  images?: string[]
  likes: number
  createdAt: string
}

const AttractionDetailPage = () => {
  const { data: session } = useSession()
  const params = useParams()
  const attractionId = params.id as string

  const [attraction, setAttraction] = useState<Attraction | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: ''
  })

  useEffect(() => {
    if (attractionId) {
      fetchAttractionDetails()
    }
  }, [attractionId])

  const fetchAttractionDetails = async () => {
    try {
      const response = await fetch(`/api/attractions/${attractionId}`)
      const data = await response.json()
      
      setAttraction(data.attraction)
      setReviews(data.reviews)
    } catch (error) {
      console.error('Error fetching attraction details:', error)
    }
    setLoading(false)
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
          target: attractionId,
          targetType: 'Attraction',
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

  const nextImage = () => {
    if (attraction) {
      setCurrentImageIndex((prev) => 
        prev === attraction.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (attraction) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? attraction.images.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!attraction) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Attraction not found</h1>
            <p className="text-gray-600">The attraction you're looking for doesn't exist.</p>
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
        {/* Image Gallery */}
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={attraction.images[currentImageIndex]}
            alt={attraction.name.en}
            className="w-full h-full object-cover"
          />
          
          {attraction.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {attraction.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute top-4 left-4">
            <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {attraction.category}
            </span>
          </div>

          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="bg-white bg-opacity-90 text-gray-800 p-2 rounded-full hover:bg-opacity-100 transition-opacity">
              <Heart className="h-5 w-5" />
            </button>
            <button className="bg-white bg-opacity-90 text-gray-800 p-2 rounded-full hover:bg-opacity-100 transition-opacity">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
              {/* Left Column */}
              <div className="lg:col-span-2">
                {/* Title and Basic Info */}
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {attraction.name.en}
                  </h1>
                  <p className="text-2xl text-gray-600 chinese-font mb-4">
                    {attraction.name.zh}
                  </p>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-lg font-semibold">{attraction.rating}</span>
                      <span className="text-gray-600">({attraction.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MapPin className="h-5 w-5" />
                      <span>{attraction.location.city}, {attraction.location.province}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {attraction.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {attraction.description.en}
                  </p>
                </div>

                {/* Map Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
                  <MapView
                    latitude={attraction.location.coordinates.lat}
                    longitude={attraction.location.coordinates.lng}
                    name={attraction.name.en}
                    address={`${attraction.location.city}, ${attraction.location.province}`}
                    className="h-64 md:h-80"
                  />
                </div>

                {/* Reviews Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Reviews ({reviews.length})
                    </h2>
                    {session && (
                      <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Write Review
                      </button>
                    )}
                  </div>

                  {/* Review Form */}
                  {showReviewForm && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            rows={4}
                            placeholder="Share your experience..."
                            required
                          />
                        </div>

                        <div className="flex space-x-3">
                          <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
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
                      <div key={review._id} className="bg-white rounded-lg shadow-lg p-6">
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
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                                <ThumbsUp className="h-4 w-4" />
                                <span className="text-sm">{review.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
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

              {/* Right Column - Info Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Information</h3>

                  <div className="space-y-4">
                    {/* Price */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Ticket Price</h4>
                      <div className="text-gray-700">
                        <div>Adult: ¥{attraction.ticketPrice.adult}</div>
                        <div>Child: ¥{attraction.ticketPrice.child}</div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration
                      </h4>
                      <p className="text-gray-700">{attraction.duration}</p>
                    </div>

                    {/* Opening Hours */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Opening Hours
                      </h4>
                      <p className="text-gray-700">
                        {attraction.openingHours.open} - {attraction.openingHours.close}
                      </p>
                      {attraction.openingHours.note && (
                        <p className="text-sm text-gray-500 mt-1">{attraction.openingHours.note}</p>
                      )}
                    </div>

                    {/* Best Time to Visit */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Best Time to Visit</h4>
                      <div className="flex flex-wrap gap-2">
                        {attraction.bestTimeToVisit.map((season, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-sm"
                          >
                            {season}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    {(attraction.contact.phone || attraction.contact.website || attraction.contact.email) && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                        <div className="space-y-2">
                          {attraction.contact.phone && (
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-700">{attraction.contact.phone}</span>
                            </div>
                          )}
                          {attraction.contact.website && (
                            <div className="flex items-center space-x-2">
                              <Globe className="h-4 w-4 text-gray-500" />
                              <a
                                href={attraction.contact.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-600 hover:underline"
                              >
                                Website
                              </a>
                            </div>
                          )}
                          {attraction.contact.email && (
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <a
                                href={`mailto:${attraction.contact.email}`}
                                className="text-red-600 hover:underline"
                              >
                                {attraction.contact.email}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold mt-6 transition-colors">
                    Book Now
                  </button>
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

export default AttractionDetailPage