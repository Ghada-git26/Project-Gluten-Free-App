require("dotenv").config({ path: __dirname + "/./../.env" });
const userModel = require("./../models/User.model");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs"); // for pwd encryption.
saltRounds = 10;

const users = [
  {
    username: "toto",
    email: "toto@gmail.com",
    password: bcryptjs.hashSync("12345", saltRounds), // encryption
    isAdmin: 1,
  },
  {
    username: "Mariadb",
    email: "maria@gmail.com",
    password: bcryptjs.hashSync("12345", saltRounds), // encryption
    isAdmin: 0,
  },
  {
    username: "Roger",
    email: "roger@gmail.com",
    password: bcryptjs.hashSync("12345", saltRounds), // encryption
    isAdmin: 0,
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    return userModel.deleteMany();
  })
  .then(() => {
    userModel
      .create(users)
      .then((createdUsers) => {
        console.log(
          `seed users done : ${createdUsers.length} documents inserted !`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
