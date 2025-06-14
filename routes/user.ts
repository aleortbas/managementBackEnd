import express from 'express';
import userServices from "../services/userServices";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);
    console.log(`Email: ${email}, Password Hash: ${passwordhash}`); // Log for debugging
    try {
      const user = await userServices.getUser(email);
  
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

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const insertedUser = await userServices.createUser(email, username, password);

        const token = jwt.sign(
            { userId: insertedUser.id, email: insertedUser.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: "Successfully Register" , token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Register failed" });
    }
})



export default router;