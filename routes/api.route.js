import express from 'express'
const router = express.Router()
import {getWeatherByLocation } from '../controllers/api.controller.js'

router.post('/weather', getWeatherByLocation)


export default router;