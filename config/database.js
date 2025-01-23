import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  // if db is already connected, then don't connect again
  if (connected) {
    console.log('MongoDB connected');
    return;
  }

  // connect to mongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.log('Error connecting to MongoDB');
    console.log(error);
  }
};

export default connectDB;
