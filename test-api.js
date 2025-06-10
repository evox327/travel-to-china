const mongoose = require('mongoose');

async function testAPI() {
  try {
    await mongoose.connect('mongodb://localhost:27017/travel-to-china');
    console.log('Connected to MongoDB');

    const Guide = mongoose.model('Guide');
    const guides = await Guide.find({ isPublished: true }).populate('author', 'name image').limit(3);
    
    console.log('Found guides:', guides.length);
    guides.forEach(guide => {
      console.log(`- ${guide.title?.en || 'No title'} by ${guide.author?.name || 'No author'}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

testAPI();