import { useQuery } from "@tanstack/react-query";
import { type Recipe } from "@shared/schema";
import { RecipeGrid } from "@/components/recipe-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChefHat, Clock, Utensils, IndianRupee, ArrowRight, Flame } from "lucide-react";

const featuredCategories = [
  {
    name: "Main Course",
    image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Rich and flavorful main dishes"
  },
  {
    name: "Appetizers",
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Perfect starters for your meal"
  },
  {
    name: "Breads",
    image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Freshly baked Indian breads"
  },
  {
    name: "Desserts",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Sweet treats to end your meal"
  }
];

const features = [
  {
    icon: <ChefHat className="w-8 h-8" />,
    title: "Expert Recipes",
    description: "Curated by professional chefs"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Quick Delivery",
    description: "Fresh ingredients at your doorstep"
  },
  {
    icon: <Utensils className="w-8 h-8" />,
    title: "Easy Cooking",
    description: "Step-by-step instructions"
  },
  {
    icon: <IndianRupee className="w-8 h-8" />,
    title: "Best Value",
    description: "Quality ingredients at great prices"
  }
];

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
  const [, setLocation] = useLocation();
  const { data: recipes, isLoading } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-red-600/90"></div>
          <img
            src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Indian Cuisine"
            className="w-full h-[600px] object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover the Magic of Indian Cuisine
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Experience authentic Indian flavors with our carefully curated recipes and premium ingredients delivered to your doorstep.
            </p>
            <Button
              onClick={() => setLocation("/menu")}
              className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Menu <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-orange-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-900">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setLocation(`/menu?category=${category.name}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Recipes */}
      <div className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-orange-900">Popular Recipes</h2>
            <Button
              onClick={() => setLocation("/menu")}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          {isLoading ? <LoadingGrid /> : recipes && <RecipeGrid recipes={recipes} />}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Cooking?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of food lovers who are already enjoying authentic Indian cuisine at home.
          </p>
          <Button
            onClick={() => setLocation("/menu")}
            className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
