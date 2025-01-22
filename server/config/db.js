import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI,{});
    console.log('successfully connected to MongoDB');
  } catch (error) {
    console.error('Unable to  connecting  MongoDB:', error);
  }
};