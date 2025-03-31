import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useState } from "react";
import { type Recipe, IngredientDetail } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Clock, Users, Plus, Minus, ChefHat, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function LoadingState() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function RecipePage() {
  const [, setLocation] = useLocation();
  const params = useParams<{ id: string }>();
  const recipeId = Number(params.id);
  const [servings, setServings] = useState(2);
  const [customizedIngredients, setCustomizedIngredients] = useState<IngredientDetail[]>([]);
  const [showCustomize, setShowCustomize] = useState(false);

  const { data: recipe, isLoading } = useQuery<Recipe>({
    queryKey: ["/api/recipes", recipeId],
  });

  if (isLoading) return <LoadingState />;
  if (!recipe) return <div>Recipe not found</div>;

  const adjustQuantity = (baseQuantity: number) => {
    const ratio = servings / recipe.servings;
    return (baseQuantity * ratio).toFixed(1).replace(/\.0$/, '');
  };

  const handleServingChange = (change: number) => {
    const newServings = Math.max(1, Math.min(8, servings + change));
    setServings(newServings);
  };

  const toggleCustomization = (ingredient: IngredientDetail) => {
    if (!ingredient.isCustomizable) return;

    const existingIndex = customizedIngredients.findIndex(i => i.name === ingredient.name);
    
    if (existingIndex >= 0) {
      // Remove it if it's already customized
      setCustomizedIngredients(prev => prev.filter(i => i.name !== ingredient.name));
    } else {
      // Add it to customized ingredients
      setCustomizedIngredients(prev => [...prev, { ...ingredient }]);
    }
  };

  const isCustomized = (name: string) => {
    return customizedIngredients.some(i => i.name === name);
  };

  const handleOrderClick = () => {
    // Calculate the adjusted base price based on servings
    const basePricePerServing = recipe.price / recipe.servings;
    const adjustedTotal = Math.round(basePricePerServing * servings);
    
    // Navigate to checkout with serving count and customized ingredients
    setLocation(`/checkout/${recipe.id}?servings=${servings}&customized=${customizedIngredients.length > 0}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative mb-8">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-64 md:h-80 object-cover rounded-lg"
        />
        <Badge className="absolute top-4 right-4 bg-amber-500">{recipe.cuisine}</Badge>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
        <p className="text-gray-600 mb-6">{recipe.description}</p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              Prep: {recipe.prepTime}min | Cook: {recipe.cookTime}min
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4" />
            <span>Difficulty: Medium</span>
          </div>
        </div>

        {/* Servings adjuster */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-orange-600" />
            <h3 className="font-medium">Adjust Servings:</h3>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-8 w-8" 
              onClick={() => handleServingChange(-1)}
              disabled={servings <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-lg w-6 text-center">{servings}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-8 w-8" 
              onClick={() => handleServingChange(1)}
              disabled={servings >= 8}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-500 ml-2">persons</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-md flex gap-2 items-center"
            onClick={handleOrderClick}
          >
            <ShoppingCart className="w-5 h-5" />
            Order Now - ₹{((recipe.price / recipe.servings) * servings / 100).toFixed(2)}
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => setShowCustomize(!showCustomize)}
          >
            {showCustomize ? "Hide Customization" : "Customize Ingredients"}
          </Button>
        </div>

        {/* Ingredient customization toggle */}
        {showCustomize && (
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Customize Your Ingredients</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select the ingredients you'd like to exclude or customize. 
                Only highlighted ingredients can be customized.
              </p>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-3 h-3 rounded-full ${ingredient.isCustomizable ? 'bg-green-500' : 'bg-gray-300'}`} 
                      />
                      <span className={ingredient.isCustomizable ? 'font-medium' : 'text-gray-600'}>
                        {ingredient.name} ({adjustQuantity(ingredient.quantity)} {ingredient.unit})
                      </span>
                    </div>
                    <Switch 
                      checked={isCustomized(ingredient.name)}
                      onCheckedChange={() => toggleCustomization(ingredient)}
                      disabled={!ingredient.isCustomizable}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                {customizedIngredients.length > 0 ? (
                  <p>Selected {customizedIngredients.length} ingredient(s) to customize</p>
                ) : (
                  <p>No customizations selected</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2" />
                <span>
                  <span className="font-medium">{adjustQuantity(ingredient.quantity)} {ingredient.unit}</span> {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="font-semibold text-orange-500 flex-shrink-0">
                  {index + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
