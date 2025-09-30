import mongoose from 'mongoose';
import { config, isDevelopment } from '@/main/config/environment';

export class MongoHelper {
  private static instance: MongoHelper;

  private constructor() {}

  public static getInstance(): MongoHelper {
    if (!MongoHelper.instance) {
      MongoHelper.instance = new MongoHelper();
    }
    return MongoHelper.instance;
  }

  public async connect(): Promise<void> {
    try {
      mongoose.set('strictQuery', false);

      const options = {
        autoIndex: isDevelopment,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferCommands: false,
        bufferMaxEntries: 0
      };

      await mongoose.connect(config.mongodbUri, options);

      console.log('✅ Connected to MongoDB successfully');

      if (isDevelopment) {
        mongoose.set('debug', true);
      }
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB');
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error);
    }
  }

  public getConnection(): typeof mongoose {
    return mongoose;
  }
}

export const mongoHelper = MongoHelper.getInstance();