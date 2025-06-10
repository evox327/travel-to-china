import mongoose, { Document, Schema } from 'mongoose'

export interface IReview extends Document {
  user: mongoose.Types.ObjectId
  target: mongoose.Types.ObjectId
  targetType: 'Attraction' | 'Guide'
  rating: number
  title?: string
  content: string
  images?: string[]
  likes: number
  replies: {
    user: mongoose.Types.ObjectId
    content: string
    createdAt: Date
  }[]
  isVerified: boolean
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  target: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'targetType',
  },
  targetType: {
    type: String,
    enum: ['Attraction', 'Guide'],
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  title: String,
  content: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  images: [String],
  likes: {
    type: Number,
    default: 0,
  },
  replies: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
})

// Indexes
ReviewSchema.index({ target: 1, targetType: 1 })
ReviewSchema.index({ user: 1 })
ReviewSchema.index({ rating: -1 })
ReviewSchema.index({ createdAt: -1 })

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)