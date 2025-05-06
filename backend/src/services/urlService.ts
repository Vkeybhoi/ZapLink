import fs from "fs";
import path from "path";
import validUrl from "valid-url";
const { nanoid } = require("nanoid");

interface UrlStats {
  createdAt: string;
  visits: number;
  lastVisited: string | null;
}

interface UrlRecord {
  shortUrl: string;
  longUrl: string;
  stats: UrlStats;
}

export class UrlService {
  private urlStore: Map<string, string> = new Map();
  private statsStore: Map<string, UrlStats> = new Map();
  private baseUrl = "http://localhost:3001/";
  private dataFilePath = path.join(__dirname, "../../data/urls.json");

  constructor() {
    this.loadData();
  }

  private saveData() {
    const data = {
      urlStore: Array.from(this.urlStore.entries()),
      statsStore: Array.from(this.statsStore.entries()),
    };
    fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2));
  }

  private loadData() {
    if (fs.existsSync(this.dataFilePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(this.dataFilePath, "utf-8"));
        this.urlStore = new Map(data.urlStore || []);
        this.statsStore = new Map(data.statsStore || []);
      } catch (error) {
        console.error(
          "Failed to load data from file. Initializing with empty data."
        );
        this.urlStore = new Map();
        this.statsStore = new Map();
      }
    }
  }

  async encode(longUrl: string): Promise<string> {
    if (!this.isValidUrl(longUrl)) {
      throw new Error("Invalid URL");
    }
    const shortPath = nanoid(6);
    const shortUrl = `${this.baseUrl}${shortPath}`;
    this.urlStore.set(shortPath, longUrl);
    this.statsStore.set(shortPath, {
      createdAt: new Date().toISOString(),
      visits: 0,
      lastVisited: null,
    });
    this.saveData(); // Save data to file
    return shortUrl;
  }

  async decode(shortUrl: string): Promise<string> {
    const shortPath = shortUrl.split("/").pop();
    if (!shortPath || !this.urlStore.has(shortPath)) {
      throw new Error("Short URL not found");
    }
    return this.urlStore.get(shortPath)!;
  }

  async getStats(shortPath: string): Promise<UrlStats> {
    if (!this.statsStore.has(shortPath)) {
      throw new Error("Short URL not found");
    }
    return this.statsStore.get(shortPath)!;
  }

  async list(): Promise<UrlRecord[]> {
    return Array.from(this.urlStore.entries()).map(([shortPath, longUrl]) => ({
      shortUrl: `${this.baseUrl}${shortPath}`,
      longUrl,
      stats: this.statsStore.get(shortPath)!,
    }));
  }

  async redirect(shortPath: string): Promise<string> {
    if (!this.urlStore.has(shortPath)) {
      throw new Error("Short URL not found");
    }
    const longUrl = this.urlStore.get(shortPath)!;
    const stats = this.statsStore.get(shortPath)!;
    this.statsStore.set(shortPath, {
      ...stats,
      visits: stats.visits + 1,
      lastVisited: new Date().toISOString(),
    });
    this.saveData(); // Save updated stats to file
    return longUrl;
  }

  private isValidUrl(url: string): boolean {
    try {
      return !!validUrl.isWebUri(url) && !!new URL(url);
    } catch {
      return false;
    }
  }
}
