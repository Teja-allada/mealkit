import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { type Recipe } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

  const { data: recipe, isLoading } = useQuery<Recipe>({
    queryKey: ["/api/recipes", recipeId],
  });

  if (isLoading) return <LoadingState />;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="w-full h-64 object-cover rounded-lg mb-8"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
        <p className="text-gray-600 mb-4">{recipe.description}</p>

        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              Prep: {recipe.prepTime}min | Cook: {recipe.cookTime}min
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <Button
          size="lg"
          onClick={() => setLocation(`/checkout/${recipe.id}`)}
        >
          Order Now - ${(recipe.price / 100).toFixed(2)}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="font-semibold text-orange-500">
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
