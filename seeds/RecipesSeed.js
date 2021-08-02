 require("dotenv").config({ path: __dirname + '/./../.env' });
 const mongoose = require("mongoose");
 const recipeModel = require("./../models/recipe");

 const recipes = [{
         name: "Roast chicken & roots",
         category: "Main dish",
         prep: 30,
         cook: 75,
         difficulty: "more effort",
         nutrition: {
             kcal: 524,
             carbs: 28,
             fiber: 11,
             protein: 42,
             sugars: 17,
             salts: 0.5,
         },
         ingredients: ["1.6kg whole chicken",
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
         category: "Main dish",
         prep: 20,
         cook: 20,
         difficulty: "Easy",
         nutrition: {
             kcal: 284,
             carbs: 38,
             fiber: 5,
             protein: 10,
             sugars: 14,
             salts: 0.4,

         },
         ingredients: ["100g dried quinoa",
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
         category: "Main dish",
         prep: 30,
         cook: 10,
         difficulty: "Easy",
         nutrition: {
             kcal: 351,
             carbs: 8,
             fiber: 5,
             protein: 25,
             sugars: 7,
             salts: 0.3,

         },
         ingredients: ["¼ red onion",
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
         prep: 30,
         cook: 14,
         difficulty: "Easy",
         nutrition: {
             kcal: 227,
             carbs: 28,
             fiber: 0,
             protein: 2,
             sugars: 18,
             salts: 0.1,

         },
         ingredients: ["100g unsalted butter,melted",
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
         prep: 25,
         cook: 60,
         difficulty: "more effort",
         nutrition: {
             kcal: 514,
             carbs: 35,
             fiber: 0,
             protein: 5,
             sugars: 32,
             salts: 0.1,

         },
         ingredients: ["500ml whipping cream",
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
         prep: 30,
         cook: 20,
         difficulty: "Easy",
         nutrition: {
             kcal: 388,
             carbs: 45,
             fiber: 1,
             protein: 3,
             sugars: 31,
             salts: 0.1,

         },
         ingredients: ["For the coconut whipped cream",
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
         prep: 5,
         difficulty: "Easy",
         nutrition: {
             kcal: 391,
             carbs: 50,
             fiber: 10,
             protein: 15,
             sugars: 44,
             salts: 0.4,

         },
         ingredients: ["100ml full-fat milk",
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
         prep: 2,
         difficulty: "Easy",
         nutrition: {
             kcal: 156,
             carbs: 25,
             fiber: 2,
             protein: 4,
             sugars: 19,
             salts: 0.1,

         },
         ingredients: ["1 banana",
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
         prep: 5,
         difficulty: "Easy",
         nutrition: {
             kcal: 161,
             carbs: 30,
             fiber: 3,
             protein: 4,
             sugars: 27,
             salts: 0.1,

         },
         ingredients: ["410g can peach halves",
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

                 recipeModel.findOne()
                     .populate('nutrition')
                     .then((recipe) => { console.log(recipe); })
             })
             .catch((error) => {
                 console.log(error);
             });
     })
     .catch((error) => {
         console.log(error);
     });