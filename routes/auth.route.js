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

    if (newUser.password === "" || newUser.email === "") {
      res.render("signupForm.hbs", {
        errorMessage: "Please provide a username, an email and a password \n",
      });
      return;
    } else {
      console.log("OK NON EMPTY PASSWORD, EMAIL");
    }

    const foundUser = await User.findOne({ email: newUser.email });
    console.log("foundUser: ", foundUser);
    if (foundUser) {
      console.log("foundUser: ", foundUser);
      res.render("signupForm.hbs", {
        errorMessage: "Email exists. Sign-In",
      });
      return;
    }

    const hashedPassword = bcryptjs.hashSync(newUser.password, saltRounds);
    newUser.password = hashedPassword;
    console.log("newUser: ", newUser);
    const createdUser = await User.create(newUser);
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

// For sign-in/register page:
router.post("/signin", async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    console.log("foundUser: ", foundUser);
    if (!foundUser) {
      res.render("signinForm.hbs", {
        errorMessage: "Bad credentials",
      });
      return;
    }

    const isValidPassword = bcryptjs.compareSync(
      req.body.password,
      foundUser.password
    );

    if (isValidPassword) {
      req.session.currentUser = {
        _id: foundUser._id,
      };

      res.redirect("/profile");
    } else {
      res.render("signinForm.hbs", {
        errorMessage: "Bad credentials",
      });
      return;
    }
  } catch (error) {
    next(error);
  }
});

// router.get("/logout", (req, res, next) => {
//   req.session.destroy((error) => {
//     if (error) {
//       next(error);
//     } else {
//       res.redirect("/signin");
//     }
//   });
// });

module.exports = router;
