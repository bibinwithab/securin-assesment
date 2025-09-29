const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  Contient: {
    type: String,
  },
  Country_State: {
    type: String,
  },
  cuisine: {
    type: String,
  },
  title: {
    type: String,
  },
  URL: {
    type: String,
  },
  rating: {
    type: Number,
  },
  total_time: {
    type: Number,
  },
  prep_time: {
    type: Number,
  },
  cook_time: {
    type: Number,
  },
  description: {
    type: String,
  },
  ingredients: [
    {
      type: String,
    },
  ],
  instructions: [
    {
      type: String,
    },
  ],
  nutrients: {
    calories: { type: String },
    carbohydrateContent: { type: String },
    cholesterolContent: { type: String },
    fiberContent: { type: String },
    proteinContent: { type: String },
    saturatedFatContent: { type: String },
    sodiumContent: { type: String },
    sugarContent: { type: String },
    fatContent: { type: String },
    unsaturatedFatContent: { type: String },
  },
  serves: {
    type: String,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
