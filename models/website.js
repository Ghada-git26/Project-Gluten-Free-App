const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteSchema = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    image: String,
    // rate: [{ type: Schema.Types.ObjectId, ref: "Rate" }], // !!! a revoir ici !!!
});

const User = mongoose.model("Website", siteSchema);

module.exports = User;