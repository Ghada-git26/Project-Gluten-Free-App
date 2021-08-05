// models/recipe.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ["Main dish", "Dessert", "Beverage"] },
    prep: Number,
    cook: Number,
    difficulty: {
        type: Number,
        enum: [1, 2, 3]
    },
    nutrition: {
        kcal: Number,
        carbs: Number,
        fiber: Number,
        protein: Number,
        sugars: Number,
        salts: Number,
    },
    ingredients: [String],
    image: String,
    ratings: [{ type: Schema.Types.ObjectId, ref: "rating" }],
});

const recipeModel = mongoose.model("recipe", recipeSchema);

module.exports = recipeModel;