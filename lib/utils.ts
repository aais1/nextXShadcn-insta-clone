import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function dbConnect() {
  try {
    
    if (mongoose.connection.readyState === 1) {
      console.log('Using existing MongoDB connection');
      return;  
    }

    await mongoose.connect(process.env.MONGO_URI || '');

    console.log('MongoDB connected successfully');
  } catch (error:any) {
    console.error('MongoDB connection error:', error.message);
  }
}