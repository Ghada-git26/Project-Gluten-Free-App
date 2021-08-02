// models/recipe.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  prep: String,
  cook: String,
  difficultie: String,
  nutrition: {
    kcal: String,
    carbs: String,
    fibre: String,
    protein: String,
    sugars: String,
    salts: String,
  },
  ingridients: [String],
  image: String,
  rate: [{ type: Schema.Types.ObjectId, ref: "Rate" }],
});

const recipeModel = mongoose.model("recipe", recipeSchema);

module.exports = recipeModel;
