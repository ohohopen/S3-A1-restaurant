const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/s3-a1-restaurant");
const db = mongoose.connection;
// const restaurant_json = require('../public/data/restaurant.json')
db.on("error", () => {
  console.log("db is fail");
});
db.once("open", () => {
  console.log("db is ok");

  // console.log(restaurant_json.results[1])
});
module.exports = db;
