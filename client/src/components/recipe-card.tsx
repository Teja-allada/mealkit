import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, UtensilsCrossed } from "lucide-react";
import { type Recipe } from "@shared/schema";
import { Link } from "wouter";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{recipe.name}</h3>
          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
            {recipe.cuisine}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="font-semibold text-orange-600">₹{(recipe.price / 100).toFixed(2)}</span>
        <Link href={`/recipe/${recipe.id}`}>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-md">View Recipe</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
