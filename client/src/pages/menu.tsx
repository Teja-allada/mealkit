import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLocation } from "wouter";
import { Search, Clock, Flame, ChefHat, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/nav";
import { AnimatedBackground } from "@/components/animated-background";
import { animations, colors, gradients, glassmorphism, shadows } from "@/styles/theme";

// Mock data for all dishes
const allDishes = [
  {
    id: "1",
    name: "Butter Chicken",
    description: "Tender chicken pieces in rich, creamy tomato sauce with aromatic spices",
    price: 399,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    category: "Main Course",
    spiceLevel: "Medium",
    preparationTime: "45 mins",
    calories: 450
  },
  {
    id: "2",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato and onion mixture",
    price: 199,
    image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Main Course",
    spiceLevel: "Mild",
    preparationTime: "30 mins",
    calories: 350
  },
  {
    id: "3",
    name: "Paneer Tikka",
    description: "Grilled cottage cheese marinated in spiced yogurt",
    price: 299,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    category: "Appetizers",
    spiceLevel: "Medium",
    preparationTime: "40 mins",
    calories: 320
  },
  {
    id: "4",
    name: "Hyderabadi Biryani",
    description: "Fragrant basmati rice cooked with tender meat and aromatic spices",
    price: 449,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    category: "Main Course",
    spiceLevel: "Hot",
    preparationTime: "60 mins",
    calories: 550
  },
  {
    id: "5",
    name: "Tandoori Roti",
    description: "Traditional Indian flatbread baked in a clay oven",
    price: 49,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    category: "Breads",
    spiceLevel: "Mild",
    preparationTime: "15 mins",
    calories: 120
  },
  {
    id: "6",
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked with butter and spices",
    price: 249,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    category: "Main Course",
    spiceLevel: "Mild",
    preparationTime: "50 mins",
    calories: 280
  },
  {
    id: "7",
    name: "Gulab Jamun",
    description: "Sweet milk dumplings soaked in sugar syrup",
    price: 149,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    category: "Desserts",
    spiceLevel: "Mild",
    preparationTime: "35 mins",
    calories: 180
  },
  {
    id: "8",
    name: "Chicken Tikka",
    description: "Grilled chicken marinated in spiced yogurt",
    price: 349,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    category: "Appetizers",
    spiceLevel: "Medium",
    preparationTime: "45 mins",
    calories: 380
  },
  {
    id: "9",
    name: "Naan",
    description: "Soft, fluffy Indian bread baked in a clay oven",
    price: 49,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    category: "Breads",
    spiceLevel: "Mild",
    preparationTime: "20 mins",
    calories: 150
  },
  {
    id: "10",
    name: "Rasmalai",
    description: "Soft cottage cheese dumplings in sweet milk sauce",
    price: 149,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    category: "Desserts",
    spiceLevel: "Mild",
    preparationTime: "40 mins",
    calories: 200
  }
];

export default function Menu() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const filteredDishes = allDishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || dish.category === selectedCategory;
    const matchesSpiceLevel = !selectedSpiceLevel || dish.spiceLevel === selectedSpiceLevel;
    const matchesPrice = dish.price >= priceRange[0] && dish.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesSpiceLevel && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative">
      <Nav />
      <AnimatedBackground />

      <div className="relative">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={animations.slideIn}
          className="py-8 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1
              variants={animations.fadeIn}
              className="text-4xl font-bold text-orange-900 mb-4 text-center"
            >
              Our Menu
            </motion.h1>
            <motion.div
              variants={animations.fadeIn}
              className="max-w-xl mx-auto relative"
            >
              <Input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 ${glassmorphism.medium} border-orange-200`}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <motion.div
              variants={animations.slideIn}
              initial="initial"
              animate="animate"
              className="lg:col-span-1"
            >
              <Card className={`${glassmorphism.medium} ${shadows.md}`}>
                <CardContent className="p-6 space-y-6">
                  {/* Category Filter */}
                  <div>
                    <Label className="text-orange-900 font-semibold mb-3 block">Categories</Label>
                    <div className="space-y-2">
                      {["Main Course", "Appetizers", "Breads", "Desserts"].map((category) => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === category
                              ? gradients.primary + " text-white"
                              : "hover:bg-orange-50 text-gray-700"
                          }`}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Spice Level Filter */}
                  <div>
                    <Label className="text-orange-900 font-semibold mb-3 block">Spice Level</Label>
                    <div className="space-y-2">
                      {["Mild", "Medium", "Hot"].map((level) => (
                        <motion.button
                          key={level}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedSpiceLevel(selectedSpiceLevel === level ? null : level)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                            selectedSpiceLevel === level
                              ? gradients.primary + " text-white"
                              : "hover:bg-orange-50 text-gray-700"
                          }`}
                        >
                          <Flame className="w-4 h-4" />
                          {level}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Dishes Grid */}
            <div className="lg:col-span-3">
              <AnimatePresence>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredDishes.map((dish, index) => (
                    <motion.div
                      key={dish.id}
                      variants={animations.scaleIn}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      {...animations.cardHover}
                    >
                      <Card className={`${glassmorphism.medium} ${shadows.lg} overflow-hidden`}>
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-48 object-cover"
                        />
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg text-orange-900 mb-2">{dish.name}</h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{dish.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              {dish.preparationTime}
                            </div>
                            <span className="font-bold text-orange-600 flex items-center gap-1">
                              <IndianRupee className="w-4 h-4" />
                              {dish.price}
                            </span>
                          </div>
                          <motion.div
                            {...animations.buttonTap}
                            className="mt-4"
                          >
                            <Button
                              onClick={() => setLocation(`/recipe/${dish.id}`)}
                              className={`w-full ${gradients.primary} text-white`}
                            >
                              View Recipe
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 