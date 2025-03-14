import { useQuery } from "@tanstack/react-query";
import { type Recipe } from "@shared/schema";
import { RecipeGrid } from "@/components/recipe-grid";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { data: recipes, isLoading } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes"],
  });

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Discover Delicious Recipes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our collection of carefully crafted recipes and have them delivered to your door with all the ingredients you need.
          </p>
        </div>

        {isLoading ? <LoadingGrid /> : recipes && <RecipeGrid recipes={recipes} />}
      </div>
    </div>
  );
}
