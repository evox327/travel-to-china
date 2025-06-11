const mongoose = require('mongoose');

// 连接数据库
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/travel-to-china');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// 用户模式
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' },
  emailVerified: Date,
  image: String
});

// 攻略模式
const guideSchema = new mongoose.Schema({
  title: {
    en: String,
    zh: String
  },
  content: {
    en: String,
    zh: String
  },
  excerpt: {
    en: String,
    zh: String
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  tags: [String],
  coverImage: String,
  images: [String],
  readTime: Number,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Guide = mongoose.model('Guide', guideSchema);

// 攻略数据
const guides = [
  {
    title: {
      en: '10-Day Beijing to Shanghai Journey',
      zh: '北京到上海10日游'
    },
    content: {
      en: 'A comprehensive 10-day journey from China\'s political capital to its financial hub, covering must-see attractions, local cuisine, and cultural experiences...',
      zh: '从中国政治首都到金融中心的全面10日游，涵盖必看景点、当地美食和文化体验...'
    },
    excerpt: {
      en: 'Complete guide covering the perfect route from China\'s political capital to its financial hub, including must-see attractions, local food, and transportation tips.',
      zh: '涵盖从中国政治首都到金融中心完美路线的完整指南，包括必看景点、当地美食和交通小贴士。'
    },
    category: 'multi-city',
    tags: ['First Time', 'Culture', 'History', 'Food'],
    coverImage: '/images/beijing-shanghai-journey.jpg',
    images: [
      '/images/beijing-shanghai-journey.jpg'
    ],
    readTime: 12,
    views: 15200,
    likes: 432,
    isPublished: true,
    publishedAt: new Date('2024-01-15')
  },
  {
    title: {
      en: 'Foodie\'s Guide to Sichuan Province',
      zh: '四川美食指南'
    },
    content: {
      en: 'Dive deep into Sichuan\'s spicy cuisine culture, from street food in Chengdu to authentic hotpot experiences and local cooking classes...',
      zh: '深入了解四川的辣味美食文化，从成都的街头小吃到正宗的火锅体验和当地烹饪课程...'
    },
    excerpt: {
      en: 'Dive deep into Sichuan\'s spicy cuisine culture, from street food in Chengdu to authentic hotpot experiences and local cooking classes.',
      zh: '深入了解四川的辣味美食文化，从成都的街头小吃到正宗的火锅体验和当地烹饪课程。'
    },
    category: 'food-culture',
    tags: ['Food', 'Spicy', 'Local Experience', 'Chengdu'],
    coverImage: '/images/sichuan-food.jpg',
    images: [
      '/images/sichuan-food.jpg'
    ],
    readTime: 8,
    views: 22700,
    likes: 678,
    isPublished: true,
    publishedAt: new Date('2024-01-10')
  },
  {
    title: {
      en: 'First Timer\'s Guide to the Great Wall',
      zh: '长城初游者指南'
    },
    content: {
      en: 'Everything you need to know for your first visit to the Great Wall of China, including the best sections to visit, transportation options, and what to bring...',
      zh: '初次游览中国长城所需了解的一切，包括最佳游览路段、交通选择和携带物品...'
    },
    excerpt: {
      en: 'Everything you need to know for your first visit to the Great Wall, including best sections, transportation, and practical tips.',
      zh: '初次游览长城所需了解的一切，包括最佳路段、交通和实用小贴士。'
    },
    category: 'first-time',
    tags: ['Great Wall', 'History', 'Hiking', 'Beijing'],
    coverImage: '/images/hero-great-wall.jpg',
    images: [
      '/images/hero-great-wall.jpg'
    ],
    readTime: 6,
    views: 18500,
    likes: 523,
    isPublished: true,
    publishedAt: new Date('2024-01-05')
  },
  {
    title: {
      en: 'Budget Travel: Exploring China on $30/Day',
      zh: '预算旅行：每日30美元游中国'
    },
    content: {
      en: 'Discover how to explore China\'s incredible destinations while staying within a tight budget. Tips for accommodation, food, transportation, and activities...',
      zh: '了解如何在紧张预算内探索中国的精彩目的地。住宿、食物、交通和活动的小贴士...'
    },
    excerpt: {
      en: 'Practical guide to exploring China on a shoestring budget with tips for cheap accommodation, street food, and free activities.',
      zh: '以极低预算探索中国的实用指南，包括廉价住宿、街头美食和免费活动的小贴士。'
    },
    category: 'budget',
    tags: ['Budget', 'Backpacking', 'Money Saving', 'Tips'],
    coverImage: '/images/map-background.jpg',
    images: [
      '/images/map-background.jpg'
    ],
    readTime: 10,
    views: 12300,
    likes: 298,
    isPublished: true,
    publishedAt: new Date('2024-01-08')
  },
  {
    title: {
      en: 'Adventure Hiking in Zhangjiajie National Park',
      zh: '张家界国家森林公园探险徒步'
    },
    content: {
      en: 'Complete hiking guide to Zhangjiajie National Forest Park, featuring the best trails, stunning viewpoints, and practical advice for outdoor enthusiasts...',
      zh: '张家界国家森林公园完整徒步指南，介绍最佳步道、绝美观景点和户外爱好者的实用建议...'
    },
    excerpt: {
      en: 'Complete hiking guide to Zhangjiajie\'s spectacular landscapes, trails, and viewpoints that inspired the movie Avatar.',
      zh: '张家界壮观景观、步道和观景点的完整徒步指南，这里是电影《阿凡达》的灵感来源。'
    },
    category: 'adventure',
    tags: ['Hiking', 'Nature', 'Adventure', 'Photography'],
    coverImage: '/images/zhangjiajie-hiking.jpg',
    images: [
      '/images/zhangjiajie-hiking.jpg'
    ],
    readTime: 9,
    views: 8900,
    likes: 412,
    isPublished: true,
    publishedAt: new Date('2024-01-12')
  },
  {
    title: {
      en: 'Luxury Travel: 5-Star Experiences in China',
      zh: '奢华旅行：中国五星级体验'
    },
    content: {
      en: 'Indulge in China\'s finest luxury experiences, from premium hotels and Michelin-starred restaurants to exclusive cultural tours and private guides...',
      zh: '尽享中国最好的奢华体验，从高端酒店和米其林星级餐厅到独家文化游览和私人导游...'
    },
    excerpt: {
      en: 'Discover China\'s most luxurious experiences, from 5-star hotels to exclusive tours and premium dining experiences.',
      zh: '探索中国最奢华的体验，从五星级酒店到独家旅游和高端餐饮体验。'
    },
    category: 'luxury',
    tags: ['Luxury', 'Hotels', 'Fine Dining', 'Premium'],
    coverImage: '/images/luxury-travel.jpg',
    images: [
      '/images/luxury-travel.jpg'
    ],
    readTime: 7,
    views: 6700,
    likes: 189,
    isPublished: true,
    publishedAt: new Date('2024-01-18')
  }
];

async function seedGuides() {
  try {
    await connectDB();
    
    // 查找或创建作者用户
    let author1 = await User.findOne({ email: 'sarah@discoverchina.com' });
    if (!author1) {
      author1 = await User.create({
        name: 'Sarah Chen',
        email: 'sarah@discoverchina.com',
        role: 'user',
        emailVerified: new Date(),
        image: '/images/author-sarah-chen-small.jpg'
      });
    }

    let author2 = await User.findOne({ email: 'michael@discoverchina.com' });
    if (!author2) {
      author2 = await User.create({
        name: 'Michael Zhang',
        email: 'michael@discoverchina.com',
        role: 'user',
        emailVerified: new Date(),
        image: '/images/author-michael-zhang.jpg'
      });
    }

    let author3 = await User.findOne({ email: 'lisa@discoverchina.com' });
    if (!author3) {
      author3 = await User.create({
        name: 'Lisa Wang',
        email: 'lisa@discoverchina.com',
        role: 'user',
        emailVerified: new Date(),
        image: '/images/author-lisa-wang.jpg'
      });
    }

    console.log('Created/found authors');

    // 清除现有攻略数据
    await Guide.deleteMany({});
    console.log('Cleared existing guides');
    
    // 为攻略分配作者
    const authors = [author1, author2, author3];
    const guidesWithAuthors = guides.map((guide, index) => ({
      ...guide,
      author: authors[index % authors.length]._id
    }));
    
    // 插入攻略数据
    await Guide.insertMany(guidesWithAuthors);
    console.log('Inserted sample guides');
    
    console.log('Guide seeding completed successfully!');
    
    // 显示插入的数据
    const inserted = await Guide.find({}).populate('author', 'name');
    console.log('Guide IDs and titles:');
    inserted.forEach(guide => {
      console.log(`- ${guide.title.en} (${guide._id}) by ${guide.author.name}`);
    });
    
  } catch (error) {
    console.error('Error seeding guides:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedGuides();