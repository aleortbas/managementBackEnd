import poolPromise from '../dbConnection';
import sql from 'mssql';

import dotenv from 'dotenv';
dotenv.config();

class productsServices {
    async getProducts() {
        const query = 'SELECT * FROM products';
        
        const pool = await poolPromise;
        const result = await pool.request()
            .query(query);

        console.log(`Products fetched: ${JSON.stringify(result.rows)}`); // Log the result for debugging
        return result.recordset;
    }

    async createProduct(name: string, description: string, price: number, category_id: number) {
        const queryCategory = 'select * from categories where id = @category_id';
        const pool = await poolPromise;

        const categoryResult = await pool.request()
            .input('category_id', sql.Int, category_id)
            .query(queryCategory);
        
        if (categoryResult.recordset.length === 0) {
            throw new Error(`Category with id ${category_id} does not exist`);
        }

        const query = `INSERT INTO [dbo].[products]
           ([name]
           ,[description]
           ,[price]
           ,[category_id]
           ,[created_at]
           ,[updated_at])
           OUTPUT INSERTED.*
VALUES (@name
           ,@description
           ,@price
           ,@category_id
           ,GETDATE()
           ,GETDATE())`

        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .input('description', sql.VarChar, description)
            .input('price', sql.Decimal, price)
            .input('category_id', sql.Int, category_id)
            .query(query);

        console.log(`Product created: ${JSON.stringify(result)}`); // Log the result for debugging
        return result.recordset[0];
    } 

    async updateProduct(id: number, updates: {
        name?: string;
        description?: string;
        price?: number;
        category_id?: number;
    }) {
        const queryProducts = 'select * from products where id = @id';
        const pool = await poolPromise;
        const currentResult = await pool.request()
            .input('id', sql.Int, id)
            .query(queryProducts);

        if (currentResult.recordset.length === 0) {
            throw new Error(`Product with ID ${id} does not exist`);
        }
        const current = currentResult.recordset[0];

        const finalName = updates.name ?? current.name;
        const finalDesc = updates.description ?? current.description;
        const finalPrice = updates.price ?? current.price;
        const finalCategory = updates.category_id ?? current.category_id;

        const query = `
        UPDATE products
        SET name = @name, description = @description, price = @price, category_id = @category_id, updated_at = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = @id;
        `;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, finalName)
            .input('description', sql.VarChar, finalDesc)
            .input('price', sql.Decimal, finalPrice)
            .input('category_id', sql.Int, finalCategory)
            .query(query);
            
        return result.recordset[0];
    } 

    async deleteProduct(id: number) {
        const query = 'DELETE FROM products OUTPUT DELETED.* WHERE id = @id';
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query);
        
        if (result.recordset.length === 0) {
            throw new Error(`Product with ID ${id} does not exist`);
        }

        console.log(`Product deleted: ${JSON.stringify(result.recordset[0])}`); // Log the deleted product for debugging
        return result.recordset[0];
    } 
}

export default new productsServices();