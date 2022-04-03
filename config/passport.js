const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
module.exports = app => {
  // 初始化
  app.use(passport.initialize());
  app.use(passport.session());
  //策略
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            console.log("無此使用者");
            return done(null, false, { message: "無此使用者" });
          } else if (user.password !== password) {
            console.log("密碼錯誤");
            return done(null, false, { message: "密碼錯誤" });
          }
          return done(null, user);
        })
        .catch(error => done(error, false));

      //序列
      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      passport.deserializeUser((id, done) => {
        User.findById(id)
          .lean()
          .then(user => done(null, user))
          .catch(error => done(error, false));
      });
    })
  );
};
