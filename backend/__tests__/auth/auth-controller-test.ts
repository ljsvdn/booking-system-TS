import express from "express";
import request from "supertest";
import AuthController from "../../src/features/auth/controllers/auth-controller";

jest.mock("../../src/features/auth/services/auth-service");
jest.mock("../../src/features/user/services/user-service");

const app = express();
app.use(express.json()).use("/auth", AuthController);

describe("AuthController", () => {
  it("should authenticate a user with valid credentials", async () => {
    const validUserCredentials = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(validUserCredentials);

    // verify that the response status code is 200 and contains a token
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should return 401 for invalid credentials", async () => {
    const invalidUserCredentials = {
      email: "invalid@example.com",
      password: "invalidpassword",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(invalidUserCredentials);

    // verify that the response status code is 401 and contains an error message
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Invalid credentials" });
  });
});
