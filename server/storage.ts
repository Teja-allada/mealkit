import { Recipe, InsertRecipe, Order, InsertOrder, Waitlist, InsertWaitlist, IngredientDetail } from "@shared/schema";

export interface IStorage {
  getAllRecipes(): Promise<Recipe[]>;
  getRecipeById(id: number): Promise<Recipe | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  getAllWaitlistEntries(): Promise<Waitlist[]>;
}

export class MemStorage implements IStorage {
  private recipes: Map<number, Recipe>;
  private orders: Map<number, Order>;
  private waitlistEntries: Map<number, Waitlist>;
  private recipeId: number;
  private orderId: number;
  private waitlistId: number;

  constructor() {
    this.recipes = new Map();
    this.orders = new Map();
    this.waitlistEntries = new Map();
    this.recipeId = 1;
    this.orderId = 1;
    this.waitlistId = 1;
    this.seedRecipes();
  }

  private seedRecipes() {
    const sampleRecipes: InsertRecipe[] = [
      {
        name: "Butter Chicken",
        description: "Rich and creamy curry made with tender chicken in a mildly spiced tomato sauce",
        imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
        prepTime: 25,
        cookTime: 30,
        servings: 2,
        ingredients: [
          { name: "Chicken breast", quantity: 500, unit: "g", isCustomizable: true },
          { name: "Tomato puree", quantity: 200, unit: "ml", isCustomizable: false },
          { name: "Heavy cream", quantity: 100, unit: "ml", isCustomizable: true },
          { name: "Butter", quantity: 50, unit: "g", isCustomizable: false },
          { name: "Garam masala", quantity: 2, unit: "tsp", isCustomizable: false },
          { name: "Kasuri methi", quantity: 1, unit: "tsp", isCustomizable: true },
          { name: "Garlic paste", quantity: 1, unit: "tbsp", isCustomizable: false },
          { name: "Ginger paste", quantity: 1, unit: "tbsp", isCustomizable: false }
        ],
        instructions: [
          "Marinate chicken with yogurt, ginger-garlic paste, and spices for 2 hours",
          "Cook marinated chicken in tandoor or oven until 80% done",
          "Prepare sauce by sautéing onions, adding tomato puree and spices",
          "Add cream and butter to the sauce",
          "Add chicken pieces to the sauce and simmer for 10 minutes",
          "Garnish with kasuri methi and serve hot with naan"
        ],
        price: 39900, // ₹399.00
        cuisine: "North Indian"
      },
      {
        name: "Masala Dosa",
        description: "Crisp fermented rice pancake stuffed with spiced potato filling",
        imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
        prepTime: 30,
        cookTime: 15,
        servings: 2,
        ingredients: [
          { name: "Rice batter", quantity: 300, unit: "ml", isCustomizable: false },
          { name: "Potatoes", quantity: 200, unit: "g", isCustomizable: true },
          { name: "Onions", quantity: 100, unit: "g", isCustomizable: true },
          { name: "Mustard seeds", quantity: 1, unit: "tsp", isCustomizable: false },
          { name: "Curry leaves", quantity: 5, unit: "pcs", isCustomizable: false },
          { name: "Green chilies", quantity: 2, unit: "pcs", isCustomizable: true },
          { name: "Turmeric powder", quantity: 0.5, unit: "tsp", isCustomizable: false },
          { name: "Coconut chutney", quantity: 50, unit: "g", isCustomizable: true },
          { name: "Sambar", quantity: 100, unit: "ml", isCustomizable: true }
        ],
        instructions: [
          "Boil potatoes until soft, then peel and mash them",
          "In a pan, add oil, mustard seeds, curry leaves, and let them splutter",
          "Add chopped onions, green chilies and sauté until translucent",
          "Add turmeric powder and mashed potatoes, mix well",
          "Heat dosa tawa, pour a ladle of batter and spread in circular motion",
          "Add oil around the edges and cook until crisp",
          "Place potato filling in the center and fold the dosa",
          "Serve hot with coconut chutney and sambar"
        ],
        price: 14900, // ₹149.00
        cuisine: "South Indian"
      },
      {
        name: "Paneer Tikka",
        description: "Chunks of cottage cheese marinated with spices and grilled to perfection",
        imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6",
        prepTime: 30,
        cookTime: 15,
        servings: 2,
        ingredients: [
          { name: "Paneer", quantity: 250, unit: "g", isCustomizable: true },
          { name: "Bell peppers", quantity: 100, unit: "g", isCustomizable: true },
          { name: "Onions", quantity: 100, unit: "g", isCustomizable: true },
          { name: "Yogurt", quantity: 100, unit: "ml", isCustomizable: false },
          { name: "Ginger paste", quantity: 1, unit: "tsp", isCustomizable: false },
          { name: "Garlic paste", quantity: 1, unit: "tsp", isCustomizable: false },
          { name: "Tikka masala", quantity: 2, unit: "tbsp", isCustomizable: false },
          { name: "Chaat masala", quantity: 1, unit: "tsp", isCustomizable: false },
          { name: "Lemon juice", quantity: 2, unit: "tsp", isCustomizable: false }
        ],
        instructions: [
          "Cut paneer, bell peppers, and onions into 1-inch cubes",
          "Mix yogurt with all the spices, ginger-garlic paste, and lemon juice",
          "Add the cubed paneer and vegetables to the marinade and mix well",
          "Let it marinate for at least 30 minutes",
          "Thread the marinated paneer and vegetables onto skewers",
          "Grill in a preheated oven at 200°C for 10-15 minutes",
          "Brush with butter and grill for another 5 minutes",
          "Sprinkle chaat masala and serve hot with mint chutney"
        ],
        price: 24900, // ₹249.00
        cuisine: "North Indian"
      }
    ];

    sampleRecipes.forEach(recipe => {
      this.recipes.set(this.recipeId, { ...recipe, id: this.recipeId });
      this.recipeId++;
    });
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipeById(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const recipe = await this.getRecipeById(order.recipeId);
    if (!recipe) {
      throw new Error("Recipe not found");
    }

    // Calculate total based on serving count
    const basePrice = recipe.price;
    const pricePerServing = basePrice / recipe.servings;
    const totalPrice = Math.round(pricePerServing * (order.servingCount || recipe.servings));

    const newOrder: Order = {
      id: this.orderId++,
      recipeId: order.recipeId,
      customerName: order.customerName,
      email: order.email,
      address: order.address,
      phone: order.phone,
      status: "pending",
      total: totalPrice,
      servingCount: order.servingCount || recipe.servings,
      customizedIngredients: order.customizedIngredients ?? []
    };

    this.orders.set(newOrder.id, newOrder);
    return newOrder;
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const newEntry: Waitlist = {
      id: this.waitlistId++,
      name: entry.name,
      email: entry.email,
      phone: entry.phone || null,
      createdAt: new Date()
    };

    this.waitlistEntries.set(newEntry.id, newEntry);
    return newEntry;
  }

  async getAllWaitlistEntries(): Promise<Waitlist[]> {
    return Array.from(this.waitlistEntries.values());
  }
}

export const storage = new MemStorage();
