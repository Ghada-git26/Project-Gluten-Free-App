const express = require('express');
const router = express.Router();
const Recipe = require("../models/recipe");
const Rating = require("../models/rating");
const User = require("../models/User.model");
const mongoose = require("mongoose");
const auth = require("../middlewares/Auth");

//Get home-page (displaying home page)
router.get("/", (req, res) => {
    res.render("index.hbs");
});


/* GET recipe page. */
router.get('/recipe', async function(req, res, next) {
    //displaying 3 different category of dishes
    //filtering by category
    var mainDishes = await Recipe.find({ category: 'Main dish' });
    var desserts = await Recipe.find({ category: 'Dessert' });
    var beverages = await Recipe.find({ category: 'Beverage' });
    //Setting conditions for selecting favorite recipes
    if (req.session.currentUser) {
        //Use of populate de display ech user's favorite recipe
        var user = await User.findById(req.session.currentUser._id).populate('favoriteRecipes');
        if (user && user.favoriteRecipes) {
            await setFavorites(user, mainDishes);
            await setFavorites(user, desserts);
            await setFavorites(user, beverages);
        }
    }
    //displaying 3 different category of dishes
    res.render("recipe.hbs", {
        mainDishes: mainDishes,
        desserts: desserts,
        beverages: beverages
    });
});

//function to check if a recipe is a favorite of a user
async function setFavorites(user, recipes) {
    //gettig the id's of a user's favorite recipe
    let recipeIds = user.favoriteRecipes.map(r => r._id);
    for (let i = 0; i < recipes.length; i++) {
        if (recipeIds.indexOf(recipes[i]._id) != -1) {
            recipes[i].isUserFavourite = true;
        }
    }
}

//make the recipe with the given id a user favourite
router.get('/recipe/setFavourite/:id', auth.requireAuth, async(req, res) => {
    var user = await User.findById(req.session.currentUser._id).populate('favoriteRecipes');
    var recipe = await Recipe.findById(req.params.id);
    if (user && recipe) {
        await User.updateOne({ _id: user._id }, { $push: { favoriteRecipes: recipe } });
    }
    res.redirect('back');
});

//delete the recipe with the given id from user favourites
router.get('/recipe/unsetFavourite/:id', auth.requireAuth, async(req, res) => {
    var user = await User.findById(req.session.currentUser._id).populate('favoriteRecipes');
    var recipe = await Recipe.findById(req.params.id);
    if (user && recipe) {
        user.favoriteRecipes.pull(recipe._id);
        await user.save();
    }
    res.redirect('back');
});

//Create recipe
//Get
router.get("/createRecipe", auth.requireAdmin, (req, res) => {
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
router.post("/createRecipe", auth.requireAdmin, (req, res) => {
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

router.get("/oneRecipe/:id", async(req, res) => {
    //rating onerecipe
    var recipe = await Recipe.findById(req.params.id)
        .populate({
            path: 'ratings',
            populate: {
                path: 'User'
            }
        });
    //setting a variable to check if a user can comment
    recipe.canComment = true;
    //the same code for selecting favorite recipes even fropm the onerecipe page
    if (req.session.currentUser) {
        var user = await User.findById(req.session.currentUser._id)
            .populate('favoriteRecipes');
        if (user && user.favoriteRecipes) {
            let recipeIds = user.favoriteRecipes.map(r => r._id);
            if (recipeIds.indexOf(recipe._id) != -1) {
                recipe.isUserFavourite = true;
            }
        }
        //Rating
        let userRating = recipe.ratings
            .filter(f => f.User._id == req.session.currentUser._id);
        if (userRating.length > 0) {
            recipe.canComment = false;
        }
    }

    res.render("oneRecipe.hbs", { recipe: recipe });

});

// delete recipe

router.get("/delete/:id", auth.requireAdmin, (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/recipe");
        })
        .catch((error) => {
            console.log(error);
        });
});

//Update recipe
router.get("/update/:id", auth.requireAdmin, (req, res) => {
    Recipe.findById(req.params.id)
        .then((dbRes) => {
            res.render("updateform.hbs", {
                recipe: dbRes,
                mainDishSelected: dbRes.category == 'Main dish' ? 'selected' : '',
                dessertSelected: dbRes.category == 'Dessert' ? 'selected' : '',
                beverageSelected: dbRes.category == 'Beverage' ? 'selected' : '',

                easySelected: dbRes.difficulty == 1 ? 'selected' : '',
                moreEffortSelected: dbRes.difficulty == 2 ? 'selected' : '',
                challengingSelected: dbRes.difficulty == 3 ? 'selected' : '',
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post("/update/:id", auth.requireAdmin, (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect("/recipe");
        })
        .catch((error) => {
            console.log(error);
        });
});

//Display Recipe in the profile
router.get("/profile", async(req, res) => {
    var user = await User.findById(req.session.currentUser._id)
        .populate('favoriteRecipes');
    for (let i = 0; i < user.favoriteRecipes.length; i++) {
        user.favoriteRecipes[i].isUserFavourite = true;
    }
    res.render("user.hbs", { user: user });
});

//Rating forms
router.post("/addComment/:id", auth.requireAuth, async(req, res) => {
    let rating = req.body;
    rating.User = res.locals.currentUser;
    var createdRating = await Rating.create(rating);
    await Recipe.updateOne({ _id: req.params.id }, { $push: { ratings: createdRating } });

    res.redirect(`/oneRecipe/${req.params.id}`);
});

module.exports = router;