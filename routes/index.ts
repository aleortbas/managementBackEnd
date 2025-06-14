import express, { Express } from "express";
import userRoutes from "./user";
import productRoutes from "./products";
import categoryRoutes from "./categories";
import cartRoutes from "./cart";

function routes(app: Express) {
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/cart', cartRoutes);
}

export default routes;