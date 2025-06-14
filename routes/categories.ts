import express from 'express';
import categoriesService from '../services/categoriesService';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await categoriesService.getCategories();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch categories" });
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const categories = await categoriesService.getCategoriesById(id);
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch categories" });
    }
})

   router.post('/', async (req, res) => {
        const { name } = req.body;
        console.log(`Inserting category with Name: ${name}`); // Log for debugging
        
        try {
            const insertedCategory = await categoriesService.createCategories(name);
            res.status(201).json({ message: "Category successfully created", category: insertedCategory });
        } catch (error: any) {
            console.error("Error inserting Category:", error.message);
            if (error.message.includes("Category")) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Failed to insert category" });
            }
        }
    })  

    router.put('/:id', async (req, res) => {
        const { id, name } = req.body 
        console.log(`Updating Category with ID: ${id}, Name: ${name}`);
        const updates = await categoriesService.updateCategory(id, {
            name
        })
        res.status(200).json({ message: "Category successfully updated", Category: updates });
    })

    router.delete('/:id', async (req, res) => {
        const id = req.params.id;
        console.log(`Deleting Category with ID: ${id}`  );
        
        try {
            const deletedCategory = await categoriesService.deleteCategory(parseInt(id));
            if (deletedCategory) {
                res.status(200).json({ message: "Category successfully deleted", Category: deletedCategory });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete Categorys" });
        }
    })

export default router;