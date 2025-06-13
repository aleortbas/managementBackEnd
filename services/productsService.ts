import poolPromise from '../dbConnection';
import sql from 'mssql';

import dotenv from 'dotenv';
dotenv.config();

class productsServices {
    async getProducts() {
        const query = 'SELECT * FROM products';
        
        const pool = await poolPromise;
        const result = await pool.query(query);

        console.log(`Products fetched: ${JSON.stringify(result.rows)}`); // Log the result for debugging
        return result.rows;
    }

    /* async createProduct(name: string, description: string, price: number, category_id: number) {
        const queryCategory = 'SELECT * FROM categories WHERE id = $1';
        const categoryResult = await pool.query(queryCategory, [category_id]);
        if (categoryResult.rows.length === 0) {
            throw new Error(`Category with id ${category_id} does not exist`);
        }

        const query = 'INSERT INTO public.products ("name", description, price, category_id, created_at, updated_at) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);';
        const values = [name, description, price, category_id];
        const result = await pool.query(query, values);
        console.log(`Product created: ${JSON.stringify(result)}`); // Log the result for debugging
        return result.rows[0];
    }

    async updateProduct(id: number, updates: {
        name?: string;
        description?: string;
        price?: number;
        category_id?: number;
    }) {
        const queryProducts = 'select * from products where id = $1';
        const currentResult = await pool.query(queryProducts, [id]);

        if (currentResult.rows.length === 0) {
            throw new Error(`Product with ID ${id} does not exist`);
        }
        const current = currentResult.rows[0];

        const finalName = updates.name ?? current.name;
        const finalDesc = updates.description ?? current.description;
        const finalPrice = updates.price ?? current.price;
        const finalCategory = updates.category_id ?? current.category_id;

        const query = `
        UPDATE products
        SET name = $1, description = $2, price = $3, category_id = $4, updated_at = CURRENT_TIMESTAMP
        WHERE id = $5
        RETURNING *;
        `;

        const values = [finalName, finalDesc, finalPrice, finalCategory, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async deleteProduct(id: number) {
        const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            throw new Error(`Product with ID ${id} does not exist`);
        }

        console.log(`Product deleted: ${JSON.stringify(result.rows[0])}`); // Log the deleted product for debugging
        return result.rows[0];
    } */
}

export default new productsServices();