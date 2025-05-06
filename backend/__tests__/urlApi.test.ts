import request from "supertest";
import { app } from "../src/index";  

describe("URL API Endpoints", () => {
  let shortUrl: string;

  test("POST /api/encode - should encode a long URL", async () => {
    const response = await request(app)
      .post("/api/encode")
      .send({ longUrl: "https://example.com" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("shortUrl");
    shortUrl = response.body.shortUrl; 
  });

  test("GET /api/decode - should decode a short URL", async () => {
    const response = await request(app).get("/api/decode").query({ shortUrl });

    expect(response.status).toBe(200);
    expect(response.body.longUrl).toBe("https://example.com");
  });

  test("POST /api/encode - should return an error for invalid URL", async () => {
    const response = await request(app)
      .post("/api/encode")
      .send({ longUrl: "invalid-url" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid URL");
  });

  test("GET /api/decode - should return an error for non-existent short URL", async () => {
    const response = await request(app)
      .get("/api/decode")
      .query({ shortUrl: "http://localhost:3001/nonexistent" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Short URL not found");
  });
});
