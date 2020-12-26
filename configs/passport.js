const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/user.model");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "414227024002-7msf4kdntm638jgr2uccptmrb3s2kc23.apps.googleusercontent.com",
        clientSecret: "z9GSp8u6a46WbigqybKyF-gW",
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleID: profile.id,
          name: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ googleID: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
