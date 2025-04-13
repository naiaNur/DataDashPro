import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertProductSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to handle form submissions
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const newLead = await storage.createLead(leadData);
      res.status(201).json({ success: true, data: newLead });
    } catch (error) {
      res.status(400).json({ success: false, error: String(error) });
    }
  });

  // API endpoint to get all campaigns
  app.get("/api/campaigns", async (_req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      res.status(200).json(campaigns);
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  // API endpoint to get a specific campaign
  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const campaign = await storage.getCampaign(id);
      
      if (!campaign) {
        return res.status(404).json({ success: false, error: "Campaign not found" });
      }
      
      res.status(200).json(campaign);
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  // API endpoint to get all products
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  // API endpoint to get a specific product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ success: false, error: "Product not found" });
      }
      
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  // API endpoint to get products by category
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  // API endpoint to get featured products
  app.get("/api/products/featured", async (_req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  // API endpoint to search products
  app.get("/api/products/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const products = await storage.searchProducts(query);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  // API endpoint to create a new product
  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const newProduct = await storage.createProduct(productData);
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      res.status(400).json({ success: false, error: String(error) });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
