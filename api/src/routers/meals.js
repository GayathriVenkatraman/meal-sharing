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

mealsRouter.get("/:id", async (req, res) => {
  const mealId = req.params.id;
  try {
    const meal = await knex("Meal").select("*").where("id", mealId);

    if (meal.length === 0) {
      return res
        .status(404)
        .json({ error: `Meal not found with id: ${mealId}` });
    }

    res.status(200).json(meal);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
});

mealsRouter.put("/:id", async (req, res) => {
  const mealId = req.params.id;
  const updatedMeals = req.body;
  try {
    if (mealId) {
      await knex("Meal").update(updatedMeals).where("id", mealId);
      return res.status(200).json({ message: "Meal updated successfully" });
    }
    res.status(404).json({ error: `Meal not found with id: ${mealId}` });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default mealsRouter;
