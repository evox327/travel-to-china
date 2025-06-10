const mongoose = require('mongoose');

// 简单的 MongoDB 连接
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/travel-to-china');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// 简单的景点模式
const attractionSchema = new mongoose.Schema({
  name: {
    en: String,
    zh: String
  },
  description: {
    en: String,
    zh: String
  },
  location: {
    city: String,
    province: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  images: [String],
  category: String,
  rating: Number,
  reviewCount: Number,
  highlights: [String],
  ticketPrice: {
    adult: Number,
    child: Number,
    currency: String
  },
  duration: String,
  bestTimeToVisit: [String],
  openingHours: {
    open: String,
    close: String,
    note: String
  },
  contact: {
    phone: String,
    website: String,
    email: String
  },
  isActive: { type: Boolean, default: true }
});

const Attraction = mongoose.model('Attraction', attractionSchema);

// 测试数据
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
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583481412103-029f2bdf75b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    isActive: true
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
      'https://images.unsplash.com/photo-1583481412103-029f2bdf75b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    isActive: true
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
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    isActive: true
  }
];

async function seedData() {
  try {
    await connectDB();
    
    // 清除现有数据
    await Attraction.deleteMany({});
    console.log('Cleared existing attractions');
    
    // 插入新数据
    await Attraction.insertMany(attractions);
    console.log('Inserted sample attractions');
    
    console.log('Database seeded successfully!');
    
    // 显示插入的数据 ID
    const inserted = await Attraction.find({});
    console.log('Attraction IDs:');
    inserted.forEach(attr => {
      console.log(`- ${attr.name.en}: ${attr._id}`);
    });
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedData();