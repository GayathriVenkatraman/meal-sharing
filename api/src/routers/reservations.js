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

export default reservationsRouter;
