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
  private baseUrl = "http://zap.link/";

  async encode(longUrl: string): Promise<string> {
    if (!this.isValidUrl(longUrl)) {
      throw new Error("Invalid URL");
    }
    const shortPath = nanoid(6); // Use nanoid directly
    const shortUrl = `${this.baseUrl}${shortPath}`;
    this.urlStore.set(shortPath, longUrl);
    this.statsStore.set(shortPath, {
      createdAt: new Date().toISOString(),
      visits: 0,
      lastVisited: null,
    });
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
    const stats = this.statsStore.get(shortPath)!;
    this.statsStore.set(shortPath, {
      ...stats,
      visits: stats.visits + 1,
      lastVisited: new Date().toISOString(),
    });
    return this.urlStore.get(shortPath)!;
  }

  private isValidUrl(url: string): boolean {
    try {
      // Use both valid-url and URL constructor for robust validation
      return !!validUrl.isWebUri(url) && !!new URL(url); // This will throw for invalid URLs
    } catch {
      return false;
    }
  }
}
