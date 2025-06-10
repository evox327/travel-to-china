import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Guide from '@/models/Guide'
import { defaultCache, cacheUtils } from '@/lib/cache'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'newest'

    // Generate cache key from query parameters
    const cacheKey = cacheUtils.generateKey(
      'guides',
      page.toString(),
      limit.toString(),
      category || 'all',
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
    const query: any = { isPublished: true }
    
    if (category && category !== 'all') {
      query.category = category
    }
    
    if (search) {
      query.$or = [
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'title.zh': { $regex: search, $options: 'i' } },
        { 'excerpt.en': { $regex: search, $options: 'i' } },
        { 'excerpt.zh': { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ]
    }

    // Build sort
    let sortQuery: any = {}
    switch (sort) {
      case 'newest':
        sortQuery = { publishedAt: -1 }
        break
      case 'popular':
        sortQuery = { views: -1 }
        break
      case 'likes':
        sortQuery = { likes: -1 }
        break
      default:
        sortQuery = { publishedAt: -1 }
    }

    const skip = (page - 1) * limit

    const [guides, total] = await Promise.all([
      Guide.find(query)
        .populate('author', 'name image')
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean(),
      Guide.countDocuments(query)
    ])

    const result = {
      guides,
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
    console.error('Error fetching guides:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // This would typically require authentication
    const data = await request.json()
    
    await dbConnect()
    
    const guide = await Guide.create(data)
    
    return NextResponse.json(guide, { status: 201 })

  } catch (error) {
    console.error('Error creating guide:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}