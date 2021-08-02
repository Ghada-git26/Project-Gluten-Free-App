const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: [{ type: String, required: true }],
    email: [{ type: String, required: true }],
    password: [{ type: String }],
    // rate: [{ type: Schema.Types.ObjectId, ref: "Rate" }], // !!! a revoir ici !!!
});

const User = mongoose.model("User", userSchema);

module.exports = User;