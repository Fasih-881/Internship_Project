import fetch from "node-fetch";

import {
    getUserFCMToken,
    saveNotification
} from "../helpers/Firebasehelper.js";

import {
    sendPushNotification
} from "../helpers/Notificationshelper.js";


const getState = async (lat, lon) => {

    const response = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.LOC_API_KEY}`
    );

    if (!response.ok) {
        throw new Error("Failed to get location");
    }

    const data = await response.json();

    const state = data.features?.[0]?.properties?.state;

    if (!state) {
        throw new Error("Failed to get state");
    }

    return state;
};


const getWeather = async (state) => {

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            state
        )}&appid=${process.env.API_KEY}`
    );

    if (!response.ok) {
        throw new Error("Failed to get weather");
    }

    const data = await response.json();

    let temp = data.main?.temp;

    if (temp === undefined) {
        throw new Error("Temperature not found");
    }

    // Kelvin → Celsius
    temp = temp - 273.15;

    return temp;
};


// Get weather + trigger notification
export const getWeatherByLocation = async (req, res) => {

    try {

        const { userId, lat, lon } = req.body;

        // Validate request
        if (!userId || lat === undefined || lon === undefined) {
            return res.status(400).json({
                success: false,
                message: "userId, latitude and longitude are required"
            });
        }

        //Get location
        const state = await getState(lat, lon);

        // Get weather
        const weather = await getWeather(state);

        // Temperature threshold
        const threshold = Number(process.env.TEMP_THRESHOLD);

        let notificationSent = false;

        // Check temperature
        if (weather >= threshold) {

            //S Get user's FCM token
            const fcmToken = await getUserFCMToken(userId);

            if (fcmToken) {

                const title = "High Temperature";

                const body =
                    `The temperature in ${state} is ${weather.toFixed(1)}°C.`;

                // Send notification
                await sendPushNotification(
                    fcmToken,
                    title,
                    body
                );

                // Save notification
                await saveNotification(
                    userId,
                    title,
                    body,
                    state,
                    weather
                );

                notificationSent = true;
            }
        }

        return res.status(200).json({
            success: true,
            state,
            weather,
            notificationSent
        });

    } catch (error) {

        console.error("Weather controller error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};