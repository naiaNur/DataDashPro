import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";

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

  const httpServer = createServer(app);

  return httpServer;
}
