import path from 'path';

require("dotenv-safe").config({
  allowEmptyValues: true, 
  example: path.resolve(__dirname, "../../.env.example"),
  path: path.resolve(__dirname, "../../.env"),
});

type DIALECT = 'mysql' | 'mariadb' | 'postgres' | 'mssql' | 'mongodb';

// ? App
export const APP_NAME: string =  process.env.APP_NAME || 'AppExample';

// ? Proccess
export const NODE_ENV: string =  process.env.NODE_ENV || 'developer';

// ? Hosts
export const HTTP_HOST: string = process.env.HTTP_HOST || 'https://localhost:3001';

// ? Server
export const HTTP_PORT: number = JSON.parse((process.env.HTTP_PORT || '3000').toLowerCase()) || 3000;

// ? Expirations
export const APP_SECRET_PASS: string = process.env.APP_SECRET_PASS || '';

// ? DataBase MONGODB
export const M_DB_ACTIVE: boolean = JSON.parse((process.env.M_DB_ACTIVE || 'false').toLowerCase()) ?? false;
export const M_DB_SYNCHRONIZE: boolean = JSON.parse((process.env.M_DB_SYNCHRONIZE || 'true').toLowerCase()) ?? true;
export const M_DB_DIALECT: DIALECT = 'mongodb';
export const M_DB_HOST: string = process.env.M_DB_HOST || '127.0.0.1';
export const M_DB_NAME: string = process.env.M_DB_NAME || 'AppExample';
export const M_DB_USER: string = process.env.M_DB_USER || 'root';
export const M_DB_PASS: string = process.env.M_DB_PASSWORD || '';
export const M_DB_ROOT_PASSWORD: string = process.env.M_DB_ROOT_PASSWORD || '';
export const M_DB_PORT: number = JSON.parse((process.env.M_DB_PORT || '27017').toLowerCase()) || 27017;

// ? DataBase 📦 MYSQL or 🐘 Postgress
export const DB_ACTIVE: boolean = JSON.parse((process.env.DB_ACTIVE || 'false').toLowerCase()) ?? false;
export const DB_SYNCHRONIZE: boolean = JSON.parse((process.env.DB_SYNCHRONIZE || 'true').toLowerCase()) ?? true;
export const DB_DIALECT: DIALECT = 'mysql';
export const DB_HOST: string = process.env.DB_HOST || '127.0.0.1';
export const DB_NAME: string = process.env.DB_NAME || 'vendor';
export const DB_USER: string = process.env.DB_USER || 'root';
export const DB_PASS: string = process.env.DB_PASSWORD || '';
export const DB_ROOT_PASSWORD: string = process.env.DB_ROOT_PASSWORD || '';
export const DB_PORT: number = JSON.parse((process.env.DB_PORT || '3306').toLowerCase()) || 3306;

// ? Logger
export const LOG_ENABLED: boolean = JSON.parse((process.env.LOG_ENABLED || 'false').toLowerCase()) ?? false;
export const FILE_LOG_ENABLED: boolean = JSON.parse((process.env.LOG_FILE_ENABLED || 'false').toLowerCase()) ?? true;
export const LOGGER_TIME_FORMAT: string = process.env.LOG_TIME_FORMAT  || 'mm:ss SSS';

// ? SocketIO
export const SOCKET_ENABLED: boolean = JSON.parse((process.env.SOCKET_ENABLED || 'false').toLowerCase()) ?? false;
export const REDIS_ENABLED: boolean = JSON.parse((process.env.REDIS_URL || 'false').toLowerCase()) ?? false;
export const REDIS_URL: string = process.env.REDIS_URL || '';
export const REDIS_AUTH: string = process.env.REDIS_AUTH || '';

// ? Sentry
export const SENTRY_ENABLED: boolean = JSON.parse((process.env.SENTRY_DSN || 'false').toLowerCase()) ?? false;
export const SENTRY_DSN: string = process.env.SENTRY_DSN || '';

// ? Firebase
export const FIREBASE_ENABLED: boolean = JSON.parse((process.env.FIREBASE_ENABLED || 'false').toLowerCase()) ?? false;

// ? Token Header
export const BEARER_KEY: string = process.env.BEARER_KEY || 'Bearer ';

export const STRIPE_KEY_PRIV: string = process.env.STRIPE_KEY_PRIV || '';
export const STRIPE_KEY_PUB: string = process.env.STRIPE_KEY_PUB || '';

export const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || '';

export const FACEBOOK_CLIENT_ID: string = process.env.FACEBOOK_CLIENT_ID || '';
export const FACEBOOK_CLIENT_SECRET: string = process.env.FACEBOOK_CLIENT_SECRET || '';

export const COMMISSION_APP: number = JSON.parse((process.env.COMMISSION_APP || '0').toLowerCase()) || 0;
export const COST_SERVICE_DEFAULT: number = JSON.parse((process.env.COST_SERVICE_DEFAULT || '0').toLowerCase()) || 0;

export const MAIL_HOST: string = process.env.MAIL_HOST || 'smtp.gmail.com';
export const MAIL_PORT: number =  JSON.parse((process.env.MAIL_PORT || '587').toLowerCase()) || 587;
export const MAIL_USER: string = process.env.MAIL_USER || 'damian@semnexus.com';
export const MAIL_PASSWORD: string = process.env.MAIL_PASSWORD || 'ucwdjgebeubpqikl';


export const DURATION_HOUR_PAYMENT: number = JSON.parse((process.env.DURATION_HOUR_PAYMENT || '38').toLowerCase()) || 38;
export const HOURS_24: boolean = JSON.parse((process.env.HOURS_24 || 'false').toLowerCase()) || false;