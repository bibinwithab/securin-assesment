from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from fastapi import Query

client = MongoClient('mongodb+srv://admin:admin@cluster0.toiwrnt.mongodb.net/')
db = client.get_database('test')
recipes_collection = db.get_collection("recipes")

app = FastAPI(title="Recipe Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_methods=["*"]
)

@app.get("/")
def home():
    return{
        "message": "API is up and running"
    }

@app.get("/api")
def api_info():
    return {
        "endpoints": [
            "GET /recipes : returns all recipes.",
            "GET /recipes/search : filters out the recipes with respect to the params."
        ]
    }

@app.get("/api/recipes")
def get_recipes(page: int = Query(1), limit: int = Query(10)):
    if page<=0:
        page=1
    if limit<=0:
        limit=1
    skip = (page-1) * limit
    recipes = list(recipes_collection.find().sort("rating",-1).skip(skip).limit(limit))
    for r in recipes:
        r["_id"] = str(r["_id"])
    return {
        "page": page,
        "recipes": recipes
    }

@app.get("/api/recipes/search")
def search_recipes(
    calories: int = None,
    title: str = None,
    cuisine: str = None,
    total_time: int = None,
    rating: int = None
):
    filter = {}
    if calories is not None:
        filter["nutrients.calories"] = calories
    if title is not None:
        filter["title"] = {"$regex": title, "$options": "i"}
    if cuisine is not None:
        filter["cuisine"] = {"$regex": cuisine, "$options": "i"}
    if total_time is not None:
        filter["total_time"] = total_time
    if rating is not None:
        filter["rating"] = rating

    recipes = list(recipes_collection.find(filter))
    for r in recipes:
        r["_id"] = str(r["_id"])
    return recipes