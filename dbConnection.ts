import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DB_NAME) {
    throw new Error('Environment variable DB_NAME is not set. Please check your .env file.');
}

const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.IP || 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: false, // Set to true if using Azure
        trustServerCertificate: true // Required for local dev/self-signed certs
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool: any) => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch((err: any) => {
        console.error('Database Connection Failed!', err);
        throw err;
    });

export default poolPromise;