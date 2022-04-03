const express = require("express");
const restaurants = require("../../models/restaurants");
const router = express.Router();
const Restaurant = require("../../models/restaurants");
//Create
router.get("/new", (req, res) => {
  res.render("new");
});
router.post("/new", (req, res) => {
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  const userId = req.user._id;
  Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId,
  })
    .then(restaurants => res.redirect("/"))
    .catch(error => console.log(error));
});
//Detail
router.get("/:id/show", (req, res) => {
  const _id = req.params.id;
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  const userId = req.user._id;
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurants => res.render("show", { restaurants }))
    .catch(error => console.log(error));
});
//Edit
router.get("/:id/edit", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurants => {
      res.render("edit", { restaurants });
    })
    .catch(error => console.log(error));
});
router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  const userId = req.user._id;
  Restaurant.findOne({ _id, userId })
    .then(restaurants => {
      restaurants.name = name;
      restaurants.name_en = name_en;
      restaurants.category = category;
      restaurants.image = image;
      restaurants.location = location;
      restaurants.phone = phone;
      restaurants.google_map = google_map;
      restaurants.rating = rating;
      restaurants.description = description;
      restaurants.save();
    })
    .then(restaurants => res.redirect("/"))
    .catch(error => console.log(error));
});
//Delete
router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  Restaurant.findOne({ _id, userId })
    .then(restaurants => {
      restaurants.remove();
      res.redirect("/");
    })
    .catch(error => console.log(error));
});
//search
router.post("/search", (req, res) => {
  const userId = req.user._id;
  const keyword = req.body.keyword;
  // console.log("userId", userId);
  // console.log("keyword", keyword);
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => {
      const searchResult = restaurants.filter(item => {
        return item.name.toLowerCase().includes(keyword);
      });
      res.render("index", { restaurants: searchResult, keyword: keyword });
    })
    .catch(error => console.log(error));
});

module.exports = router;
