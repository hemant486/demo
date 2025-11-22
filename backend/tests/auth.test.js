const request = require("supertest");
const express = require("express");
const authRoutes = require("../routes/auth");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Authentication Tests", () => {
  test("POST /api/auth/register - should register a new user", async () => {
    const newUser = {
      name: "Test User",
      email: `test${Date.now()}@example.com`,
      password: "password123",
      role: "patient",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("email", newUser.email);
  });

  test("POST /api/auth/login - should login with valid credentials", async () => {
    const credentials = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .send(credentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /api/auth/login - should fail with invalid credentials", async () => {
    const credentials = {
      email: "wrong@example.com",
      password: "wrongpassword",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .send(credentials);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
