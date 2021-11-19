const { response } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "data", "recommendations.json");
  const existingData = fs.readFileSync(filePath);
  const restaurants = JSON.parse(existingData);

  res.render("restaurants", { restaurants });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/confirm", (req, res) => {
  res.render("confirm");
});

app.get("/recommend", (req, res) => {
  res.render("recommend");
});

app.post("/recommend", (req, res) => {
  const restaurant = {
    name: req.body.name,
    address: req.body.address,
    cuisine: req.body.cuisine,
    website: req.body.website,
    description: req.body.description,
  };

  const filePath = path.join(__dirname, "data", "recommendations.json");
  const existingData = fs.readFileSync(filePath);
  const existingRecommendations = JSON.parse(existingData);

  existingRecommendations.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(existingRecommendations));

  res.redirect("/confirm");
});

app.listen(3000);
