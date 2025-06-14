import express from 'express';
import userServices from "../services/userServices";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', async (req, res) => {
  const { email, username, password } = req.body;
  console.log(`Email: ${email}, Username: ${username}`);
  try {
    const user = await userServices.getUser(username);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userServices.createUser(email, username, hashedPassword);

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    
  }
})

router.post('/upload', upload.single('file'),async (req, res) => {
  const file = req.file;
  
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const results: any[] = [];

  try {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', async () => {
        const successes: any[] = [];
        const errors: any[] = [];

        for (const row of results) {
          const { email, username, password } = row;

          console.log(`Processing user: ${email}, Username: ${username}`); // Log for debugging
          

          try {
            const user = await userServices.createUser(email, username, password);
            successes.push({ email, id: user.id });
          } catch (err) {
            errors.push({ email, error: err.message });
          }
        }

        fs.unlinkSync(file.path); 

        res.status(201).json({
          message: 'CSV processing completed.',
          successes,
          errors,
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing CSV file.' });
  }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);
    console.log(`Email: ${email}, Password Hash: ${passwordhash}`); // Log for debugging
    try {
      const user = await userServices.getUser(email);

      console.log(`User found: ${JSON.stringify(user)}`); // Log user details for debugging
  
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials password" });
      }
  
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Login failed" });
    }
  });



export default router;