import pool from '../dbConnection';
import dotenv from 'dotenv';
dotenv.config();

class userServices {
    async getUser(email: string) {
        const query = 'SELECT * FROM users where username = $1';
        const values = [email]
        const result = await pool.query(query,values);
        console.log(`result: ${JSON.stringify(result.rows)}`); // Log the result for debugging
        return result.rows[0];
    }

    async createUser(email: string, username: string, password: string) {
        const query = "INSERT INTO public.users (username, email, password, created_at, updated_at) VALUES($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) returning username, email, password;"
        const values = [username, email, password];
        const result = await pool.query(query, values);
        console.log(`User created: ${JSON.stringify(result)}`); // Log the result for debugging
        return result.rows[0];
    }
}

export default new userServices();