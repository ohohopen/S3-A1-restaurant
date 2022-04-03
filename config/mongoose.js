const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect(process.env.MONGODB_URI);
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
