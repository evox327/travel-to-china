import mongoose, { Document, Schema } from 'mongoose'

export interface IAttraction extends Document {
  name: Record<string, string> // Multi-language support
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
  category: 'historical' | 'natural' | 'cultural' | 'modern' | 'religious'
  rating: number
  reviewCount: number
  highlights: string[]
  ticketPrice: {
    adult: number
    child: number
    currency: string
  }
  duration: string // e.g., "2-3 hours"
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
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const AttractionSchema = new Schema<IAttraction>({
  name: {
    type: Map,
    of: String,
    required: true,
  },
  description: {
    type: Map,
    of: String,
    required: true,
  },
  location: {
    city: { type: String, required: true },
    province: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    }
  },
  images: [{ type: String, required: true }],
  category: {
    type: String,
    enum: ['historical', 'natural', 'cultural', 'modern', 'religious'],
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  highlights: [String],
  ticketPrice: {
    adult: { type: Number, required: true },
    child: { type: Number, required: true },
    currency: { type: String, default: 'CNY' },
  },
  duration: {
    type: String,
    required: true,
  },
  bestTimeToVisit: [String],
  openingHours: {
    open: { type: String, required: true },
    close: { type: String, required: true },
    note: String,
  },
  contact: {
    phone: String,
    website: String,
    email: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
})

// Indexes for better performance
AttractionSchema.index({ 'location.city': 1 })
AttractionSchema.index({ category: 1 })
AttractionSchema.index({ rating: -1 })
AttractionSchema.index({ 'location.coordinates': '2dsphere' })

export default mongoose.models.Attraction || mongoose.model<IAttraction>('Attraction', AttractionSchema)