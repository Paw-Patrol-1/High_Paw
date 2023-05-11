require("dotenv").config(".env");
const request = require("supertest");
const { app } = require("./App");
require("./config/db.config");

describe("Endpoints", () => {
  let globalAccessToken;
  let globalRefreshToken;
  let testUserRegister = {
    email: "test@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
    name: "Bub",
    breed: "French Bulldog",
    age: "3",
    picture: "frenchbulldog.jpg",
    city: "Houston",
    address: "1234 Street, USA",
    latLong: [1232, 12],
  };

  let testUserLogin = {
    email: "test1@gmail.com",
    password: "12345678",
  };

  describe("POST /auth/register", () => {
    // Must be a unique user
    it("should register user", async () => {
      const response = await request(app)
        .post("/auth/register")
        .send(testUserRegister)
        .set("Accept", "application/json");

      const text = await JSON.parse(response.text);

      expect(response.status).toBe(200);
      expect(text.user.email).toBe(testUserRegister.email);
      expect(text.user.name).toBe(testUserRegister.name);
      expect(text.user.password).toBe(text.user.confirmPassword);
    });
  });

  // describe("POST /auth/login", () => {
  //   it("should login user", async () => {
  //     const response = await request(app)
  //       .post("/auth/login")
  //       .send(testUserLogin)
  //       .set("Accept", "application/json");

  //     const { accessToken, refreshToken, email, password, confirmPassword } =
  //       JSON.parse(response.text);
  //     globalAccessToken = accessToken;
  //     globalRefreshToken = refreshToken;

  //     expect(response.status).toBe(200);
  //     expect(email).toBe(testUserLogin.email);
  //   });
  // });
});
