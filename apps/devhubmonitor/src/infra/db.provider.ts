import mongoose from 'mongoose';

import { MONGO_CONNECTION_STRING } from '../config';

async function connectToDatabase () {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}
export default connectToDatabase;
