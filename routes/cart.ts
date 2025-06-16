import express from 'express';
import cartServices from '../services/cartService';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await cartServices.getCart();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch cart" });
    }
})

   router.post('/', async (req, res) => {
        const { product_id, quantity } = req.body;
        try {
            const insertedCategory = await cartServices.addToCart(product_id, quantity);
            res.status(201).json({ message: "Cart successfully created", category: insertedCategory });
        } catch (error: any) {
            console.error("Error inserting Cart:", error.message);
            if (error.message.includes("Cart")) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Failed to insert Cart" });
            }
        }
    })

    router.post('/checkout', async (req, res) => {
        try {
            const checkoutDetails = await cartServices.checkout();
            res.status(200).json({ message: "Checkout successful", details: checkoutDetails });
        } catch (error) {
            console.error("Error during checkout:", error.message);
            res.status(500).json({ message: "Failed to complete checkout" });
        }
    })

export default router;