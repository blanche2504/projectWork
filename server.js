import express from "express";
import { MongoClient } from "mongodb";

const PORT = 3000;
const APP = express();
const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "pw_libreria";

APP.use(express.json());

APP.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

APP.get("/api/books", async (_req, res) => {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const books = await db.collection("books").find({}).toArray();
    await client.close();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  try {
    APP.listen(PORT, () => {
      console.log("server running");
    });
  } catch (error) {
    console.error(":(", error);
    process.exit(1);
  }
}

startServer();
