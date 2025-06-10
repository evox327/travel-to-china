const mongoose = require('mongoose');

async function checkDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/travel-to-china');
    console.log('Connected to MongoDB');

    // 直接查询集合
    const db = mongoose.connection.db;
    const guides = await db.collection('guides').find({}).limit(2).toArray();
    
    console.log('Guides in database:', guides.length);
    if (guides.length > 0) {
      console.log('Sample guide structure:');
      console.log(JSON.stringify(guides[0], null, 2));
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

checkDB();