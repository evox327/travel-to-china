import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Attraction from '@/models/Attraction'
import { defaultCache, cacheUtils } from '@/lib/cache'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const city = searchParams.get('city')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'rating'

    // Generate cache key from query parameters
    const cacheKey = cacheUtils.generateKey(
      'attractions',
      page.toString(),
      limit.toString(),
      category || 'all',
      city || 'all',
      search || 'none',
      sort
    )

    // Try to get from cache first
    const cached = await defaultCache.get(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    await dbConnect()

    // Build query
    const query: any = { isActive: true }
    
    if (category) {
      query.category = category
    }
    
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' }
    }
    
    if (search) {
      query.$or = [
        { 'name.en': { $regex: search, $options: 'i' } },
        { 'name.zh': { $regex: search, $options: 'i' } },
        { 'description.en': { $regex: search, $options: 'i' } },
        { 'description.zh': { $regex: search, $options: 'i' } },
      ]
    }

    // Build sort
    let sortQuery: any = {}
    switch (sort) {
      case 'rating':
        sortQuery = { rating: -1 }
        break
      case 'name':
        sortQuery = { 'name.en': 1 }
        break
      case 'newest':
        sortQuery = { createdAt: -1 }
        break
      default:
        sortQuery = { rating: -1 }
    }

    const skip = (page - 1) * limit

    const [attractions, total] = await Promise.all([
      Attraction.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean(),
      Attraction.countDocuments(query)
    ])

    const result = {
      attractions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }

    // Cache the result for 5 minutes
    await defaultCache.set(cacheKey, result, 5 * 60 * 1000)

    return NextResponse.json(result)

  } catch (error) {
    console.error('Error fetching attractions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // This would typically require admin authentication
    const data = await request.json()
    
    await dbConnect()
    
    const attraction = await Attraction.create(data)
    
    return NextResponse.json(attraction, { status: 201 })

  } catch (error) {
    console.error('Error creating attraction:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}