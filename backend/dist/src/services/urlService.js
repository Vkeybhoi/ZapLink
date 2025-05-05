"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const valid_url_1 = __importDefault(require("valid-url"));
const { nanoid } = require("nanoid");
class UrlService {
    constructor() {
        this.urlStore = new Map();
        this.statsStore = new Map();
        this.baseUrl = "http://zap.link/";
    }
    async encode(longUrl) {
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
    async decode(shortUrl) {
        const shortPath = shortUrl.split("/").pop();
        if (!shortPath || !this.urlStore.has(shortPath)) {
            throw new Error("Short URL not found");
        }
        return this.urlStore.get(shortPath);
    }
    async getStats(shortPath) {
        if (!this.statsStore.has(shortPath)) {
            throw new Error("Short URL not found");
        }
        return this.statsStore.get(shortPath);
    }
    async list() {
        return Array.from(this.urlStore.entries()).map(([shortPath, longUrl]) => ({
            shortUrl: `${this.baseUrl}${shortPath}`,
            longUrl,
            stats: this.statsStore.get(shortPath),
        }));
    }
    async redirect(shortPath) {
        if (!this.urlStore.has(shortPath)) {
            throw new Error("Short URL not found");
        }
        const stats = this.statsStore.get(shortPath);
        this.statsStore.set(shortPath, {
            ...stats,
            visits: stats.visits + 1,
            lastVisited: new Date().toISOString(),
        });
        return this.urlStore.get(shortPath);
    }
    isValidUrl(url) {
        try {
            // Use both valid-url and URL constructor for robust validation
            return !!valid_url_1.default.isWebUri(url) && !!new URL(url); // This will throw for invalid URLs
        }
        catch {
            return false;
        }
    }
}
exports.UrlService = UrlService;
//# sourceMappingURL=urlService.js.map