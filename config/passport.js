const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/users");
const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
module.exports = app => {
  // 初始化
  app.use(passport.initialize());
  app.use(passport.session());
  //策略
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {
        console.log("local的req", req);
        User.findOne({ email })
          .then(user => {
            if (!user) {
              console.log("無此使用者");
              return done(null, false, req.flash("warning_msg", "無此使用者"));
            }
            return bcrypt.compare(password, user.password).then(isMatch => {
              if (!isMatch) {
                console.log("密碼錯誤");
                return done(null, false, req.flash("warning_msg", "密碼錯誤"));
              }
              return done(null, user);
            });
          })
          .catch(error => done(error, false));
      }
    )
  );
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ["email", "displayName"],
      },
      (accessToken, refreshToken, profile, done) => {
        const { email, name } = profile._json;
        User.findOne({ email }).then(user => {
          if (user) return done(null, user);
          const randomPassword = Math.random().toString(36).slice(-8);
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash =>
              User.create({
                name,
                email,
                password: hash,
              })
            )
            .then(user => done(null, user))
            .catch(error => done(error, false));
        });
      }
    )
  );
  //序列
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, false));
  });
};
