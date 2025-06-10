import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Attraction from '@/models/Attraction'
import Review from '@/models/Review'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const attraction = await Attraction.findById(params.id)
    
    if (!attraction) {
      return NextResponse.json(
        { error: 'Attraction not found' },
        { status: 404 }
      )
    }

    // Get reviews for this attraction
    const reviews = await Review.find({
      target: params.id,
      targetType: 'Attraction',
      isApproved: true,
    })
      .populate('user', 'name image')
      .sort({ createdAt: -1 })
      .limit(10)

    return NextResponse.json({
      attraction,
      reviews,
    })

  } catch (error) {
    console.error('Error fetching attraction:', error)
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
    // This would typically require admin authentication
    const data = await request.json()
    
    await dbConnect()
    
    const attraction = await Attraction.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    )
    
    if (!attraction) {
      return NextResponse.json(
        { error: 'Attraction not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(attraction)

  } catch (error) {
    console.error('Error updating attraction:', error)
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
    // This would typically require admin authentication
    await dbConnect()
    
    const attraction = await Attraction.findByIdAndDelete(params.id)
    
    if (!attraction) {
      return NextResponse.json(
        { error: 'Attraction not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Attraction deleted successfully' })

  } catch (error) {
    console.error('Error deleting attraction:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}