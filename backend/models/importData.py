import os
import json
from pymongo import MongoClient

with open(file_path, 'r', encoding='utf-8') as f:
    recipes = json.load(f)

client = MongoClient('mongodb+srv://admin:admin@cluster0.toiwrnt.mongodb.net/')
db = client.get_database()
recipe_collection = db['recipes']

def import_data():
    recipes_array = list(recipes.values())
    if not recipes_array:
        print("No recipes found in the JSON file.")
        return
    result = recipe_collection.insert_many(recipes_array)
    print(f"{len(result.inserted_ids)} documents were successfully inserted.")

import_data()