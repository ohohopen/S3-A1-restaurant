const express = require("express");
const router = express.Router();
//Create
router.get("/new", (req, res) => {
  res.render("new");
});
router.post("/new", (req, res) => {});
//Detail
router.get("/:id/detail", (req, res) => {});
//Edit
router.get("/:id/edit", (req, res) => {});
router.post("/:id/edit", (req, res) => {});
//Delete
router.get("/:id/delete", (req, res) => {});
module.exports = router;
