import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/firebase.routes.js";

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is working");
});

// Firebase routes
app.use("/", router);

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});