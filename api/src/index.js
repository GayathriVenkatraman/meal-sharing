import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

//Get all meals
apiRouter.get("/", async (req, res) => {
  try {
    const SHOW_TABLES_QUERY =
      process.env.DB_CLIENT === "mysql2"
        ? "SELECT * FROM Meal"
        : "SHOW TABLES;";

    const tables = await knex.raw(SHOW_TABLES_QUERY);

    res.json({ tables: tables.rows || tables });
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get future meals
apiRouter.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex.raw(
      "SELECT * FROM Meal WHERE `meal_time` > NOW()"
    );
    res.json(meals[0]);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Get past meals
apiRouter.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex.raw(
      "SELECT * FROM Meal WHERE `meal_time` < NOW()"
    );
    res.json(meals[0]);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Get all meals sorted by id
apiRouter.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id");
    res.json(meals[0]);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Get first meal
apiRouter.get("/first-meal", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id ASC LIMIT 1");
    if (meals[0].length === 0) {
      return res.status(404).json({ error: "No meals found" });
    }
    res.json(meals[0][0]);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Get last meal
apiRouter.get("/last-meal", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id DESC LIMIT 1");
    if (meals[0].length === 0) {
      return res.status(404).json({ error: "No meals found" });
    }
    res.json(meals[0][0]);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
