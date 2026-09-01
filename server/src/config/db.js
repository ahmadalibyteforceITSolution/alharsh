const mongoose = require('mongoose');
const dns = require('dns');

// Configure DNS resolution for MongoDB Atlas SRV compatibility
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if not permitted
}

let isConnectedToMongo = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/al_hrsh_db';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 4000
    });
    isConnectedToMongo = true;
    console.log(`✅ MongoDB Atlas Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection warning (${error.message}).`);
    console.log(`ℹ️ Persistent fallback active to ensure seamless local operation.`);
    isConnectedToMongo = false;
    return false;
  }
};

const isMongoActive = () => isConnectedToMongo;

module.exports = { connectDB, isMongoActive };
