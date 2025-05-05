"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlController = void 0;
const urlService_1 = require("../services/urlService");
const qrCodeUtil_1 = require("../utils/qrCodeUtil");
class UrlController {
    async encode(req, res) {
        try {
            const { longUrl } = req.body;
            const shortUrl = await UrlController.urlService.encode(longUrl);
            res.json({ shortUrl });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async decode(req, res) {
        try {
            const { shortUrl } = req.query;
            const longUrl = await UrlController.urlService.decode(shortUrl);
            res.json({ longUrl });
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    async getStats(req, res) {
        try {
            const { urlPath } = req.params;
            const stats = await UrlController.urlService.getStats(urlPath);
            res.json(stats);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    async list(req, res) {
        try {
            const urls = await UrlController.urlService.list();
            res.json(urls);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async redirect(req, res) {
        try {
            const { urlPath } = req.params;
            const longUrl = await UrlController.urlService.redirect(urlPath);
            res.redirect(longUrl);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    async getQRCode(req, res) {
        try {
            const { urlPath } = req.params;
            const shortUrl = `http://zap.link/${urlPath}`;
            const longUrl = await UrlController.urlService.decode(shortUrl); // Validate URL exists
            const qrCode = await (0, qrCodeUtil_1.generateQRCode)(shortUrl);
            res.json({ qrCode });
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}
exports.UrlController = UrlController;
UrlController.urlService = new urlService_1.UrlService();
//# sourceMappingURL=urlController.js.map