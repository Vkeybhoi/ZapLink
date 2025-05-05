"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const urlController_1 = require("../controllers/urlController");
const rateLimitMiddleware_1 = require("../middleware/rateLimitMiddleware");
const router = (0, express_1.Router)();
const controller = new urlController_1.UrlController();
router.post('/api/encode', rateLimitMiddleware_1.encodeRateLimiter, controller.encode);
router.get('/api/decode', controller.decode);
router.get('/api/statistic/:urlPath', controller.getStats);
router.get('/api/list', controller.list);
router.get('/:urlPath', controller.redirect);
router.get('/api/qr/:urlPath', controller.getQRCode);
exports.default = router;
//# sourceMappingURL=urlRoutes.js.map