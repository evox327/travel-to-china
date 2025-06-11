import mongoose from 'mongoose'
import dbConnect from '../lib/mongodb.js'
import Attraction from '../models/Attraction.js'
import Guide from '../models/Guide.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

const attractions = [
  {
    name: {
      en: 'The Great Wall of China',
      zh: '中国长城',
    },
    description: {
      en: 'One of the Seven Wonders of the World, stretching over 13,000 miles across northern China. A magnificent testament to ancient Chinese engineering and perseverance.',
      zh: '世界七大奇迹之一，横跨中国北方13000多英里。这是古代中国工程技术和毅力的宏伟见证。',
    },
    location: {
      city: 'Beijing',
      province: 'Beijing',
      coordinates: {
        lat: 40.4319,
        lng: 116.5704,
      },
    },
    images: [
      '/images/hero-great-wall-large.jpg',
      '/images/attraction-sample1.jpg',
    ],
    category: 'historical',
    rating: 4.9,
    reviewCount: 12543,
    highlights: ['UNESCO World Heritage Site', 'Ancient Architecture', 'Spectacular Views'],
    ticketPrice: {
      adult: 40,
      child: 20,
      currency: 'CNY',
    },
    duration: '4-6 hours',
    bestTimeToVisit: ['Spring', 'Autumn'],
    openingHours: {
      open: '06:30',
      close: '19:00',
      note: 'Hours may vary by season',
    },
    contact: {
      phone: '+86-10-69121383',
      website: 'https://www.mutianyugreatwall.com',
    },
  },
  {
    name: {
      en: 'Forbidden City',
      zh: '紫禁城',
    },
    description: {
      en: 'The world\'s largest palace complex, home to Chinese emperors for nearly 500 years. A masterpiece of Chinese architecture and imperial history.',
      zh: '世界上最大的宫殿建筑群，近500年来中国皇帝的居所。中国建筑和帝王历史的杰作。',
    },
    location: {
      city: 'Beijing',
      province: 'Beijing',
      coordinates: {
        lat: 39.9163,
        lng: 116.3972,
      },
    },
    images: [
      '/images/attraction-sample1.jpg',
      '/images/beijing-shanghai-journey-large.jpg',
    ],
    category: 'historical',
    rating: 4.8,
    reviewCount: 8932,
    highlights: ['Imperial Palace', 'Ming Dynasty', 'Cultural Heritage'],
    ticketPrice: {
      adult: 60,
      child: 30,
      currency: 'CNY',
    },
    duration: '3-4 hours',
    bestTimeToVisit: ['Spring', 'Autumn', 'Winter'],
    openingHours: {
      open: '08:30',
      close: '17:00',
      note: 'Closed on Mondays',
    },
    contact: {
      phone: '+86-10-85007062',
      website: 'https://www.dpm.org.cn',
    },
  },
  {
    name: {
      en: 'Terracotta Army',
      zh: '兵马俑',
    },
    description: {
      en: 'Thousands of life-sized terracotta warriors guarding Emperor Qin\'s tomb. An archaeological wonder showcasing ancient Chinese craftsmanship.',
      zh: '数千尊真人大小的兵马俑守卫着秦始皇的陵墓。展示古代中国工艺的考古奇迹。',
    },
    location: {
      city: 'Xi\'an',
      province: 'Shaanxi',
      coordinates: {
        lat: 34.3848,
        lng: 109.2734,
      },
    },
    images: [
      '/images/attraction-sample2.jpg',
    ],
    category: 'historical',
    rating: 4.7,
    reviewCount: 6721,
    highlights: ['Archaeological Wonder', 'Qin Dynasty', 'Ancient Warriors'],
    ticketPrice: {
      adult: 150,
      child: 75,
      currency: 'CNY',
    },
    duration: '2-3 hours',
    bestTimeToVisit: ['Spring', 'Autumn'],
    openingHours: {
      open: '08:30',
      close: '18:00',
    },
    contact: {
      phone: '+86-29-81399001',
    },
  },
  {
    name: {
      en: 'Li River',
      zh: '漓江',
    },
    description: {
      en: 'Stunning karst landscape with dramatic limestone peaks reflected in crystal waters. One of China\'s most picturesque natural wonders.',
      zh: '壮观的喀斯特地貌，戏剧性的石灰岩山峰倒映在清澈的水中。中国最风景如画的自然奇观之一。',
    },
    location: {
      city: 'Guilin',
      province: 'Guangxi',
      coordinates: {
        lat: 25.2741,
        lng: 110.2908,
      },
    },
    images: [
      '/images/map-background-large.jpg',
    ],
    category: 'natural',
    rating: 4.6,
    reviewCount: 4832,
    highlights: ['Natural Beauty', 'River Cruise', 'Karst Mountains'],
    ticketPrice: {
      adult: 210,
      child: 105,
      currency: 'CNY',
    },
    duration: '6-8 hours',
    bestTimeToVisit: ['Spring', 'Summer', 'Autumn'],
    openingHours: {
      open: '07:00',
      close: '18:00',
    },
    contact: {
      phone: '+86-773-2822151',
    },
  },
]

