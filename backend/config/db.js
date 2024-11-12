import mongoose from "mongoose";
// basically connect to db using uri
const connectDB = async () => {
  try {
    // try establishing connection to mongodb database
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
