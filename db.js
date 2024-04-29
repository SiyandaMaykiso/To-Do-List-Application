require('dotenv').config();
const { Pool } = require('pg');

let poolConfig = {
  connectionString: process.env.DATABASE_URL
};

if (process.env.NODE_ENV === 'production') {
  poolConfig.ssl = {
    rejectUnauthorized: false // Necessary for Heroku's self-signed certificates
  };
} else {
  // Additional configuration for local development if needed
  poolConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  };
}

const pool = new Pool(poolConfig);

module.exports = pool;
