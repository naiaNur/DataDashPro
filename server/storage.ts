import { campaigns, type Campaign, type InsertCampaign } from "@shared/schema";
import { leads, type Lead, type InsertLead } from "@shared/schema";

export interface IStorage {
  getLeads(): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
}

export class MemStorage implements IStorage {
  private leads: Map<number, Lead>;
  private campaigns: Map<number, Campaign>;
  private leadId: number;
  private campaignId: number;

  constructor() {
    this.leads = new Map();
    this.campaigns = new Map();
    this.leadId = 1;
    this.campaignId = 1;

    // Initialize with some sample campaigns
    const sampleCampaigns: InsertCampaign[] = [
      {
        name: "Summer Email Campaign",
        type: "Email Marketing",
        status: "Active",
        budget: "$4,000",
        conversions: "1,245",
        roi: "125%",
      },
      {
        name: "Instagram Promotion",
        type: "Social Media",
        status: "Pending",
        budget: "$3,200",
        conversions: "876",
        roi: "85%",
      },
      {
        name: "Google Ads Q3",
        type: "Search Ads",
        status: "Completed",
        budget: "$6,500",
        conversions: "2,310",
        roi: "-15%",
      },
    ];

    // Initialize campaigns
    sampleCampaigns.forEach((campaign) => {
      this.createCampaign(campaign);
    });
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const id = this.leadId++;
    const now = new Date();
    const newLead: Lead = { ...lead, id, createdAt: now };
    this.leads.set(id, newLead);
    return newLead;
  }

  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const id = this.campaignId++;
    const newCampaign: Campaign = { ...campaign, id };
    this.campaigns.set(id, newCampaign);
    return newCampaign;
  }
}

export const storage = new MemStorage();
