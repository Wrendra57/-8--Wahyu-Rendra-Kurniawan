/* eslint-disable no-undef */
const request = require("supertest");
// const app = require("../index");
// const server = require("../index");
const { app, server } = require("../index");
const path = require("path");
const bcrypt = require("bcrypt");
const UsersRepository = require("../repositories/usersRepository");
const carRepository = require("../repositories/carsRepository");

const AuthService = require("../services/authService");

beforeEach(async () => {
  console.log("cars");
  await server.close();
});

describe("POST /cars", () => {
  it("should response with 201 as status code", async () => {
    const filePath = path.join(
      __dirname,
      "../storages/image-1672065507239.png"
    );

    const payload = {
      name: "User 2",
      tipemobil: "medium",
      price: 2500,
      picture: filePath,
    };

    const rawPassword = "1234";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const payloadSuperAdmin = {
      name: "superadmintest",
      email: "superadmin51test@gmail.com",
      password: hashedPassword,
      role: "superadmin",
    };
    const createSuperAdmin = await UsersRepository.create(payloadSuperAdmin);

    const doLogin = await AuthService.login({
      email: payloadSuperAdmin.email,
      password: rawPassword,
    });
    // console.log(doLogin)
    return request(app)
      .post("/cars")
      .set("Authorization", `Bearer ${doLogin.data.token}`)
      .field("name", payload.name)
      .field("tipemobil", payload.tipemobil)
      .field("price", payload.price)
      .attach("picture", payload.picture)
      .then((res) => {
        // console.log(res)
        expect(res.statusCode).toBe(201);
        expect(res._body.data).not.toEqual(null);

        // Delete Test Data
        carRepository.destroy({ id: res._body.data.id });
        UsersRepository.destroy({ id: createSuperAdmin.id });
        server.close();
      });
  });
});

describe("GET /cars", () => {
  it("should response with 201 as status code", async () => {
    // console.log(doLogin)
    return request(app)
      .get("/cars")
      .then((res) => {
        // console.log(res)
        expect(res.statusCode).toBe(200);
        expect(res._body.data).not.toEqual(null);
      });
  });
});

describe("GET /cars/id", () => {
  it("should response with 201 as status code", async () => {
    const payload = {
      name: "testavansa",
      tipemobil: "testlarge",
      price: 2000,
      image: "test.com",
      createdBy: 2,
    };

    const createCar = await carRepository.create(payload);
    console.log(createCar.id);
    console.log("itu");
    // console.log(doLogin)
    return request(app)
      .get(`/cars/${createCar.id}`)
      .then((res) => {
        // console.log(res)
        expect(res.statusCode).toBe(200);
        expect(res._body.data).not.toEqual(null);
        expect(res._body.data.id).toEqual(createCar.id);
        expect(res._body.data.name).toEqual(payload.name);
        expect(res._body.data.tipemobil).toEqual(payload.tipemobil);
        expect(res._body.data.price).toEqual(payload.price);
        expect(res._body.data.image).toEqual(payload.image);
        expect(res._body.data.createdBy).toEqual(payload.createdBy);

        carRepository.destroy({ id: res._body.data.id });
      });
  });
});

describe("PUT /cars/id", () => {
  it("should response with 201 as status code", async () => {
    const filePath = path.join(
      __dirname,
      "../storages/image-1672065507239.png"
    );

    const payload = {
      name: "testavansa",
      tipemobil: "testlarge",
      price: 2000,
      image: "test.com",
      createdBy: 2,
    };

    const createCar = await carRepository.create(payload);

    const rawPassword = "1234";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const payloadSuperAdmin = {
      name: "superadmintest",
      email: "superadmin5test@gmail.com",
      password: hashedPassword,
      role: "superadmin",
    };
    const createSuperAdmin = await UsersRepository.create(payloadSuperAdmin);

    const doLogin = await AuthService.login({
      email: payloadSuperAdmin.email,
      password: rawPassword,
    });

    const payloadUpdate = {
      name: "testavansaupdate",
      tipemobil: "testlarge2",
      price: 2000,
      picture: filePath,
    };
    // console.log(doLogin)
    return request(app)
      .put(`/cars/${createCar.id}`)
      .set("Authorization", `Bearer ${doLogin.data.token}`)
      .field("name", payloadUpdate.name)
      .field("tipemobil", payloadUpdate.tipemobil)
      .field("price", payloadUpdate.price)
      .attach("picture", payloadUpdate.picture)
      .then((res) => {
        // console.log(res)
        expect(res.statusCode).toBe(200);
        expect(res._body.data).not.toEqual(null);

        carRepository.destroy({ id: createCar.id });
        UsersRepository.destroy({ id: createSuperAdmin.id });
      });
  });
});

describe("DELETE /cars/id", () => {
  it("should response with 201 as status code", async () => {
    const payload = {
      name: "testavansa",
      tipemobil: "testlarge",
      price: 2000,
      image: "test.com",
      createdBy: 2,
    };

    const createCar = await carRepository.create(payload);

    const rawPassword = "1234";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const payloadSuperAdmin = {
      name: "superadmintest",
      email: "superadmin5test@gmail.com",
      password: hashedPassword,
      role: "superadmin",
    };
    const createSuperAdmin = await UsersRepository.create(payloadSuperAdmin);

    const doLogin = await AuthService.login({
      email: payloadSuperAdmin.email,
      password: rawPassword,
    });

    // console.log(doLogin)
    return request(app)
      .delete(`/cars/${createCar.id}`)
      .set("Authorization", `Bearer ${doLogin.data.token}`)
      .then((res) => {
        // console.log(res)
        expect(res.statusCode).toBe(200);
        expect(res._body.data).not.toEqual(null);
        carRepository.destroy({ id: createCar.id });
        UsersRepository.destroy({ id: createSuperAdmin.id });
      });
  });
});
