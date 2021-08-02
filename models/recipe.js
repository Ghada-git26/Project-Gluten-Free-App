const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ["Main dish", "Dessert", "Beverage"] },
    prep: { type: Number, required: true },
    cook: Number,
    difficultie: {
        type: String,
        enum: ["Easy", "more effort", "challenging"]
    },
    nutrition: {
        kcal: Number,
        carbs: Number,
        fibre: Number,
        protein: Number,
        sugars: Number,
        salts: Number,
    },
    ingridients: [String],
    image: String,
    // rate: [{ type: Schema.Types.ObjectId, ref: "Rate" }],
});

const recipeModel = mongoose.model("recipe", recipeSchema);

module.exports = recipeModel;