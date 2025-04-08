import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { RecipeInstructions } from "@/components/recipe-instructions";
import { IndianRupee, Clock, Flame, ChefHat, ShoppingCart, Utensils, Soup } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/nav";

interface RecipeDetail {
  name: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  tips: string[];
  price: number;
}

// Mock data for recipe details
const recipeDetails: Record<string, RecipeDetail> = {
  "1": {
    name: "Butter Chicken",
    prepTime: "20 minutes",
    cookTime: "45 minutes",
    servings: 4,
    difficulty: "Medium",
    price: 399,
    ingredients: [
      "500g chicken, cut into pieces",
      "2 tablespoons butter",
      "2 onions, finely chopped",
      "4 cloves garlic, minced",
      "2 teaspoons ginger paste",
      "2 teaspoons garam masala",
      "1 teaspoon turmeric powder",
      "1 teaspoon red chili powder",
      "1 cup tomato puree",
      "1 cup heavy cream",
      "Salt to taste",
      "Fresh coriander leaves for garnish"
    ],
    instructions: [
      "Marinate the chicken pieces with yogurt, ginger-garlic paste, and spices for at least 30 minutes.",
      "Heat butter in a large pan over medium heat. Add chopped onions and sauté until golden brown.",
      "Add minced garlic and ginger paste, cook for 2 minutes until fragrant.",
      "Add garam masala, turmeric, and red chili powder. Stir well to coat the onions.",
      "Pour in the tomato puree and cook for 5 minutes until oil separates.",
      "Add the marinated chicken pieces and cook for 10 minutes, stirring occasionally.",
      "Pour in the heavy cream and simmer for 15 minutes until the chicken is tender.",
      "Season with salt to taste and garnish with fresh coriander leaves.",
      "Serve hot with naan or rice."
    ],
    tips: [
      "For best results, marinate the chicken overnight in the refrigerator.",
      "You can adjust the spice level by reducing or increasing the amount of red chili powder.",
      "If the gravy is too thick, add a little water or cream to adjust the consistency.",
      "For a richer flavor, you can add a few cashews while grinding the gravy."
    ]
  },
  "2": {
    name: "Masala Dosa",
    prepTime: "30 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "Medium",
    price: 199,
    ingredients: [
      "2 cups rice",
      "1 cup urad dal",
      "1/2 teaspoon fenugreek seeds",
      "Salt to taste",
      "For the filling:",
      "4 potatoes, boiled and mashed",
      "2 onions, finely chopped",
      "2 green chilies, chopped",
      "1 teaspoon mustard seeds",
      "1 teaspoon turmeric powder",
      "Curry leaves",
      "Oil for cooking"
    ],
    instructions: [
      "Wash and soak rice and urad dal separately for 6 hours.",
      "Grind rice and urad dal separately to make a smooth batter.",
      "Mix both batters together, add salt, and let ferment overnight.",
      "For the filling, heat oil in a pan and add mustard seeds.",
      "Add chopped onions and green chilies, sauté until onions are golden.",
      "Add turmeric powder and curry leaves, stir well.",
      "Add mashed potatoes and mix thoroughly. Season with salt.",
      "Heat a non-stick pan and pour a ladleful of batter in a circular motion.",
      "Spread the batter evenly to make a thin dosa.",
      "Add the potato filling in the center and fold the dosa.",
      "Cook until golden brown and crispy."
    ],
    tips: [
      "The batter should be of pouring consistency, not too thick or thin.",
      "Make sure the pan is hot enough before pouring the batter.",
      "For perfect crispiness, use a well-seasoned pan.",
      "You can add grated carrots or peas to the filling for extra nutrition."
    ]
  },
  "3": {
    name: "Paneer Tikka",
    prepTime: "20 minutes",
    cookTime: "25 minutes",
    servings: 4,
    difficulty: "Easy",
    price: 299,
    ingredients: [
      "400g paneer, cut into cubes",
      "1 cup yogurt",
      "2 tablespoons ginger-garlic paste",
      "2 teaspoons red chili powder",
      "1 teaspoon turmeric powder",
      "1 teaspoon garam masala",
      "1 teaspoon cumin powder",
      "Salt to taste",
      "Oil for basting",
      "Lemon wedges for serving"
    ],
    instructions: [
      "Mix yogurt with all the spices and ginger-garlic paste in a bowl.",
      "Add paneer cubes to the marinade and coat well.",
      "Cover and refrigerate for at least 30 minutes.",
      "Thread the marinated paneer onto skewers.",
      "Preheat the oven to 200°C (400°F).",
      "Place the skewers on a baking tray and brush with oil.",
      "Bake for 20-25 minutes, turning halfway and basting with oil.",
      "Serve hot with mint chutney and lemon wedges."
    ],
    tips: [
      "For best results, use fresh paneer from a local dairy.",
      "You can also grill the paneer on a barbecue for a smoky flavor.",
      "If using wooden skewers, soak them in water for 30 minutes before using.",
      "Add bell peppers and onions to the skewers for a complete meal."
    ]
  }
};

