import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in the environment variables!");
}

export const env = {
  port: Number(process.env.PORT ?? 4001),
  mongoUri,
  corsOrigin: process.env.CORS_ORIGIN ?? '*'
} as const;