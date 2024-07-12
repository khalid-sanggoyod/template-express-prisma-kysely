import env from 'dotenv';

env.config();

export const config: any = {
  APP_PORT: process.env.APP_PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
