import express, { Express } from "express";
import userRoutes from "./user";
import productRoutes from "./products";

function routes(app: Express) {
  app.use('/api/v1/auth', userRoutes);
  app.use('/api/v1/products', productRoutes);
}

export default routes;