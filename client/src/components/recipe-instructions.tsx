import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Utensils, ChefHat, AlertCircle } from "lucide-react";

interface RecipeInstructionsProps {
  name: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  tips?: string[];
}

export function RecipeInstructions({
  name,
  prepTime,
  cookTime,
  servings,
  difficulty,
  ingredients,
  instructions,
  tips,
}: RecipeInstructionsProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Recipe Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-900 mb-4">{name}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Prep: {prepTime}</span>
          </div>
          <div className="flex items-center">
            <Utensils className="w-4 h-4 mr-2" />
            <span>Cook: {cookTime}</span>
          </div>
          <div className="flex items-center">
            <ChefHat className="w-4 h-4 mr-2" />
            <span>Difficulty: {difficulty}</span>
          </div>
          <div className="flex items-center">
            <span>Servings: {servings}</span>
          </div>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-orange-900 mb-4">Ingredients</h2>
        <div className="bg-orange-50 rounded-lg p-4">
          <ul className="list-disc list-inside space-y-2">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cooking Instructions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-orange-900 mb-4">Instructions</h2>
        <div className="space-y-6">
          {instructions.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <div className="flex-grow">
                <p className="text-gray-700">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      {tips && tips.length > 0 && (
        <div className="bg-orange-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-orange-900 mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            Chef's Tips
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="text-gray-700">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 