export default function Recipe() {
  const [, setLocation] = useLocation();
  const params = useParams<{ id: string }>();
  const recipeId = params?.id || "";
  const [servings, setServings] = useState(4);
  const [selectedIngredients, setSelectedIngredients] = useState<boolean[]>([]);
  const recipe = recipeDetails[recipeId];

  // Initialize selectedIngredients to all true when recipe changes
  useEffect(() => {
    if (recipe) {
      setSelectedIngredients(Array(recipe.ingredients.length).fill(true));
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orange-900 mb-4">Recipe Not Found</h1>
          <p className="text-gray-600">The recipe you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleIngredientToggle = (index: number) => {
    setSelectedIngredients(prev => prev.map((selected, i) => i === index ? !selected : selected));
  };

  const calculatePrice = () => {
    const basePrice = recipe.price;
    const uncheckedCount = selectedIngredients.filter(selected => !selected).length;
    const totalIngredients = recipe.ingredients.length;
    const pricePerIngredient = basePrice / totalIngredients;
    return Math.round((basePrice - (uncheckedCount * pricePerIngredient)) * servings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      <Nav />
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated floating spices/ingredients */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#7CCDC4]/10 blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-[#A8D97C]/10 blur-xl"
        />
        
        {/* Food-themed icons */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[10%] left-[5%]"
          >
            <ChefHat className="w-16 h-16" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-[30%] right-[8%]"
          >
            <Utensils className="w-12 h-12" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-[20%] left-[15%]"
          >
            <Soup className="w-14 h-14" />
          </motion.div>
        </div>
      </div>

      <div className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Recipe Instructions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-white/95 backdrop-blur-sm border-orange-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <RecipeInstructions
                  name={recipe.name}
                  prepTime={recipe.prepTime}
                  cookTime={recipe.cookTime}
                  servings={servings}
                  difficulty={recipe.difficulty}
                  ingredients={recipe.ingredients}
                  instructions={recipe.instructions}
                  tips={recipe.tips}
                />
              </Card>
            </motion.div>

            {/* Customization and Order Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-1"
            >
              <Card className="bg-white/95 backdrop-blur-sm border-orange-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-orange-900 flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-orange-500" />
                    Customize Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Servings Selector */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Label className="text-orange-700 flex items-center gap-2">
                        <Utensils className="w-4 h-4" />
                        Number of Servings
                      </Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setServings(prev => Math.max(1, prev - 1))}
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={servings}
                          onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 text-center border-orange-200"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setServings(prev => Math.min(8, prev + 1))}
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          +
                        </Button>
                      </div>
                    </motion.div>

                    {/* Ingredients List */}
                    <div>
                      <Label className="text-orange-700 flex items-center gap-2">
                        <Soup className="w-4 h-4" />
                        Ingredients (uncheck if you already have)
                      </Label>
                      <ScrollArea className="h-[300px] pr-4 mt-2">
                        <div className="space-y-3">
                          {recipe.ingredients.map((ingredient, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.02, x: 5 }}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`ingredient-${index}`}
                                checked={selectedIngredients[index]}
                                onCheckedChange={() => handleIngredientToggle(index)}
                                className="border-orange-200 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                              />
                              <label htmlFor={`ingredient-${index}`} className="text-sm text-gray-700">
                                {ingredient}
                              </label>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Price Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="pt-4 border-t border-orange-100"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Base Price:</span>
                          <span className="font-medium">₹{recipe.price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Servings:</span>
                          <span className="font-medium">{servings}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Ingredients to Include:</span>
                          <span className="font-medium">{selectedIngredients.filter(Boolean).length} of {recipe.ingredients.length}</span>
                        </div>
                        <motion.div
                          className="flex justify-between items-center pt-2 border-t border-orange-100"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-lg font-semibold text-orange-900">Total Price:</span>
                          <span className="text-2xl font-bold text-orange-600 flex items-center gap-1">
                            <IndianRupee className="w-5 h-5" />
                            {calculatePrice()}
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Add to Cart Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => setLocation(`/checkout/${recipeId}?servings=${servings}&customized=${selectedIngredients.some(selected => !selected)}`)}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md hover:shadow-xl transition-all duration-300"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
