const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "..", "data", "recommendations.json");

function getStoredRestaurants() {
  const existingData = fs.readFileSync(filePath);
  const existingRecommendations = JSON.parse(existingData);

  return existingRecommendations;
}

function storeRestaurants(restaurants) {
  fs.writeFileSync(filePath, JSON.stringify(restaurants));
}

module.exports = {
  getStoredRestaurants,
  storeRestaurants,
};
