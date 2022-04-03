const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const passport = require("passport");
const bcrypt = require("bcryptjs");
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];

  if (!email || !password || !confirmPassword) {
    errors.push({
      message: "email、password、confirmPassword欄位不得為空",
    });
    // console.log(errors);
  }
  if (password !== confirmPassword) {
    errors.push({ message: "兩組密碼需相同" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }

  User.findOne({ email })
    .lean()
    .then(user => {
      if (user) {
        console.log("此帳號已被註冊");
        errors.push({ message: "這個 Email 已經註冊過了。" });
        return res.render("register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
        });
      }
      return bcrypt
        .genSalt(10)
        .then(salt => {
          return bcrypt.hash(password, salt);
        })
        .then(hash => {
          User.create({
            name,
            email,
            password: hash,
          })
            .then(() => {
              console.log("註冊成功");
              const login_ok_msg = { message: "成功註冊，請先登入才可使用" };

              return res.render("login", { login_ok_msg });
            })
            .catch(error => console.log(error));
        });
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
  req.flash("success_msg", "成功登出");
  res.redirect("/users/login");
});
module.exports = router;
