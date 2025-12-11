const basePrice = 3000;

const priceMap = {
  "rain": 6000,
  "sunny": 0,
  "snow": 2000,
  "cloudy": 5000
};

// Function calculates and return prices based on the weather condition
const calculatePrice = (weather) => {
  const condition = weather.toLowerCase();
  for (const key in priceMap) {
    if (condition.includes(key))
      return basePrice + priceMap[key];
    else{
      return basePrice;
    }
  }
};

module.exports = {calculatePrice};