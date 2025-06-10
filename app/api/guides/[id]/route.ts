import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Guide from '@/models/Guide'
import Review from '@/models/Review'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    // Increment view count
    const guide = await Guide.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'name image')
      .populate('relatedAttractions')
    
    if (!guide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      )
    }

    // Get reviews for this guide
    const reviews = await Review.find({
      target: params.id,
      targetType: 'Guide',
      isApproved: true,
    })
      .populate('user', 'name image')
      .sort({ createdAt: -1 })
      .limit(10)

    return NextResponse.json({
      guide,
      reviews,
    })

  } catch (error) {
    console.error('Error fetching guide:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // This would typically require authentication and ownership check
    const data = await request.json()
    
    await dbConnect()
    
    const guide = await Guide.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    )
    
    if (!guide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(guide)

  } catch (error) {
    console.error('Error updating guide:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // This would typically require authentication and ownership check
    await dbConnect()
    
    const guide = await Guide.findByIdAndDelete(params.id)
    
    if (!guide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Guide deleted successfully' })

  } catch (error) {
    console.error('Error deleting guide:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}