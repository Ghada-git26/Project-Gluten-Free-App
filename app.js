// app.js

require("dotenv").config();
require("./config/mongo"); // Mongodb connection
const hbs = require("hbs");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const session = require("express-session"); // require session
const MongoStore = require("connect-mongo"); // ADDED: require mongostore

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth.route");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + "/views/partial");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    // cookie: { secure: true },
  })
);
app.use((req, res, next) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id)
      .then((userFromDb) => {
        res.locals.currentUser = userFromDb;
        res.locals.isLoggedIn = true;
        next();
        // res.locals.isAdmin = userFromDB.isAdmin
      })
      .catch((error) => {
        next(error);
      });
  } else {
    res.locals.currentUser = undefined;
    res.locals.isLoggedIn = false;
    next();
  }
});
app.use((req, res, next) => {
  console.log(req.session);
  next();
});

app.use("/", indexRouter);
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
