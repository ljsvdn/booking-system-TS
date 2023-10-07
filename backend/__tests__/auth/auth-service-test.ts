import AuthService from "../../src/features/auth/services/auth-service";

describe("AuthService", () => {
  const authService = new AuthService();

  it("should generate a valid JWT token", () => {
    const payload = { userId: 1, role: "user" };
    const token = authService.generateToken(payload);

    // Verify that the token is a string and not empty
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });

  it("should verify a valid JWT token", () => {
    const payload = { userId: 1, role: "user" };
    const token = authService.generateToken(payload);

    // Verify that the token can be successfully verified
    const decoded = authService.verifyToken(token);
    expect(decoded).toEqual(payload);
  });

  it("should hash a password", async () => {
    const password = "password123";
    const hashedPassword = await authService.hashPassword(password);

    // Verify that the hashed password is not empty
    expect(hashedPassword.length).toBeGreaterThan(0);
  });

  it("should verify a password against a hash", async () => {
    const password = "password123";
    const hashedPassword = await authService.hashPassword(password);

    // Verify that the password matches the hashed password
    const isMatch = await authService.verifyPassword(password, hashedPassword);
    expect(isMatch).toBe(true);
  });
});
