import "dotenv/config";
import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

// GET all meals
mealsRouter.get("/", async (req, res) => {
  try {
    const {
      maxPrice,
      availableReservations,
      title,
      dateAfter,
      dateBefore,
      limit,
      sortKey,
      sortDir,
    } = req.query;
    let mealsQuery = knex("Meal");

    //Returns all meals that are cheaper than maxPrice.
    if (maxPrice) {
      mealsQuery = mealsQuery.where("price", "<", maxPrice);
    }

    //Returns all meals that still have available spots left, if true. If false, return meals that have no available spots left
    if (availableReservations === "true" || availableReservations === "false") {
      mealsQuery = mealsQuery
        .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
        .select(
          "Meal.id",
          "Meal.title",
          "Meal.max_reservations",
          knex.raw(
            "COALESCE(SUM(Reservation.number_of_guests), 0) as total_reserved"
          )
        )
        .groupBy("Meal.id");
      if (availableReservations === "true") {
        mealsQuery = mealsQuery.havingRaw(
          "total_reserved < Meal.max_reservations"
        );
      } else if (availableReservations === "false") {
        mealsQuery = mealsQuery.havingRaw(
          "total_reserved > Meal.max_reservations"
        );
      }
    }

    //Returns all meals that partially match the given title.
    if (title) {
      mealsQuery = mealsQuery.where("title", "like", `%${title}%`);
    }

    //Returns all meals where the date for when is after the given date.
    if (dateAfter) {
      mealsQuery = mealsQuery.where("meal_time", ">", dateAfter);
    }

    //Returns all meals where the date for when is before the given date.
    if (dateBefore) {
      mealsQuery = mealsQuery.where("meal_time", "<", dateBefore);
    }

    //Returns the given number of meals.
    if (limit) {
      mealsQuery = mealsQuery.limit(limit);
    }

    //Returns all meals sorted by the given key and/or sortDir
    if (sortKey) {
      const allowedSortKeys = ["meal_time", "max_reservations", "price"];
      if (allowedSortKeys.includes(sortKey)) {
        mealsQuery = mealsQuery.orderBy(
          sortKey,
          sortDir === "desc" ? "desc" : "asc"
        );
      }
    }

    console.log(mealsQuery.toQuery());
    const meals = await mealsQuery;

    if (meals.length === 0) {
      res.status(404).json({ message: "No meals found" });
    }
    res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET all reviews for a specific meal
mealsRouter.get("/:meal_id/reviews", async (req, res) => {
  try {
    const { meal_id } = req.params;
    const reviews = await knex("Review").where("meal_id", meal_id).select("*");

    if (reviews.length === 0) {
      res.status(404).json({ message: "No reviews found" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new meal
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

    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!description) missingFields.push("description");
    if (!location) missingFields.push("location");
    if (!meal_time) missingFields.push("meal_time");
    if (!max_reservations) missingFields.push("max_reservations");
    if (price == null) missingFields.push("price");

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
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

// GET a meal by ID
mealsRouter.get("/:id", async (req, res) => {
  const mealId = Number(req.params.id);
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

// PUT update a meal by ID
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

// DELETE a meal by ID
mealsRouter.delete("/:id", async (req, res) => {
  const mealId = req.params.id;
  try {
    const meal = await knex("Meal").where("id", mealId);
    if (meal.length === 0) {
      res.status(404).json({ error: `Meal not found with id: ${mealId}` });
      return;
    }
    await knex("Meal").where("id", mealId).del();
    res.status(200).json({ message: `Meal id ${mealId} deleted successfully` });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default mealsRouter;
