import express, { Express } from "express";
import userRoutes from "./user";
import productRoutes from "./products";
import categoryRoutes from "./categories";

function routes(app: Express) {
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/categories', categoryRoutes);
}

export default routes;