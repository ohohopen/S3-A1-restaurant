const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const passport = require("passport");
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  const { name, email, password, cnofirmPassword } = req.body;
  User.findOne({ email })
    .lean()
    .then(user => {
      if (user) {
        console.log("此帳號已被註冊");
        return res.render("register", {
          name,
          email,
          password,
          cnofirmPassword,
        });
      } else {
        User.create({
          name,
          email,
          password,
        })
          .then(() => {
            console.log("註冊成功");
            return res.redirect("login");
          })
          .catch(error => console.log(error));
      }
    })
    .catch(error => console.log(error));
});
router.get("/login", (req, res) => res.render("login"));
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});
module.exports = router;
