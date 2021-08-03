const express = require('express');
const router = express.Router();
const Recipe = require("../models/recipe");
const mongoose = require("mongoose");
//Get home-page
router.get("/", (req, res) => {
    Recipe.find()
        .then((dbRes) => {
            res.render("index.hbs", {
                recipes: dbRes,
            });
        })
        .catch((error) => {
            console.log(error);
        });
});


/* GET recipe page. */
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


//Create recipe
//Get
router.get("/createRecipe", (req, res) => {
    Recipe.find()
        .then((dbRes) => {
            res.render("creatform.hbs", {
                recipes: dbRes,
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

//Post
router.post("/createRecipe", (req, res) => {
    console.log(req.body);
    Recipe.create(req.body)
        .then((createdRecipe) => {
            console.log(createdRecipe);
            res.redirect("/recipe");
        })
        .catch((error) => {
            console.log(error);
        });
});
//Display oneRecipe

router.get("/oneRecipe/:id", (req, res) => {
    Recipe.findById(req.params.id)
        .then((dbRes) => {
            res.render("oneRecipe.hbs", { recipe: dbRes });
        })
        .catch((error) => {
            console.log(error)
        });

});

// delete recipe

router.get("/delete/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/recipe");
        })
        .catch((error) => {
            console.log(error);
        });
});

//Update recipe
router.get("/update/:id", (req, res) => {
    Recipe.findById(req.params.id)
        .then((dbRes) => {
            res.render("updateform.hbs", {
                recipe: dbRes,
                mainDishSelected: dbRes.category == 'Main dish' ? 'selected' : '',
                dessertSelected: dbRes.category == 'Dessert' ? 'selected' : '',
                beverageSelected: dbRes.category == 'Beverage' ? 'selected' : '',

                easySelected: dbRes.category == 'Easy' ? 'selected' : '',
                moreEffortSelected: dbRes.category == 'More effort' ? 'selected' : '',
                challengingSelected: dbRes.category == 'Challenging' ? 'selected' : '',
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post("/update/:id", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect("/recipe");
        })
        .catch((error) => {
            console.log(error);
        });
});



module.exports = router;