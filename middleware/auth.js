module.exports = {
  authenticator: (req, res, next) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  },
};
