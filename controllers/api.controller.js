import fetch from "node-fetch";
import express from "express";




const getState = async (lat, lon) => {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.LOC_API_KEY}`
  );                          

  const data = await response.json();

  if (!response) {
    return res.status(400).json({
      success : false,
      message : "Failed to get city ",
    });
    
  }

  const state = data.features?.[0]?.properties?.state;

  if (!state) {
    return res.status(400).json({
      success : false,
      message : "Failed to get state "
    });
  }

  return state;
};


const getWeather = async (state) => {
  //EncodeURIComponent is used to encode the state name to be URL-safe FROM JSON
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      state 
    )}&appid=${process.env.API_KEY}`
  );

  const data = await response.json();
  let temp = data.main?.temp;
  temp = (temp - 273.15);
   if (!response) {
    return res.status(400).json({
      success : false,
      message : "Failed to get wheather ",
    });
  }
  return temp;
};


//Joins both weather and location to get weather by location
export const getWeatherByLocation = async (req, res) => {
  try {
    const { lat, lon } = req.body;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    
    const state = await getState(lat, lon);

    
    const weather = await getWeather(state);

   
    res.status(200).json({
      state,
      weather,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


