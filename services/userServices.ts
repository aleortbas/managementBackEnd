import poolPromise from '../dbConnection';
import sql from 'mssql';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config();

class userServices {
    async getUser(email: string) {
        const query = 'SELECT * FROM users where username = @username OR email = @username';
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.VarChar, email)
            .query(query);
        return result.recordset[0];
    }

    async createUser(email: string, username: string, password: string) {

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = "INSERT INTO users (username, email, password, created_at, updated_at) OUTPUT INSERTED.* VALUES(@username, @email, @password, GETDATE(), GETDATE())"
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .query(query);
        return result.recordset[0];
    }
}

export default new userServices();