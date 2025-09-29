require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const PORT = process.env.PORT || 8000;
const Recipe = require("./models/recipeModel");
const app = express();

app.use(
  cors({
    origins: "*",
    methods: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is up and running... go to /api for the end points");
});

app.get("/api", (req, res) => {
  res.send(
    `1. GET /recipes : returns all recipes. 2. GET /recipes/search : filters out the recipes with respect to the params.`
  );
});

/**
 * @ GET /api/recipes
 * @ params page, limit, filter by rating(desc)
 */

app.get("/api/recipes", async (req, res) => {
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  await Recipe.find()
    .sort({ rating: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((err) => {
      console.log("Error fetching recipes: ", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

/**
 * @ GET /api/recipes/search
 * @ params calories: filter by cal(desc), title: search by title, cuisine: filter by cuisine(desc), total_time: filter by time(desc), rating: filter by rating(desc)
 */
app.get("api/recipes/search", async (req, res) => {
  let { calories, title, cuisine, total_time, rating } = req.query;
  let filter = {};

  if (calories) {
    filter.nutrients = { ...filter.nutrients, calories };
  }
  if (title) {
    filter.title = { title };
  }
  if (cuisine) {
    filter.cuisine = { cuisine };
  }
  if (total_time) {
    filter.total_time = { total_time };
  }
  if (rating) {
    filter.rating = { rating };
  }

  await Recipe.find(filter)
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((err) => {
      console.log("Error fetching recipes: ", err);
      res.status(500).json({ error: "Internal server error" });
      res.status(404).json({ error: "Not found error" });
    });
});

app.listen(PORT, () => {
  console.log(`API is up in http://localhost:${PORT}`);
  mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    console.log("DB connected");
  });
});
