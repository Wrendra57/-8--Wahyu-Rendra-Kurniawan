const carRepository = require("../carsRepository");

describe("create car", () => {
  it("should create user to db", async () => {
    const carToCreate = {
      name: "testavansa",
      tipemobil: "large",
      price: 2000,
      image: "test.com",
      createdBy: 2,
    };

    const createdCar = await carRepository.create(carToCreate);

    // console.log("createdCar");
    // console.log(createdCar);
    // Assertation
    expect(createdCar).not.toEqual(null);
    expect(createdCar.name).toEqual(carToCreate.name);
    expect(createdCar.tipemobil).toEqual(carToCreate.tipemobil);
    expect(createdCar.price).toEqual(carToCreate.price);
    expect(createdCar.image).toEqual(carToCreate.image);
    expect(createdCar.createdBy).toEqual(carToCreate.createdBy);

    carRepository.destroy({ id: createdCar.id });
  });
});

describe("getAll", () => {
  it("should create user to db", async () => {
    const carToCreate = {
      name: "testavansa",
      tipemobil: "large",
      price: 2000,
      image: "test.com",
      createdBy: 2,
    };

    const createdCar = await carRepository.create(carToCreate);

    const getAllCars = await carRepository.getAll();
    // console.log(createdCar);
    // Assertation
    expect(getAllCars).not.toEqual(null);

    carRepository.destroy({ id: createdCar.id });
  });
});
describe("getByID", () => {
  it("should create user to db", async () => {
    const carToCreate = {
      name: "testavansa",
      tipemobil: "large",
      price: 2000,
      image: "test.com",
      createdBy: 2,
    };

    const createdCar = await carRepository.create(carToCreate);

    const getCarsById = await carRepository.getByID({ id: createdCar.id });
    // console.log(getCarsById);
    // Assertation
    expect(getCarsById).not.toEqual(null);
    expect(getCarsById.name).toEqual(carToCreate.name);
    expect(getCarsById.tipemobil).toEqual(carToCreate.tipemobil);
    expect(getCarsById.price).toEqual(carToCreate.price);
    expect(getCarsById.image).toEqual(carToCreate.image);
    expect(getCarsById.createdBy).toEqual(carToCreate.createdBy);

    carRepository.destroy({ id: createdCar.id });
  });
});
describe("deleteById", () => {
  it("should create user to db", async () => {
    const carToCreate = {
      name: "testavansa",
      tipemobil: "large",
      price: 2000,
      image: "test.com",
      createdBy: 2,
    };

    const createdCar = await carRepository.create(carToCreate);

    const deleteCarsById = await carRepository.deleteById({
      id: createdCar.id,
      userId: 2,
    });
    // console.log(deleteCarsById);
    // Assertation
    expect(deleteCarsById).not.toEqual(null);

    carRepository.destroy({ id: createdCar.id });
  });
});
describe("updateByID", () => {
  it("should create user to db", async () => {
    const carToCreate = {
      name: "testavansa",
      tipemobil: "large",
      price: 2000,
      image: "test.com",
      createdBy: 2,
    };

    const createdCar = await carRepository.create(carToCreate);

    const carToUpdate = {
      name: "utestavansa",
      tipemobil: "ularge",
      price: 2000,
      image: "utest.com",
      id: createdCar.id,
      updatedBy: 2,
    };

    const updateCar = await carRepository.updateByID(carToUpdate);
    // console.log(updateCar);
    // Assertation
    expect(updateCar).not.toEqual(null);

    carRepository.destroy({ id: createdCar.id });
  });
});

describe("delete car", () => {
  it("should create user to db", async () => {
    const carToCreate = {
      name: "testavansa",
      tipemobil: "large",
      price: 2000,
      image: "test.com",
      createdBy: 2,
    };

    const createdCar = await carRepository.create(carToCreate);

    const deleteCar = await carRepository.destroy({id:createdCar.id})

    // console.log("deleteCar");
    console.log(deleteCar);
    // Assertation
    expect(deleteCar).not.toEqual(null);

    carRepository.destroy({ id: createdCar.id });
  });
});