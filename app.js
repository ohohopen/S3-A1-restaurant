const { urlencoded } = require("express");
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const router = require("./routes");
const methodOveride = require("method-override");
require("./config/mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride("_method"));
app.use(express.static("public"));
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");
app.use(router);
app.listen(port, () => {
  console.log("app is connecting.");
});
