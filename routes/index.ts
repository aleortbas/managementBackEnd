import { Express } from "express";
import DbTransactions from "../services/dbTransactions";

function routes(app: Express) {
  app.get("/users", async (req, res) => {
    try {
      const users = await DbTransactions.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/", (req, res) => {
    res.send("Welcome to the API");
  });
}

export default routes;