"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRCode = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const generateQRCode = async (url) => {
    try {
        return await qrcode_1.default.toDataURL(url);
    }
    catch (error) {
        throw new Error('Failed to generate QR code');
    }
};
exports.generateQRCode = generateQRCode;
//# sourceMappingURL=qrCodeUtil.js.map