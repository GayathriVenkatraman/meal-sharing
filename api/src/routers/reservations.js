import "dotenv/config";
import express from "express";
import knex from "../database_client.js";

const reservationsRouter = express.Router();

reservationsRouter.get("/", async (req, res) => {
  try {
    const reservations = await knex("Reservation").select("*");

    if (reservations.length === 0) {
      res.status(404).json({ message: "No reservations found" });
    }
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reservationsRouter.post("/", async (req, res) => {
  try {
    const {
      number_of_guests,
      meal_id,
      created_date,
      contact_phonenumber,
      contact_name,
      contact_email,
    } = req.body;

    if (
      !number_of_guests ||
      !meal_id ||
      !contact_phonenumber ||
      contact_name == null
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [reservationId] = await knex("Reservation").insert({
      number_of_guests,
      meal_id,
      created_date,
      contact_phonenumber,
      contact_name,
      contact_email,
    });

    res.status(201).json({ message: "New reservation added", reservationId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

export default reservationsRouter;
