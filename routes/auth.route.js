// routes/auth.js

const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

// ----------------------------------------
// GET routes created:
// ----------------------------------------
// sign-in / register page.
router.get("/signin", (req, res, next) => {
  res.render("signinForm.hbs");
});

// sign-up / create account page.
router.get("/signup", (req, res, next) => {
  res.render("signupForm.hbs");
});

// profile user page.
router.get("/profile", (req, res, next) => {
  res.render("userProfile.hbs");
});

// ----------------------------------------
// POST routes created:
// ----------------------------------------

// For sign-up/create account page:
router.post("/signup", async (req, res, next) => {
  try {
    console.log("The format data: ", req.body);
    const newUser = req.body;
    if (!newUser.username || !newUser.password || !newUser.email) {
      console.log("USERNAME, PASSWORD, EMAIL");
      res.render("signupForm.hbs", {
        errorMessage: "Please provide a username, an email and a password \n",
      });
      return;
    } else {
      console.log("OK FOR USERNAME, PASSWORD, EMAIL");
    }
    const foundUser = await User.findOne({ email: newUser.email });
    console.log("foundUser: ", foundUser);
    if (foundUser) {
      console.log("foundUser: ", foundUser);
      res.render("signupForm.hbs", {
        errorMessage: "Email taken",
      });
      return;
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, saltRounds);
    newUser.password = hashedPassword;
    console.log("newUser: ", newUser);
    await User.create(newUser)
      .then((userFromDB) => {
        console.log("New user created: ", userFromDB);
        res.render("/signup");
      })
      .catch((error) => next(error));
    return;
  } catch (err) {
    next(err);
  }
});

// For sign-in/register page:
router.post("/signin", async (req, res, next) => {
  try {
    console.log("The format data: ", req.body);
    const newUser = req.body;
    await User.find(newUser)
      .then((userFromDB) => {
        console.log("New user created: ", userFromDB);
        res.redirect("/profile");
      })
      .catch((error) => next(error));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
