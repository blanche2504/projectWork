import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoClient, ObjectId } from "mongodb";
const PORT = 3000;
const APP = express();
const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "pw_libreria";
const JWT_SECRET = "pw_libreria_jwt_secret_2024";

APP.use(express.json());
APP.use(cors());

APP.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token mancante" });

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch {
        res.status(403).json({ error: "Token non valido" });
    }
}

APP.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        const db = client.db(DB_NAME);
        const user = await db.collection("users").findOne({ username });
        await client.close();

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { username: user.username, role: user.role },
                JWT_SECRET,
                // token scade in 24 ore
                { expiresIn: "24h" },
            );
            return res.json({ token });
        }
        res.status(401).json({ error: "Credenziali non valide" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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

APP.post("/api/books", authenticateToken, async (req, res) => {
    try {
        const { titolo, autore, anno, genere } = req.body;

        if (!titolo || !autore) {
            return res
                .status(400)
                .json({ error: "titolo e autore sono obbligatori" });
        }

        const client = new MongoClient(MONGO_URI);
        await client.connect();
        const db = client.db(DB_NAME);
        const result = await db
            .collection("books")
            .insertOne({ titolo, autore, anno, genere });
        await client.close();

        res.status(201).json({
            message: "Libro aggiunto!",
            id: result.insertedId,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

APP.delete("/api/books/:id", authenticateToken, async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        const db = client.db(DB_NAME);
        await db
            .collection("books")
            .deleteOne({ _id: new ObjectId(req.params.id) });
        await client.close();
        res.json({ message: "Libro eliminato" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

APP.put("/api/books/:id", authenticateToken, async (req, res) => {
    try {
        const { titolo, autore, anno, genere, descrizione } = req.body;
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        const db = client.db(DB_NAME);
        await db
            .collection("books")
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { titolo, autore, anno, genere, descrizione } },
            );
        await client.close();
        res.json({ message: "Libro aggiornato" });
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
