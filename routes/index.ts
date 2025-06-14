import express, { Express } from "express";
import userRoutes from "./user";
import productRoutes from "./products";
import categoryRoutes from "./categories";

function routes(app: Express) {
  app.use('/api/v1/auth', userRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/category', categoryRoutes);
}

export default routes;