/**
 * Parse the json file from ../../../US_recipes_null.json and store in database
 */

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const Recipe = require('./recipeModel')

const filePath = path.join(__dirname, '../../../US_recipes_null.json')
const fileData = fs.readFileSync(filePath, 'utf-8')
const recipes = JSON.parse(fileData)

mongoose.connect('mongodb+srv://admin:admin@cluster0.toiwrnt.mongodb.net/').then(()=>{
    console.log('db connected')
})

async function importData() {
  try {
    const recipesArray = Object.values(recipes);
    if (recipesArray.length === 0) {
        console.log("No recipes found in the JSON file.");
        return;
    }
    const result = await Recipe.insertMany(recipesArray);
    console.log(`${result.insertedCount} documents were successfully inserted.`);
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

importData()