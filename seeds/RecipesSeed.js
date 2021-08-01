 require("dotenv").config({ path: __dirname + '/./../.env' });
 const recipeModel = require("./../models/recipe");
 const mongoose = require("mongoose");

 const recipes = [{
         name: "Roast chicken & roots",
         category: "main dish",
         prep: "30 mins",
         cook: "1 hr and 15 mins",
         difficultie: "more effort",
         nutrition: {
             kcal: "524 kcal",
             carbs: "28g",
             fibre: "11g",
             protein: "42g",
             sugars: "17g",
             salts: "0.5g",
         },
         ingridients: ["1.6kg whole chicken",
             "zest and juice 1 lemon",
             "2 tbsp cold-pressed rapeseed oil",
             "4-5 thyme sprigs , leaves roughly chopped",
             "500g butternut squash , cut into chunks",
             "300g carrots , cut into chunks",
             "300g parsnips , peeled and cut into long batons",
             "1 medium red onion , cut into thin wedges",
             "1 garlic bulb , cloves separated",
             "100g baby spinach leaves"
         ],
         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/roast-chicken-roots-cc967f4.jpg?quality=90&webp=true&resize=300,272"
     },
     {
         name: "Quinoa tabbouleh",
         category: "main dish",
         prep: "20 mins",
         cook: "20 mins",
         difficultie: "Easy",
         nutrition: {
             kcal: "284 kcal",
             carbs: "38g",
             fibre: "5g",
             protein: "10g",
             sugars: "14g",
             salts: "0.4g",

         },
         ingridients: ["100g dried quinoa",
             "75 g parsley",
             "roughly chopped",
             "300 g tomatoes",
             "cut into 1 cm dice",
             "100 g cucumber",

             "For the dressing",
             "1 tbsp olive oil",
             "2 tbsp balsamic vinegar",
             "juice and zest 0.5 lemon",
             "drop of vanilla extract",
             "1 tsp rice syrup or agave",
             "pinch of Himalayan pink salt½ garlic clove",
             "50 g salad leaves"
         ],
         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/tabouleh-dd2a8df.jpg?quality=90&webp=true&resize=300,272"
     },
     {
         name: "Barbecued meatball kebabs",
         category: "main dish",
         prep: "30 mins",
         cook: "10 mins",
         difficultie: "Easy",
         nutrition: {
             kcal: "351 kcal",
             carbs: "8g",
             fibre: "5g",
             protein: "25g",
             sugars: "7g",
             salts: "0.3g",

         },
         ingridients: ["¼ red onion",
             "400g lamb mince",
             "1 tsp ras el hanout",
             "1 tsp harissa (optional)",
             "2 mint sprigs, finely chopped, plus some whole leaves to serve",
             "4 coriander sprigs, finely chopped, plus some whole leaves to serve",
             "1 pack padron peppers or mild green chillies",
             "1 tbsp olive oil",
             "1 lemon , quartered",
             "flatbreads (or gluten-free alternative), to serve",
             "cucumber and carrot matchsticks and red onion slices, all soaked in lemon juice, to serve",
             "chilli flakes , to serve (optional)",
             "For the tahini sauce",
             "3 tbsp natural yogurt",
             "2 tbsp tahini"
         ],
         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/meatball-kebabs-0c6bc11.jpg?quality=90&webp=true&resize=300,272"
     },


     {
         name: "Ginger cookie sandwiches with lemon mascarpone",
         category: "Dessert",
         prep: "30 mins",
         cook: "14 mins",
         difficultie: "Easy",
         nutrition: {
             kcal: "227 kcal",
             carbs: "28g",
             fibre: "0g",
             protein: "2g",
             sugars: "18g",
             salts: "0.1g",

         },
         ingridients: ["100g unsalted butter,melted",
             "50g golden caster sugar",
             "100g light brown soft sugar",
             "25g black treacle",
             "1 large egg",
             "½ tsp vanilla extract",
             "¼ tsp bicarbonate of soda",
             "175g gluten-free flour blend (I used Doves Farm)",
             "1 tbsp ground ginger",
             "½ tsp ground black pepper",
             "¼ tsp ground nutmeg",
             "¼ tsp ground cloves",
             "¼ tsp ground cardamom (the seeds from 3 pods, crushed – see tip)",
             "75g demerara sugar , to coat",
             "For the filling",
             "175g mascarpone",
             "85g lemon curd"
         ],
         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/ginger-cookie-sandwiches-with-lemon-mascarpone_0-5a57429.jpg?quality=90&webp=true&resize=300,272"
     },


     {
         name: "Vanilla lemongrass crème brûlée",
         category: "Dessert",
         prep: "25 mins",
         cook: "1 hr and 20 mins plus 6 hrs infusing and 3 hrs chilling ",
         difficultie: "More efforts",
         nutrition: {
             kcal: "514 kcal",
             carbs: "35g",
             fibre: "0g",
             protein: "5g",
             sugars: "32g",
             salts: "0.1g",

         },
         ingridients: ["500ml whipping cream",
             "75g lemongrass chopped",
             "60g golden caster sugar , plus an extra sprinkle",
             "6 large egg yolks",
             "1 vanilla pod , split in half lengthways and seeds scraped out"
         ],
         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/vanilla-lemongrass-creme-brulee-2f78be5.jpg?quality=90&webp=true&resize=300,272"
     },

     {
         name: "Coconut cupcakes",
         category: "Dessert",
         prep: "30 mins",
         cook: "20 mins",
         difficultie: "Easy",
         nutrition: {
             kcal: "388 kcal",
             carbs: "45g",
             fibre: "1g",
             protein: "3g",
             sugars: "31g",
             salts: "0.1g",

         },
         ingridients: ["For the coconut whipped cream",
             "400g can full-fat coconut milk (must not contain stabilisers)",
             "140g icing sugar",
             "1 tsp vanilla bean paste",
             "50g desiccated coconut",
             "For the cakes",
             "100g coconut oil",
             "225g golden caster sugar",
             "3 large eggs",
             "200g gluten-free self-raising flour",
             "100ml coconut milk",
             "1 tsp vanilla extract"
         ],
         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/coconut-cupcakes-71c7fed.jpg?quality=90&webp=true&resize=300,272"
     },


     {
         name: "Breakfast super-shake",
         category: "Beverage",
         prep: "5 mins",
         difficultie: "Easy",
         nutrition: {
             kcal: "391 kcal",
             carbs: "50g",
             fibre: "10g",
             protein: "15g",
             sugars: "44g",
             salts: "0.4g",

         },
         ingridients: ["100ml full-fat milk",
             "2 tbsp natural yogurt",
             "1 banana",
             "150g frozen fruits of the forest",
             "50g blueberries",
             "1 tbsp chia seeds",
             "½ tsp cinnamon",
             "1 tbsp goji berries",
             "1 tsp mixed seeds",
             "1 tsp honey"
         ],
         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/breakfast-super-shake-e63774c.jpg?quality=90&webp=true&resize=300,272"
     },


     {
         name: "Two-minute breakfast smoothie",
         category: "Beverage",
         prep: "2 mins",
         difficultie: "Easy",
         nutrition: {
             kcal: "156 kcal",
             carbs: "25g",
             fibre: "2g",
             protein: "4g",
             sugars: "19g",
             salts: "0.1g",

         },
         ingridients: ["1 banana",
             "1 tbsp porridge oats",
             "80g soft fruit (whatever you have – strawberries, blueberries, and mango all work well)",
             "150ml milk",
             "1 tsp honey",
             "1 tsp vanilla extract"
         ],
         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/two-minute-breakfast-smoothie-4a4722d.jpg?quality=90&webp=true&resize=300,272"
     },

     {
         name: "Peach Melba smoothie",
         category: "Beverage",
         prep: "5 mins",
         difficultie: "Easy",
         nutrition: {
             kcal: "161 kcal",
             carbs: "30g",
             fibre: "3g",
             protein: "4g",
             sugars: "27g",
             salts: "0.1g",

         },
         ingridients: ["410g can peach halves",
             "100g frozen raspberry , plus a few for garnish",
             "100ml orange juice",
             "150ml fresh custard , plus a spoonful for garnish"
         ],
         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1081496_11-dde2a76.jpg?quality=90&webp=true&resize=300,272"
     }
 ]

 mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useCreateIndex: true
     }).then(() => {
         return recipeModel.deleteMany();
     })
     .then(() => {
         recipeModel.create(recipes)
             .then((createdRecipes) => {
                 console.log(`seed recipes done : ${createdRecipes.length} documents inserted !`);
             })
             .catch((error) => {
                 console.log(error);
             });
     })
     .catch((error) => {
         console.log(error);
     });