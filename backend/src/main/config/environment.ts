import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env['PORT']) || 3000,
  nodeEnv: process.env['NODE_ENV'] || 'development',
  mongodbUri: process.env['MONGODB_URI'] || 'mongodb://localhost:27017/campanha-polgo',
  jwtSecret: process.env['JWT_SECRET'] || 'fallback-secret-key',
  corsOrigin: process.env['CORS_ORIGIN'] || 'http://localhost:5173',
  apiVersion: process.env['API_VERSION'] || 'v1'
};

export const isDevelopment = config.nodeEnv === 'development';
export const isProduction = config.nodeEnv === 'production';

export default config;