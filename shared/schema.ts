import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Interface for ingredient with quantity and unit
export type IngredientDetail = {
  name: string;
  quantity: number;
  unit: string;
  isCustomizable: boolean;
};

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  prepTime: integer("prep_time").notNull(),
  cookTime: integer("cook_time").notNull(),
  servings: integer("servings").notNull(),
  ingredients: jsonb("ingredients").$type<IngredientDetail[]>().notNull(),
  instructions: jsonb("instructions").$type<string[]>().notNull(),
  price: integer("price").notNull(), // in paisa (1 INR = 100 paisa)
  cuisine: text("cuisine").notNull().default("Indian"),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipe_id").notNull(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  status: text("status").notNull().default("pending"),
  total: integer("total").notNull(), // in paisa
  servingCount: integer("serving_count").notNull().default(2),
  customizedIngredients: jsonb("customized_ingredients").$type<IngredientDetail[]>(),
});

// Waitlist schema for users to sign up for early access
export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRecipeSchema = createInsertSchema(recipes);
export const insertOrderSchema = createInsertSchema(orders).pick({
  recipeId: true,
  customerName: true,
  email: true,
  address: true,
  phone: true,
  servingCount: true,
  customizedIngredients: true,
});
export const insertWaitlistSchema = createInsertSchema(waitlist).pick({
  name: true,
  email: true,
  phone: true,
});

export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Waitlist = typeof waitlist.$inferSelect;
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
