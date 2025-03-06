import "dotenv/config";
import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res) => {
  try {
    const meals = await knex("Meal").select("*");

    if (meals.length === 0) {
      res.status(404).json({ message: "No meals found" });
    }
    res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default mealsRouter;
