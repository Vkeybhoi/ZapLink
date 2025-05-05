"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urlService_1 = require("../src/services/urlService");
describe("UrlService", () => {
    let urlService;
    beforeEach(() => {
        urlService = new urlService_1.UrlService();
    });
    test("encode should create a short URL for a valid long URL", async () => {
        const longUrl = "https://example.com";
        const shortUrl = await urlService.encode(longUrl);
        expect(shortUrl).toMatch(/^http:\/\/zap\.link\/[a-zA-Z0-9]{6}$/);
    });
    test("encode should throw an error for an invalid long URL", async () => {
        const invalidUrl = "invalid-url";
        await expect(urlService.encode(invalidUrl)).rejects.toThrow("Invalid URL");
    });
    test("decode should return the original long URL for a valid short URL", async () => {
        const longUrl = "https://example.com";
        const shortUrl = await urlService.encode(longUrl);
        const decodedUrl = await urlService.decode(shortUrl);
        expect(decodedUrl).toBe(longUrl);
    });
    test("decode should throw an error for a non-existent short URL", async () => {
        const nonExistentShortUrl = "http://zap.link/abcdef";
        await expect(urlService.decode(nonExistentShortUrl)).rejects.toThrow("Short URL not found");
    });
    test("getStats should return stats for a valid short URL", async () => {
        const longUrl = "https://example.com";
        const shortUrl = await urlService.encode(longUrl);
        const shortPath = shortUrl.split("/").pop();
        const stats = await urlService.getStats(shortPath);
        expect(stats).toEqual({
            createdAt: expect.any(String),
            visits: 0,
            lastVisited: null,
        });
    });
    test("getStats should throw an error for a non-existent short URL", async () => {
        const nonExistentShortPath = "abcdef";
        await expect(urlService.getStats(nonExistentShortPath)).rejects.toThrow("Short URL not found");
    });
    test("list should return all stored URLs with their stats", async () => {
        const longUrl1 = "https://example1.com";
        const longUrl2 = "https://example2.com";
        const shortUrl1 = await urlService.encode(longUrl1);
        const shortUrl2 = await urlService.encode(longUrl2);
        const urls = await urlService.list();
        expect(urls).toEqual(expect.arrayContaining([
            {
                shortUrl: shortUrl1,
                longUrl: longUrl1,
                stats: expect.objectContaining({
                    createdAt: expect.any(String),
                    visits: 0,
                    lastVisited: null,
                }),
            },
            {
                shortUrl: shortUrl2,
                longUrl: longUrl2,
                stats: expect.objectContaining({
                    createdAt: expect.any(String),
                    visits: 0,
                    lastVisited: null,
                }),
            },
        ]));
    });
    test("redirect should return the original long URL and update stats", async () => {
        const longUrl = "https://example.com";
        const shortUrl = await urlService.encode(longUrl);
        const shortPath = shortUrl.split("/").pop();
        const redirectedUrl = await urlService.redirect(shortPath);
        expect(redirectedUrl).toBe(longUrl);
        const stats = await urlService.getStats(shortPath);
        expect(stats.visits).toBe(1);
        expect(stats.lastVisited).toEqual(expect.any(String));
    });
    test("redirect should throw an error for a non-existent short URL", async () => {
        const nonExistentShortPath = "abcdef";
        await expect(urlService.redirect(nonExistentShortPath)).rejects.toThrow("Short URL not found");
    });
});
//# sourceMappingURL=urlController.test.js.map