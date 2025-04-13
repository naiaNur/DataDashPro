import { 
  campaigns, type Campaign, type InsertCampaign,
  products, type Product, type InsertProduct
} from "@shared/schema";
import { leads, type Lead, type InsertLead } from "@shared/schema";

export interface IStorage {
  getLeads(): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private leads: Map<number, Lead>;
  private campaigns: Map<number, Campaign>;
  private products: Map<number, Product>;
  private leadId: number;
  private campaignId: number;
  private productId: number;

  constructor() {
    this.leads = new Map();
    this.campaigns = new Map();
    this.products = new Map();
    this.leadId = 1;
    this.campaignId = 1;
    this.productId = 1;

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

    // Initialize sample products
    const sampleProducts: InsertProduct[] = [
      {
        name: "Wireless Bluetooth Earbuds",
        description: "Premium noise-cancelling wireless earbuds with long battery life and crystal-clear sound quality.",
        price: "99.99",
        imageUrl: "https://placehold.co/400x300?text=Wireless+Earbuds",
        category: "Electronics",
        stock: "45",
        rating: "4.7",
        featured: "true"
      },
      {
        name: "Smart Fitness Watch",
        description: "Track your fitness goals, heart rate, and sleep patterns with this advanced smartwatch.",
        price: "129.99",
        imageUrl: "https://placehold.co/400x300?text=Fitness+Watch",
        category: "Electronics",
        stock: "28",
        rating: "4.5",
        featured: "true"
      },
      {
        name: "Organic Cotton T-Shirt",
        description: "Comfortable, eco-friendly t-shirt made from 100% organic cotton.",
        price: "29.99",
        imageUrl: "https://placehold.co/400x300?text=Cotton+Shirt",
        category: "Clothing",
        stock: "120",
        rating: "4.2",
        featured: "false"
      },
      {
        name: "Stainless Steel Water Bottle",
        description: "Eco-friendly, vacuum-insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
        price: "34.99",
        imageUrl: "https://placehold.co/400x300?text=Water+Bottle",
        category: "Home & Kitchen",
        stock: "75",
        rating: "4.8",
        featured: "true"
      },
      {
        name: "Wireless Charging Pad",
        description: "Fast-charging wireless pad compatible with all Qi-enabled smartphones.",
        price: "49.99",
        imageUrl: "https://placehold.co/400x300?text=Charging+Pad",
        category: "Electronics",
        stock: "30",
        rating: "4.4",
        featured: "false"
      },
      {
        name: "Natural Face Moisturizer",
        description: "Hydrating face cream with natural ingredients suitable for all skin types.",
        price: "24.99",
        imageUrl: "https://placehold.co/400x300?text=Face+Moisturizer",
        category: "Beauty",
        stock: "60",
        rating: "4.6",
        featured: "false"
      },
      {
        name: "Premium Yoga Mat",
        description: "Non-slip, eco-friendly yoga mat with perfect cushioning for all types of yoga.",
        price: "59.99",
        imageUrl: "https://placehold.co/400x300?text=Yoga+Mat",
        category: "Sports",
        stock: "40",
        rating: "4.3",
        featured: "true"
      },
      {
        name: "Portable Bluetooth Speaker",
        description: "Waterproof Bluetooth speaker with 360° sound and 20-hour battery life.",
        price: "79.99",
        imageUrl: "https://placehold.co/400x300?text=Bluetooth+Speaker",
        category: "Electronics",
        stock: "35",
        rating: "4.5",
        featured: "false"
      }
    ];

    // Initialize campaigns
    sampleCampaigns.forEach((campaign) => {
      this.createCampaign(campaign);
    });
    
    // Initialize products
    sampleProducts.forEach((product) => {
      this.createProduct(product);
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

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.featured === "true"
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }
}

export const storage = new MemStorage();
