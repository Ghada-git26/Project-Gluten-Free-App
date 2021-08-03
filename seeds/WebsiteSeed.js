require("dotenv").config({ path: __dirname + '/./../.env' });
const mongoose = require("mongoose");
const websiteModel = require("./../models/website");

const websites = [{
        name: "Onatera",
        link: "https://www.onatera.com",
        image: String
    },


    {
        name: "Just Eat",
        link: "https://www.just-eat.fr/en/order-gluten-free-food-in",
        image: String
    },



    {
        name: "Gluten-Free mall",
        link: "https://glutenfreemall.com/",
        image: String
    },


    {
        name: "HiP PARIS",
        link: "https://hipparis.com/2019/10/10/our-best-4-gluten-free-grocery-stores-in-paris/#",
        image: String
    }
]


mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(() => {
        return websiteModel.deleteMany();
    })
    .then(() => {
        websiteModel.create(websites)
            .then((createdWebsites) => {
                console.log(`seed websites done : ${createdWebsites.length} documents inserted !`);
            })
            .catch((error) => {
                console.log(error);
            });
    })
    .catch((error) => {
        console.log(error);
    });