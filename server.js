import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const PORT = 3000;
const APP = express();
const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "pw_libreria";

APP.use(express.json());
APP.use(cors());

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

APP.post("/api/books", async (req, res) => {
  try {
    const { titolo, autore } = req.body;

    if (!titolo || !autore) {
      return res
        .status(400)
        .json({ error: "titolo e autore sono obbligatori" });
    }

    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const result = await db.collection("books").insertOne({ titolo, autore });
    await client.close();

    res.status(201).json({ message: "Libro aggiunto!", id: result.insertedId });
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
