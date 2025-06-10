import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Attraction from '@/models/Attraction'
import Guide from '@/models/Guide'

export async function GET(request: NextRequest) {
  try {
    // 为静态导出返回静态数据
    const staticResults = {
      results: {
        attractions: [
          {
            _id: '1',
            name: { en: 'Great Wall of China', zh: '长城' },
            description: { en: 'A series of fortifications and walls built to protect ancient Chinese states', zh: '古代中国为防御侵略而建造的一系列防御工事' },
            location: { city: 'Beijing', province: 'Beijing' },
            images: ['https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            category: 'historical',
            rating: 4.8,
            reviewCount: 15420,
            type: 'attraction'
          }
        ],
        guides: [
          {
            _id: '1',
            title: { en: 'First Time Visiting Beijing', zh: '第一次访问北京' },
            excerpt: { en: 'Complete guide for first-time visitors to Beijing', zh: '第一次访问北京的完整指南' },
            coverImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'city-guide',
            readTime: 15,
            views: 12500,
            likes: 350,
            author: { name: 'Travel Expert' },
            type: 'guide'
          }
        ],
        total: 2
      },
      suggestions: [
        { text: 'Beijing', type: 'city' },
        { text: 'Great Wall', type: 'attraction' }
      ],
      query: 'beijing'
    }

    return NextResponse.json(staticResults)

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