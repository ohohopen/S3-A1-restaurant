const db = require("../../config/mongoose");
const restaurant_json = require("../../public/data/restaurant.json");
const restLen = restaurant_json.results.length;
const Restaurant = require("../restaurants");
db.once("open", () => {
  for (let i = 0; i < restLen; i++) {
    Restaurant.create(restaurant_json.results[i]);
  }
  console.log("seeding is ok.");
});
