import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  maxImageSize: parseInt(process.env.MAX_IMAGE_SIZE_MB || '10', 10),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};

