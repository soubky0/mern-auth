import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    const conn = await mongoose.connect(mongoURI);
    
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${(err as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
