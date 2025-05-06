import { Router } from 'express';
import { UrlController } from '../controllers/urlController';
import { encodeRateLimiter } from '../middleware/rateLimitMiddleware';

const router = Router();
const controller = new UrlController();

router.post('/api/encode', encodeRateLimiter, controller.encode);
router.get('/api/decode', controller.decode);
router.get('/api/statistic/:urlPath', controller.getStats);
router.get('/api/list', controller.list);
router.get('/:urlPath', async (req, res) => {
    console.log(`Received request for urlPath: ${req.params.urlPath}`); 
    await controller.redirect(req, res);
  });
router.get('/api/qr/:urlPath', controller.getQRCode);

export default router;