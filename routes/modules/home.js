const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurants");
router.get("/", (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .lean()
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error));
});

module.exports = router;
