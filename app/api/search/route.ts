import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Attraction from '@/models/Attraction'
import Guide from '@/models/Guide'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') || 'all' // all, attractions, guides
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    const searchRegex = new RegExp(query, 'i')
    
    let results: {
      attractions: any[];
      guides: any[];
      total: number;
    } = {
      attractions: [],
      guides: [],
      total: 0
    }

    // Search attractions
    if (type === 'all' || type === 'attractions') {
      const attractions = await Attraction.find({
        isActive: true,
        $or: [
          { 'name.en': searchRegex },
          { 'name.zh': searchRegex },
          { 'description.en': searchRegex },
          { 'description.zh': searchRegex },
          { 'location.city': searchRegex },
          { 'location.province': searchRegex },
          { highlights: { $in: [searchRegex] } },
        ],
      })
        .limit(type === 'attractions' ? limit : Math.floor(limit / 2))
        .select('name description location images category rating reviewCount')
        .lean()

      results.attractions = attractions.map(attraction => ({
        ...attraction,
        type: 'attraction'
      }))
    }

    // Search guides
    if (type === 'all' || type === 'guides') {
      const guides = await Guide.find({
        isPublished: true,
        $or: [
          { 'title.en': searchRegex },
          { 'title.zh': searchRegex },
          { 'excerpt.en': searchRegex },
          { 'excerpt.zh': searchRegex },
          { 'content.en': searchRegex },
          { 'content.zh': searchRegex },
          { tags: { $in: [searchRegex] } },
        ],
      })
        .populate('author', 'name image')
        .limit(type === 'guides' ? limit : Math.floor(limit / 2))
        .select('title excerpt coverImage category tags readTime views likes publishedAt author')
        .lean()

      results.guides = guides.map(guide => ({
        ...guide,
        type: 'guide'
      }))
    }

    results.total = results.attractions.length + results.guides.length

    // Search suggestions
    const suggestions = await generateSearchSuggestions(query)

    return NextResponse.json({
      results,
      suggestions,
      query,
    })

  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function generateSearchSuggestions(query: string) {
  try {
    const suggestions: Array<{text: string; type: string}> = []
    
    // Get popular attractions that match
    const attractions = await Attraction.find({
      isActive: true,
      'name.en': { $regex: query, $options: 'i' }
    })
      .limit(5)
      .select('name')
      .lean()

    attractions.forEach(attraction => {
      suggestions.push({
        text: attraction.name.en,
        type: 'attraction'
      })
    })

    // Get popular cities
    const cities = await Attraction.aggregate([
      {
        $match: {
          isActive: true,
          'location.city': { $regex: query, $options: 'i' }
        }
      },
      {
        $group: {
          _id: '$location.city',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 3
      }
    ])

    cities.forEach(city => {
      suggestions.push({
        text: city._id,
        type: 'city'
      })
    })

    // Get popular guide categories
    const categories = await Guide.aggregate([
      {
        $match: {
          isPublished: true,
          category: { $regex: query, $options: 'i' }
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 2
      }
    ])

    categories.forEach(category => {
      suggestions.push({
        text: category._id.replace('-', ' '),
        type: 'category'
      })
    })

    return suggestions.slice(0, 10)
  } catch (error) {
    console.error('Error generating suggestions:', error)
    return []
  }
}