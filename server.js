import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import firebaseRouter from "./routes/firebase.routes.js";
import apiRouter from "./routes/api.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
    res.send("Server is working");
});

// API routes
app.use("/", apiRouter);

// Firebase routes
app.use("/", firebaseRouter);

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});