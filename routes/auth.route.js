// routes/auth.js

const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

// GET routes:
// ----------------------------------------
router.get("/signin", (req, res, next) => {
  res.render("signinForm.hbs");
});

router.get("/signup", (req, res, next) => {
  res.render("signupForm.hbs");
});

// POST routes:
// ----------------------------------------

// For signup page:
router.post("/signup", async (req, res, next) => {
  try {
    const user = req.body;
    console.log("user:", user);
    if (!user.username || !user.password || !user.email) {
      res.render("signupForm.hbs", {
        errorMessage: "Please provide an email and a password",
      });
      return;
    }
    const createdUser = await User.create(user);
    console.log("toCreatUser: ", user);
    console.log("createdUser: ", createdUser);
    if (user) {
      res.render("/signupForm.hbs", {
        errorMessage: "Email taken",
      });
      return;
    }
    const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
    user.password = hashedPassword;
    User.create(user);
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

// For signin page:
// router.post("/signin", async (req, res, next) => {
//   try {
//     const
//   }
// })

module.exports = router;

//   res.render("signup/profile.hbs");
//   // console.log("The form data:", req.body);
//   bcryptjs
//     .genSalt(saltRounds)
//     .then((salt) => {
//       console.log(user.password);
//       return bcryptjs.hash(user.password, salt);
//     })
//     .then((hashedPassword) => {
//       console.log("username:", user.username);
//       console.log("email:", user.email);
//       console.log("passwordHashed:", hashedPassword);
//       user.password = hashedPassword;
//       console.log("Newly created user is: ", user);
//       const createdUser = User.create(user);
//     })
//     .catch((error) => next(error));
// });

//   return User.create({
//     username,
//     email,
//     passwordHashed: hashedPassword,
//   });
// })
// .then((userFromDB) => {
//   console.log("Newly created user is: ", userFromDB);
// })
// .catch((error) => next(error));
