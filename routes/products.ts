import express from 'express';
import productServices from '../services/productsService';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await productServices.getProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
})

    router.post('/registerProduct', async (req, res) => {
        const { name, description, price, category_id } = req.body;
        
        try {
            const insertedProduct = await productServices.createProduct(name, description, price, category_id);
            res.status(201).json({ message: "Product successfully created", product: insertedProduct });
        } catch (error: any) {
            console.error("Error inserting product:", error.message);
            if (error.message.includes("Category")) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Failed to insert product" });
            }
        }
    })

    router.post('/updateProduct', async (req, res) => {
        const { id, name, description, price, category_id } = req.body 
        console.log(`Updating product with ID: ${id}, Name: ${name}, Description: ${description}, Price: ${price}, Category ID: ${category_id}`);
        const updates = await productServices.updateProduct(id, {
            name,
            description,
            price,
            category_id
        })
        res.status(200).json({ message: "Product successfully updated", product: updates });
    })

    router.delete('/deleteProduct/:id', async (req, res) => {
        const id = req.params.id;
        console.log(`Deleting product with ID: ${id}`  );
        
        try {
            const deletedProduct = await productServices.deleteProduct(parseInt(id));
            if (deletedProduct) {
                res.status(200).json({ message: "Product successfully deleted", product: deletedProduct });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete products" });
        }
    })

export default router;