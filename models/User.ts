import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  image?: string
  provider?: 'credentials' | 'facebook' | 'twitter'
  providerId?: string
  role: 'user' | 'admin'
  isActive: boolean
  emailVerified?: Date
  verificationToken?: string
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function() {
      return this.provider === 'credentials'
    },
  },
  image: {
    type: String,
  },
  provider: {
    type: String,
    enum: ['credentials', 'facebook', 'twitter'],
    default: 'credentials',
  },
  providerId: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  emailVerified: {
    type: Date,
  },
  verificationToken: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
}, {
  timestamps: true,
})

// Index for faster queries
UserSchema.index({ email: 1 })
UserSchema.index({ provider: 1, providerId: 1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)