import express, { Express } from "express";
import DbTransactions from "../services/dbTransactions";
import userRoutes from "./user";

function routes(app: Express) {
  app.use('/api/v1/auth', userRoutes);
}

export default routes;