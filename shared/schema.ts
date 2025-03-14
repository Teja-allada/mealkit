import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  prepTime: integer("prep_time").notNull(),
  cookTime: integer("cook_time").notNull(),
  servings: integer("servings").notNull(),
  ingredients: jsonb("ingredients").$type<string[]>().notNull(),
  instructions: jsonb("instructions").$type<string[]>().notNull(),
  price: integer("price").notNull(), // in cents
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipe_id").notNull(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  status: text("status").notNull().default("pending"),
  total: integer("total").notNull(), // in cents
});

export const insertRecipeSchema = createInsertSchema(recipes);
export const insertOrderSchema = createInsertSchema(orders).pick({
  recipeId: true,
  customerName: true,
  email: true,
  address: true,
  phone: true,
});

export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
