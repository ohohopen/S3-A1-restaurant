module.exports = {
  authenticator: (req, res, next) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("warning_msg", "請先登入才能使用！");
    res.redirect("/users/login");
  },
};
