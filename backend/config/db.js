
import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sauravpatel220930dbuser:resume123@cluster0.tqndniy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  ).then(()=> console.log('DB Connected'));
}