const guides = [
  {
    title: {
      en: '10-Day Beijing to Shanghai Journey',
      zh: '北京到上海10日游',
    },
    content: {
      en: 'A comprehensive 10-day journey from China\'s political capital to its financial hub...',
      zh: '从中国政治首都到金融中心的全面10日游...',
    },
    excerpt: {
      en: 'Complete guide covering the perfect route from China\'s political capital to its financial hub, including must-see attractions, local food, and transportation tips.',
      zh: '涵盖从中国政治首都到金融中心完美路线的完整指南，包括必看景点、当地美食和交通小贴士。',
    },
    category: 'multi-city',
    tags: ['First Time', 'Culture', 'History', 'Food'],
    coverImage: '/images/beijing-shanghai-journey.jpg',
    images: [
      '/images/beijing-shanghai-journey.jpg',
    ],
    readTime: 12,
    views: 15200,
    likes: 432,
    isPublished: true,
    publishedAt: new Date('2024-01-15'),
  },
  {
    title: {
      en: 'Foodie\'s Guide to Sichuan Province',
      zh: '四川美食指南',
    },
    content: {
      en: 'Dive deep into Sichuan\'s spicy cuisine culture...',
      zh: '深入了解四川的辣味美食文化...',
    },
    excerpt: {
      en: 'Dive deep into Sichuan\'s spicy cuisine culture, from street food in Chengdu to authentic hotpot experiences and local cooking classes.',
      zh: '深入了解四川的辣味美食文化，从成都的街头小吃到正宗的火锅体验和当地烹饪课程。',
    },
    category: 'food-culture',
    tags: ['Food', 'Spicy', 'Local Experience', 'Chengdu'],
    coverImage: '/images/sichuan-food.jpg',
    images: [
      '/images/sichuan-food.jpg',
    ],
    readTime: 8,
    views: 22700,
    likes: 678,
    isPublished: true,
    publishedAt: new Date('2024-01-10'),
  },
]

export async function seedDatabase() {
  try {
    await dbConnect()

    // Clear existing data
    await Attraction.deleteMany({})
    await Guide.deleteMany({})
    await User.deleteMany({})

    console.log('Cleared existing data')

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12)
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@discoverchina.com',
      password: adminPassword,
      role: 'admin',
      emailVerified: new Date(),
    })

    console.log('Created admin user')

    // Create sample users
    const authorPassword = await bcrypt.hash('author123', 12)
    const author = await User.create({
      name: 'Sarah Chen',
      email: 'sarah@discoverchina.com',
      password: authorPassword,
      role: 'user',
      emailVerified: new Date(),
      image: '/images/author-sarah-chen-small.jpg',
    })

    const author2 = await User.create({
      name: 'Michael Zhang',
      email: 'michael@discoverchina.com',
      password: authorPassword,
      role: 'user',
      emailVerified: new Date(),
      image: '/images/author-michael-zhang.jpg',
    })

    console.log('Created sample users')

    // Insert attractions
    await Attraction.insertMany(attractions)
    console.log('Inserted sample attractions')

    // Insert guides with author references
    const guidesWithAuthors = guides.map((guide, index) => ({
      ...guide,
      author: index === 0 ? author._id : author2._id,
    }))

    await Guide.insertMany(guidesWithAuthors)
    console.log('Inserted sample guides')

    console.log('Database seeded successfully!')

  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await mongoose.connection.close()
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
}