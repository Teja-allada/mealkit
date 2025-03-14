import { Recipe, InsertRecipe, Order, InsertOrder } from "@shared/schema";

export interface IStorage {
  getAllRecipes(): Promise<Recipe[]>;
  getRecipeById(id: number): Promise<Recipe | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private recipes: Map<number, Recipe>;
  private orders: Map<number, Order>;
  private recipeId: number;
  private orderId: number;

  constructor() {
    this.recipes = new Map();
    this.orders = new Map();
    this.recipeId = 1;
    this.orderId = 1;
    this.seedRecipes();
  }

  private seedRecipes() {
    const sampleRecipes: InsertRecipe[] = [
      {
        name: "Classic Margherita Pizza",
        description: "Traditional Italian pizza with fresh mozzarella and basil",
        imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
        prepTime: 30,
        cookTime: 15,
        servings: 2,
        ingredients: ["Pizza dough", "Fresh mozzarella", "Tomatoes", "Fresh basil", "Olive oil"],
        instructions: [
          "Preheat oven to 450°F",
          "Roll out pizza dough",
          "Add tomato sauce",
          "Top with mozzarella and basil",
          "Bake for 12-15 minutes"
        ],
        price: 1499
      },
      {
        name: "Grilled Salmon Bowl",
        description: "Fresh grilled salmon with quinoa and vegetables",
        imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
        prepTime: 20,
        cookTime: 25,
        servings: 2,
        ingredients: ["Salmon fillet", "Quinoa", "Avocado", "Cherry tomatoes", "Lemon"],
        instructions: [
          "Cook quinoa according to package",
          "Season salmon with herbs",
          "Grill salmon for 4-5 minutes per side",
          "Assemble bowl with quinoa base",
          "Top with salmon and vegetables"
        ],
        price: 1899
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

    const newOrder: Order = {
      id: this.orderId++,
      ...order,
      status: "pending",
      total: recipe.price
    };

    this.orders.set(newOrder.id, newOrder);
    return newOrder;
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
