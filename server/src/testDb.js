const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function testConnection() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://ahmedalihafeez25_db_user:%40Sublime12345@cluster0.oe0inne.mongodb.net/Alharsh?retryWrites=true&w=majority';
  console.log('Testing connection to MongoDB Atlas...');
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000
    });
    console.log('>>> SUCCESS: Connected to MongoDB Atlas! Host:', conn.connection.host, 'DB:', conn.connection.name);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('>>> Connection Error:', err.message);
    process.exit(1);
  }
}

testConnection();
