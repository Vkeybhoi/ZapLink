import QRCode from 'qrcode';

export const generateQRCode = async (url: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(url);
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
};