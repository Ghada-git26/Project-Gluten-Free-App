var express = require("express");
var router = express.Router();
const User = require("../models/User.model");

router.get("/user", (req, res, next) => {
  res.render("user.hbs");
});

module.exports = router;
