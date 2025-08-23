const mongoose = require('mongoose');


module.exports = async () => {

   if (!process.env.MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the .env file.');
    process.exit(1);
  }


  try {
  

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`🗄️  MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
