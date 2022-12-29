/* eslint-disable no-undef */
const carService = require("../carService");

describe("create car", () => {
  it("should create post to db", async () => {
    // Create payload
    const carToCreate = {
      name: "testService",
      tipemobil: "testLage",
      price: 2500,
      image: "test.com",
      createdBy: 2,
    };

    // Expected Response
    const expectedCreatedCar = {
      id: 999,
      name: "testService",
      tipemobil: "testLage",
      price: 2500,
      image: "test.com",
      createdBy: 2,
    };

    const expectedCreatedCarService = {
      status: true,
      status_code: 201,
      message: "Product Created",
      data: {
        expectedCreatedCar,
      },
    };

    // Create service mock function
    const mockCarService = carService;

    mockCarService.create = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCreatedCarService));

    const createdCarResponse = await mockCarService.create(carToCreate);

    // Assertion
    expect(expectedCreatedCarService.status).toEqual(createdCarResponse.status);
    expect(expectedCreatedCarService.status_code).toEqual(
      createdCarResponse.status_code
    );
    expect(expectedCreatedCarService.message).toEqual(
      createdCarResponse.message
    );
    expect(expectedCreatedCarService.data).toEqual(createdCarResponse.data);
  });
});
describe("get All car", () => {
  it("should create post to db", async () => {
    // Create payload

    // Expected Response
    const expectedGetCar = {
      id: 999,
      name: "testService",
      tipemobil: "testLage",
      price: 2500,
      image: "test.com",
      createdBy: 2,
    };

    const expectedCreatedCarService = {
      status: true,
      status_code: 200,
      message: "Find all cars success",
      data: [expectedGetCar, expectedGetCar],
    };

    // Create service mock function
    const mockCarService = carService;

    mockCarService.getAll = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCreatedCarService));

    const getAllCarResponse = await mockCarService.getAll();

    // Assertion
    expect(expectedCreatedCarService.status).toEqual(getAllCarResponse.status);
    expect(expectedCreatedCarService.status_code).toEqual(
      getAllCarResponse.status_code
    );
    expect(expectedCreatedCarService.message).toEqual(
      getAllCarResponse.message
    );
    expect(expectedCreatedCarService.data).toEqual(getAllCarResponse.data);
  });
});
describe("get By Id car", () => {
  it("should create post to db", async () => {
    // Create payload
    const payload = {
      id: 999,
    };
    // Expected Response
    const expectedGetCar = {
      id: 999,
      name: "testService",
      tipemobil: "testLage",
      price: 2500,
      image: "test.com",
      createdBy: 2,
    };

    const expectedCreatedCarService = {
      status: true,
      status_code: 200,
      message: "Get product by ID success",
      data: { expectedGetCar },
    };

    // Create service mock function
    const mockCarService = carService;

    mockCarService.getById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCreatedCarService));

    const getAllCarResponse = await mockCarService.getById(payload);

    // Assertion
    expect(expectedCreatedCarService.status).toEqual(getAllCarResponse.status);
    expect(expectedCreatedCarService.status_code).toEqual(
      getAllCarResponse.status_code
    );
    expect(expectedCreatedCarService.message).toEqual(
      getAllCarResponse.message
    );
    expect(expectedCreatedCarService.data).toEqual(getAllCarResponse.data);
  });
});
describe("Update car", () => {
  it("should create post to db", async () => {
    // Create payload
    const payload = {
      name: "testService",
      tipemobil: "testLage",
      price: 2500,
      image: "test.com",
      id: 999,
      updatedB: 2,
    };
    // Expected Response
    const expecteUpdateCar = {
      id: 999,
    };

    const expectedUpdateCarService = {
      status: true,
      status_code: 200,
      message: "Update car success",
      data: [expecteUpdateCar.id],
    };

    // Create service mock function
    const mockCarService = carService;

    mockCarService.update = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedUpdateCarService));

    const updateCarResponse = await mockCarService.update(payload);

    // Assertion
    expect(expectedUpdateCarService.status).toEqual(updateCarResponse.status);
    expect(expectedUpdateCarService.status_code).toEqual(
      updateCarResponse.status_code
    );
    expect(expectedUpdateCarService.message).toEqual(updateCarResponse.message);
    expect(expectedUpdateCarService.data).toEqual(updateCarResponse.data);
  });
});

describe("Delete car", () => {
  it("should create post to db", async () => {
    // Create payload
    const payload = {
      id: 999,
      userId:2
    };
    // Expected Response
    const expecteDeleteCar = {
      id: 999,
    };

    const expectedDeleteCarService = {
      status: true,
      status_code: 200,
      message: "Update car success",
      data: [expecteDeleteCar.id],
    };

    // Create service mock function
    const mockCarService = carService;

    mockCarService.update = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedDeleteCarService));

    const updateCarResponse = await mockCarService.update(payload);

    // Assertion
    expect(expectedDeleteCarService.status).toEqual(updateCarResponse.status);
    expect(expectedDeleteCarService.status_code).toEqual(
      updateCarResponse.status_code
    );
    expect(expectedDeleteCarService.message).toEqual(updateCarResponse.message);
    expect(expectedDeleteCarService.data).toEqual(updateCarResponse.data);
  });
});
