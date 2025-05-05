"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const urlRoutes_1 = __importDefault(require("./routes/urlRoutes"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// Mount URL routes
exports.app.use('/', urlRoutes_1.default);
exports.app.get('/', (_req, res) => {
    res.json({ message: 'ZapLink API is running' });
});
//# sourceMappingURL=index.js.map