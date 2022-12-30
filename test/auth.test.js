/* eslint-disable no-undef */
const request = require("supertest");
// const app = require("../index");
// const server = require("../index");
const { app, server } = require("../index");
const bcrypt = require("bcrypt");
const UsersRepository = require("../repositories/usersRepository");
const AuthService = require("../services/authService");

beforeEach(async () => {
  console.log("auth");
  await server.close();
});

describe("POST /auth/login", () => {
  it("should response with 200 as status code", async () => {
    const rawPassword = "1234";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const payloadCreateUser = {
      name: "usertest88",
      email: "usertest88@gmail.com",
      password: hashedPassword,
      role: "member",
    };

    const createdUser = await UsersRepository.create(payloadCreateUser);

    const payloadLogin = {
      email: payloadCreateUser.email,
      password: rawPassword,
    };

    return request(app)
      .post("/auth/login")
      .send(payloadLogin)
      .set("Content-Type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res._body.data.token).not.toEqual(null);

        UsersRepository.destroy({ id: createdUser.id });
        server.close();
      });
  },60_000);
});

describe("POST /auth/register", () => {
  it("should response with 201 as status code", async () => {
    // const filePath = path.join(__dirname, "../storages/.storage");

    const payload = {
      name: "User 5",
      email: "user5@gmail.com",
      password: "User12345",
    };

    return request(app)
      .post("/auth/register")
      .send(payload)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res._body.data.registered_user).not.toEqual(null);

        // Delete Test Data
        // console.log(res._body.data.registered_user.id);
        UsersRepository.destroy({ id: res._body.data.registered_user.id });
      });
  },);
});

describe("POST /auth/me", () => {
  it("should response with 200 as status code", async () => {
    const rawPassword = "1234";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const payloadCreateUser = {
      name: "usertest8",
      email: "usertest8@gmail.com",
      password: hashedPassword,
      role: "member",
    };

    const createdUser = await UsersRepository.create(payloadCreateUser);

    const payloadLogin = {
      email: payloadCreateUser.email,
      password: rawPassword,
    };

    const doLogin = await AuthService.login(payloadLogin);

    return request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${doLogin.data.token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);

        UsersRepository.destroy({ id: createdUser.id });
      });
  },60_000);
});

describe("POST /auth/registeradmin", () => {
  it("should response with 201 as status code", async () => {
    // const filePath = path.join(__dirname, "../storages/.storage");
    const rawPassword = "1234";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const payload = {
      name: "User 6",
      email: "user6@gmail.com",
      password: "User12345",
    };

    const payloadSuperAdmin = {
      name: "superadmintest",
      email: "superadmin3test@gmail.com",
      password: hashedPassword,
      role: "superadmin",
    };
    const createSuperAdmin = await UsersRepository.create(payloadSuperAdmin);

    const doLogin = await AuthService.login({
      email: payloadSuperAdmin.email,
      password: rawPassword,
    });

    return request(app)
      .post("/auth/registeradmin")
      .set("Authorization", `Bearer ${doLogin.data.token}`)
      .send(payload)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res._body.data.registered_user).not.toEqual(null);

        // Delete Test Data
        // console.log(res._body.data.registered_user.id);
        UsersRepository.destroy({ id: res._body.data.registered_user.id });
        UsersRepository.destroy({ id: createSuperAdmin.id });
      });
  },60_000);
});
