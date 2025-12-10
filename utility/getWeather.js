const {encode} = require('./config');
const axios = require('axios');

const base_url = encode().base_url;
const api_key = encode().api_key;

async function getWeather(location) {
  try {
    const response = await axios.get(`${base_url}/current.json`, {
      params: {
        key: api_key,
        q: location
      }
    });
    // console.log(response.data.current.condition.text);
    return response.data.current.condition.text; 
     
  } catch (error) {
    console.error("Weather API error:", error.message);
  }
};

// console.log(getWeather('Abuja'));

module.exports = {getWeather};
