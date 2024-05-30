const mongoose = require('mongoose');

require('dotenv').config();


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection successful!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};
connectToDatabase()

module.exports = connectToDatabase;
