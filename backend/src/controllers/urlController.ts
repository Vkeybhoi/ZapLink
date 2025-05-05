import { Request, Response } from 'express';
import { UrlService } from '../services/urlService';
import { generateQRCode } from '../utils/qrCodeUtil';

export class UrlController {
  static urlService = new UrlService();

  async encode(req: Request, res: Response) {
    try {
      const { longUrl } = req.body;
      const shortUrl = await UrlController.urlService.encode(longUrl);
      res.json({ shortUrl });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async decode(req: Request, res: Response) {
    try {
      const { shortUrl } = req.query as { shortUrl: string };
      const longUrl = await UrlController.urlService.decode(shortUrl);
      res.json({ longUrl });
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const { urlPath } = req.params;
      const stats = await UrlController.urlService.getStats(urlPath);
      res.json(stats);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const urls = await UrlController.urlService.list();
      res.json(urls);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async redirect(req: Request, res: Response) {
    try {
      const { urlPath } = req.params;
      const longUrl = await UrlController.urlService.redirect(urlPath);
      res.redirect(longUrl);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async getQRCode(req: Request, res: Response) {
    try {
      const { urlPath } = req.params;
      const shortUrl = `http://zap.link/${urlPath}`;
      const longUrl = await UrlController.urlService.decode(shortUrl); // Validate URL exists
      const qrCode = await generateQRCode(shortUrl);
      res.json({ qrCode });
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}