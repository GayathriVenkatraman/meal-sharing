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

mealsRouter.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      meal_time,
      max_reservations,
      price,
      created_date,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !meal_time ||
      !max_reservations ||
      price == null
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [mealId] = await knex("Meal").insert({
      title,
      description,
      location,
      meal_time,
      max_reservations,
      price,
      created_date,
    });

    res.status(201).json({ message: "New meal added", mealId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

export default mealsRouter;
