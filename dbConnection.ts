import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DB_NAME) {
    throw new Error('Environment variable DB_NAME is not set. Please check your .env file.');
}

const pool = new Pool({
    host: process.env.IP,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    idleTimeoutMillis: 30000, // number of milliseconds to wait before timing out when connecting a new client
    connectionTimeoutMillis: 2000,
})

export default pool;