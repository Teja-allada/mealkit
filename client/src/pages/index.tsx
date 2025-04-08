import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChefHat, Clock, Utensils } from "lucide-react";
import { Nav } from "@/components/nav";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Nav />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-orange-900 mb-6">
                Cook Like a Pro with <br />
                <span className="text-[#7CCDC4]">Tvarit</span> Food Kits
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Premium ingredients, step-by-step recipes, and everything you need to create restaurant-quality dishes at home.
              </p>
              <Button
                onClick={() => setLocation("/menu")}
                className="bg-gradient-to-r from-[#7CCDC4] to-[#A8D97C] text-white px-8 py-6 text-lg rounded-full hover:from-[#6BBDB4] hover:to-[#97C86B] transform hover:scale-105 transition-all duration-300"
              >
                Explore Our Menu
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-[#7CCDC4]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-[#A8D97C]/10 blur-3xl" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#7CCDC4] to-[#A8D97C] rounded-full flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-orange-900 mb-4">Premium Ingredients</h3>
              <p className="text-gray-600">
                Hand-picked, fresh ingredients sourced directly from local farmers and suppliers.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#7CCDC4] to-[#A8D97C] rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-orange-900 mb-4">Quick & Easy</h3>
              <p className="text-gray-600">
                Pre-measured ingredients and simple instructions for hassle-free cooking.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#7CCDC4] to-[#A8D97C] rounded-full flex items-center justify-center">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-orange-900 mb-4">Restaurant Quality</h3>
              <p className="text-gray-600">
                Create dishes that look and taste like they're made by professional chefs.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-orange-900 mb-6">
              Ready to Start Cooking?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of home chefs creating amazing dishes with Tvarit Food Kits.
            </p>
            <Button
              onClick={() => setLocation("/menu")}
              className="bg-gradient-to-r from-[#7CCDC4] to-[#A8D97C] text-white px-8 py-6 text-lg rounded-full hover:from-[#6BBDB4] hover:to-[#97C86B] transform hover:scale-105 transition-all duration-300"
            >
              Browse Our Menu
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 