const { urlencoded } = require("express");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const router = require("./routes");
const methodOveride = require("method-override");
const session = require("express-session");
const usePassport = require("./config/passport");
const flash = require("connect-flash");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT;
require("./config/mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride("_method"));
app.use(express.static("public"));
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");
app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
usePassport(app);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});
app.use(router);
app.listen(port, () => {
  console.log("app is connecting.");
});
