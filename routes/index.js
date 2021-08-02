const express = require('express');
const router = express.Router();
const Recipe = require("../models/recipe");
const mongoose = require("mongoose");


/* GET home page. */
router.get('/recipe', async function(req, res, next) {
    var mainDishes = await Recipe.find({ category: 'Main dish' });
    var desserts = await Recipe.find({ category: 'Dessert' });
    var beverages = await Recipe.find({ category: 'Beverage' });
    res.render("recipe.hbs", {
        mainDishes: mainDishes,
        desserts: desserts,
        beverages: beverages
    });
});

router.get("/oneRecipe/:id", (req, res) => {
    Recipe.findById(req.params.id)
        .then((dbRes) => {
            res.render("oneRecipe.hbs", { recipe: dbRes });
        })
        .catch((error) => {
            console.log(error)
        });

});

module.exports = router;