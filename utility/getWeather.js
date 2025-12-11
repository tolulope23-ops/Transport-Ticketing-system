const {encode} = require('./config');
const axios = require('axios');

const base_url = encode().base_url;
const api_key = encode().api_key;

// Function to get the weather condition of a location using a third party api
async function getWeather(location) {
  try {
    const response = await axios.get(`${base_url}/current.json`, {
      params: {
        key: api_key,
        q: location
      }
    });
    return response.data.current.condition.text; 
     
  } catch (error) {
    console.error("Weather API error:", error.message);
  }
};

module.exports = {getWeather};
