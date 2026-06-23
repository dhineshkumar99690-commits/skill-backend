const mongoose = require('mongoose');

async function connectDB() {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.error("No MONGO_URI found in .env file.");
    process.exit(1);
  }

  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      family: 4 // Use IPv4, skip trying IPv6
    });
    console.log('MongoDB successfully connected! 🚀');
  } catch (err) {
    console.error('Failed to connect to MongoDB database.');
    console.error('Reason:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
