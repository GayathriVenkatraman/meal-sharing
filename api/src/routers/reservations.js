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

reservationsRouter.get("/:id", async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservation = await knex("Reservation")
      .select("*")
      .where("id", reservationId);

    if (reservation.length === 0) {
      return res
        .status(404)
        .json({ error: `Reservation not found with id: ${reservationId}` });
    }

    res.status(200).json(reservation);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default reservationsRouter;
