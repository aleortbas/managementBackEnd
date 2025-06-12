import pool from '../dbConnection';
import dotenv from 'dotenv';
dotenv.config();

class DbTransactions {
    async getUsers(){
        const query = 'SELECT * FROM users'
        const result = await pool.query(query);
        console.log(`Executing query: ${query}`);
        return result.rows;
    }
}

export default new DbTransactions();