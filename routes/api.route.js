import express from "express";
import {
getWeatherByLocation
} from "../controllers/api.controller.js";

const router = express.Router();

router.post("/weather", getWeatherByLocation);

export default router;