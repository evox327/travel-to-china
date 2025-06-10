import mongoose, { Document, Schema } from 'mongoose'

export interface IGuide extends Document {
  title: Record<string, string>
  content: Record<string, string>
  excerpt: Record<string, string>
  author: mongoose.Types.ObjectId
  category: 'first-time' | 'food-culture' | 'adventure' | 'multi-city' | 'budget' | 'luxury'
  tags: string[]
  coverImage: string
  images: string[]
  readTime: number // in minutes
  views: number
  likes: number
  isPublished: boolean
  publishedAt?: Date
  itinerary?: {
    day: number
    title: string
    description: string
    activities: string[]
    accommodation?: string
    transportation?: string
    estimatedCost?: number
  }[]
  relatedAttractions: mongoose.Types.ObjectId[]
  seo: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  createdAt: Date
  updatedAt: Date
}

const GuideSchema = new Schema<IGuide>({
  title: {
    type: Map,
    of: String,
    required: true,
  },
  content: {
    type: Map,
    of: String,
    required: true,
  },
  excerpt: {
    type: Map,
    of: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['first-time', 'food-culture', 'adventure', 'multi-city', 'budget', 'luxury'],
    required: true,
  },
  tags: [String],
  coverImage: {
    type: String,
    required: true,
  },
  images: [String],
  readTime: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: Date,
  itinerary: [{
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    activities: [String],
    accommodation: String,
    transportation: String,
    estimatedCost: Number,
  }],
  relatedAttractions: [{
    type: Schema.Types.ObjectId,
    ref: 'Attraction',
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
}, {
  timestamps: true,
})

// Indexes
GuideSchema.index({ category: 1 })
GuideSchema.index({ isPublished: 1 })
GuideSchema.index({ publishedAt: -1 })
GuideSchema.index({ views: -1 })
GuideSchema.index({ tags: 1 })

export default mongoose.models.Guide || mongoose.model<IGuide>('Guide', GuideSchema)