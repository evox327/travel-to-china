import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Review from '@/models/Review'
import Attraction from '@/models/Attraction'
import Guide from '@/models/Guide'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { target, targetType, rating, title, content, images } = await request.json()

    if (!target || !targetType || !rating || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Check if target exists
    const Model = targetType === 'Attraction' ? Attraction : Guide
    const targetDoc = await Model.findById(target)
    
    if (!targetDoc) {
      return NextResponse.json(
        { error: 'Target not found' },
        { status: 404 }
      )
    }

    // Check if user already reviewed this item
    const existingReview = await Review.findOne({
      user: session.user.id,
      target,
      targetType,
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this item' },
        { status: 400 }
      )
    }

    // Create review
    const review = await Review.create({
      user: session.user.id,
      target,
      targetType,
      rating,
      title,
      content,
      images: images || [],
    })

    // Update target's rating and review count
    const reviews = await Review.find({ target, targetType, isApproved: true })
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    
    await Model.findByIdAndUpdate(target, {
      rating: Math.round(averageRating * 10) / 10,
      reviewCount: reviews.length,
    })

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name image')

    return NextResponse.json(populatedReview, { status: 201 })

  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const target = searchParams.get('target')
    const targetType = searchParams.get('targetType')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!target || !targetType) {
      return NextResponse.json(
        { error: 'Target and targetType are required' },
        { status: 400 }
      )
    }

    const skip = (page - 1) * limit

    const [reviews, total] = await Promise.all([
      Review.find({ target, targetType, isApproved: true })
        .populate('user', 'name image')
        .populate('replies.user', 'name image')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Review.countDocuments({ target, targetType, isApproved: true })
    ])

    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })

  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}