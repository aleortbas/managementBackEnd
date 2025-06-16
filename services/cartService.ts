import poolPromise from '../dbConnection';
import sql from 'mssql';

import dotenv from 'dotenv';
dotenv.config();

class cartServices {
    async getCart() {
        const query = `select 
                        p.name,
                        p.name,
                        p.description,
                        c.quantity, 
                        ca.name
                        from cart as c
                        inner join products as p on (p.id = c.product_id)
                        inner join categories as ca on (ca.id = p.category_id)`;

        const pool = await poolPromise;
        const result = await pool.request()
            .query(query);

        if (result.recordset.length === 0) {
            console.log("Cart is empty.");
            return [];
        }

        return result.recordset;
    }

    async addToCart(productId: number, quantity: number) {

        const pool = await poolPromise;
        const query = `INSERT INTO [dbo].[cart]
           ([product_id]
           ,[quantity])
    OUTPUT INSERTED.*
     VALUES
           (@productId
           ,@quantity)`;

        const result = await pool.request()
            .input('productId', sql.Int, productId)
            .input('quantity', sql.Int, quantity)
            .query(query);

        return result.recordset[0];
    }

    async checkout() {
        const query = `select (p.price * c.quantity) as total,* 
        from products as p
        inner join cart as c on(c.product_id = p.id)`;

        const pool = await poolPromise;
        const result = await pool.request()
            .query(query);

        if (result.recordset.length === 0) {
            console.log("No items in cart to checkout.");
            return [];
        }

        console.log(`cart checkout fetched: ${JSON.stringify(result.recordset)}`);
        return result.recordset;
    }
}

export default new cartServices();