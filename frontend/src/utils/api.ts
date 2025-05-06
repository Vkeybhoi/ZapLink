import axios from "axios";
import type { UrlRecord } from "../types"; 

const API_BASE_URL = "http://localhost:3001";

export const encodeUrl = async (longUrl: string): Promise<string> => {
  const response = await axios.post(`${API_BASE_URL}/api/encode`, { longUrl });
  return response.data.shortUrl;
};

export const fetchUrls = async (): Promise<UrlRecord[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/list`);
  return response.data;
};

export const fetchQRCode = async (urlPath: string): Promise<string> => {
  const response = await axios.get(`${API_BASE_URL}/api/qr/${urlPath}`);
  return response.data.qrCode;
};
