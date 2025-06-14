import poolPromise from '../dbConnection';
import sql from 'mssql';

import dotenv from 'dotenv';
dotenv.config();

class categoriesServices {
    async getCategories() {
        const query = 'SELECT * FROM categories ';
        
        const pool = await poolPromise;
        const result = await pool.request()
            .query(query);

        console.log(`Products fetched: ${JSON.stringify(result.recordset)}`); // Log the result for debugging
        return result.recordset;
    }

    async createCategories(name: string) {
        const pool = await poolPromise;

        const query = `INSERT INTO [dbo].[categories]
           ([name]
           ,[created_at]
           ,[updated_at])
           OUTPUT INSERTED.*
     VALUES
           (@name
           ,GETDATE()
           ,GETDATE())`

        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .query(query);

        console.log(`Category created: ${JSON.stringify(result)}`); // Log the result for debugging
        return result.recordset[0];
    } 

    async updateCategory(id: number, updates: {
        name?: string;
    }) {
        const queryProducts = 'select * from categories where id = @id';
        const pool = await poolPromise;
        const currentResult = await pool.request()
            .input('id', sql.Int, id)
            .query(queryProducts);

        if (currentResult.recordset.length === 0) {
            throw new Error(`Category with ID ${id} does not exist`);
        }
        const current = currentResult.recordset[0];

        const finalName = updates.name ?? current.name;

        const query = `
        UPDATE categories
        SET name = @name
        OUTPUT INSERTED.*
        WHERE id = @id;
        `;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, finalName)
            .query(query);
            
        return result.recordset[0];
    } 

    async deleteCategory(id: number) {
        const query = 'DELETE FROM categories OUTPUT DELETED.* WHERE id = @id';
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query);
        
        if (result.recordset.length === 0) {
            throw new Error(`Category with ID ${id} does not exist`);
        }

        console.log(`Category deleted: ${JSON.stringify(result.recordset[0])}`); // Log the deleted product for debugging
        return result.recordset[0];
    } 
}

export default new categoriesServices();