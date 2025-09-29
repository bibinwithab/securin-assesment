# RESTapi for Recipe Database

---

This project is a RESTful API built with Node.js and Express that allows users to manage a recipe database. It connects to a MongoDB database to store and retrieve recipe data.

## File Structure

---

- `server/`: Contains the server-side code.
  - `.env`: Environment variables for configuration.
  - `src/`: Source code for the server.
    - `models/`: Contains the Mongoose model and data import script.
      - `Recipe.js`: Mongoose schema and model for recipes.
      - `importData.js`: Script to import recipe data from a JSON file.
    - `index.js`: Main application file that sets up the Express server and connects to MongoDB.



## Setup Instructions
---
1. Clone the repository to your local machine.
2. Navigate to the `server` directory.
3. Install the required dependencies using npm:
   ```bash
   npm install
   ```
4. Create a `.env` file in the `server` directory and add the following environment variables:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   PORT=5000
   ```
5. Run the data import script to populate the database with initial recipe data:
   ```bash
   node src/models/importData.js
   ```
6. Start the server:
   ```bash
    npm run dev
   ```
7. The server will be running at `http://localhost:8000`.

## API Endpoints

---

- `GET /api/recipes`: Retrieve a list of all recipes.
