import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertWaitlistSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Recipe routes
  app.get("/api/recipes", async (_req, res) => {
    const recipes = await storage.getAllRecipes();
    res.json(recipes);
  });

  app.get("/api/recipes/:id", async (req, res) => {
    const recipe = await storage.getRecipeById(Number(req.params.id));
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  });

  // Order routes
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid order data" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    const order = await storage.getOrderById(Number(req.params.id));
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  });

  // Waitlist routes
  app.post("/api/waitlist", async (req, res) => {
    try {
      const waitlistData = insertWaitlistSchema.parse(req.body);
      const entry = await storage.addToWaitlist(waitlistData);
      res.status(201).json({ success: true, message: "Successfully added to waitlist", data: entry });
    } catch (error) {
      res.status(400).json({ success: false, message: "Invalid waitlist data" });
    }
  });

  app.get("/api/waitlist", async (_req, res) => {
    try {
      const entries = await storage.getAllWaitlistEntries();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving waitlist entries" });
    }
  });

  return createServer(app);
}
