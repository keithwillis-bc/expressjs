const express = require("express");
const restData = require("../util/restaurant-data");

const uuid = require("uuid");

const router = express.Router();

router.get("/restaurants", (req, res) => {
  let multiplier = 1;
  let order = req.query.order;
  if (order === "DESC") {
    multiplier = -1;
    order = "ASC";
  } else {
    order = "DESC";
  }
  console.log(order);

  const restaurants = restData.getStoredRestaurants().sort((item1, item2) => {
    if (item1.name.toUpperCase() > item2.name.toUpperCase())
      return 1 * multiplier;
    else return -1 * multiplier;
  });
  res.render("restaurants", { restaurants, order });
});

router.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restData
    .getStoredRestaurants()
    .filter((restaurant) => restaurant.id === id);
  if (restaurant.length === 0) {
    res.render("404");
  } else {
    res.render("restaurant-detail", { restaurant: restaurant[0] });
  }
});

router.get("/confirm", (req, res) => {
  res.render("confirm");
});

router.get("/recommend", (req, res) => {
  res.render("recommend");
});

router.post("/recommend", (req, res) => {
  const restaurant = {
    id: uuid.v4(),
    name: req.body.name,
    address: req.body.address,
    cuisine: req.body.cuisine,
    website: req.body.website,
    description: req.body.description,
  };

  const existingRecommendations = restData.getStoredRestaurants();

  existingRecommendations.push(restaurant);

  restData.storeRestaurants(existingRecommendations);

  res.redirect("/confirm");
});

module.exports = router;
