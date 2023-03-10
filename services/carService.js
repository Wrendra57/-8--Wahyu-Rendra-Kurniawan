/* eslint-disable no-undef */
const carRepository = require("../repositories/carsRepository");
const cloudinary = require("../config/cloudinary");

class carService {
  static async create({ name, tipemobil, price, image, createdBy }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Nama Product wajib di isi!",
          data: null,
        };
      }

      if (!price) {
        return {
          status: false,
          status_code: 400,
          message: "Harga Product wajib di isi!",
          data: null,
        };
      }

      if (!tipemobil) {
        return {
          status: false,
          status_code: 400,
          message: "Tipe mobil wajib di isi!",
          data: null,
        };
      }
      if (!image) {
        return {
          status: false,
          status_code: 400,
          message: "image mobil wajib di isi!",
          data: null,
        };
      }
      if (!createdBy) {
        return {
          status: false,
          status_code: 400,
          message: "Silahkan login kembali!",
          data: null,
        };
      }

      // Upload file to cloudinary
      const fileToUpload = image;

      const fileBase64 = fileToUpload.buffer.toString("base64");
      const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;

      const uploadImage = await cloudinary.uploader.upload(
        file,
        (err, result) => {
          if (err) {
            res
              .status(400)
              .send(`Gagal mengupload file ke cloudinary: ${err.message}`);
            return;
          }

          return result;
        }
      );

      const createCar = await carRepository.create({
        name,
        tipemobil,
        price,
        image: uploadImage.url,
        createdBy,
      });

      return {
        status: true,
        status_code: 201,
        message: "Product Created ",
        data: createCar,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async getAll() {
    try {
      const getAllCar = await carRepository.getAll();
      return {
        status: true,
        status_code: 200,
        message: "Find all cars success",
        data: getAllCar,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async getById({ id }) {
    try {
      const getDetailProduct = await carRepository.getByID({ id });
      // console.log(getDetailProduct);
      if (!getDetailProduct) {
        return {
          status: false,
          status_code: 400,
          message: "Cars tidak ditemukan!",
          data: null,
        };
      }
      return {
        status: true,
        status_code: 200,
        message: "Get product by ID success",
        data: getDetailProduct,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async update({ name, price, tipemobil, image, id, updatedBy }) {
    try {
      const getCar = await carRepository.getByID({ id });

      if (!getCar) {
        return {
          status: false,
          status_code: 400,
          message: "Cars tidak ditemukan!",
          data: null,
        };
      }
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Nama Product wajib di isi!",
          data: null,
        };
      }

      if (!price) {
        return {
          status: false,
          status_code: 400,
          message: "Harga Product wajib di isi!",
          data: null,
        };
      }

      if (!tipemobil) {
        return {
          status: false,
          status_code: 400,
          message: "Tipe mobil wajib di isi!",
          data: null,
        };
      }
      if (!image) {
        return {
          status: false,
          status_code: 400,
          message: "image mobil wajib di isi!",
          data: null,
        };
      }

      // Upload file to cloudinary
      const fileToUpload = image;

      const fileBase64 = fileToUpload.buffer.toString("base64");
      const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;

      const uploadImage = await cloudinary.uploader.upload(
        file,
        (err, result) => {
          if (err) {
            res
              .status(400)
              .send(`Gagal mengupload file ke cloudinary: ${err.message}`);
            return;
          }

          return result;
        }
      );

      const updateCar = await carRepository.updateByID({
        name,
        tipemobil,
        price,
        image: uploadImage.url,
        updatedBy,
        id,
      });
      return {
        status: true,
        status_code: 200,
        message: "Update car success",
        data: updateCar,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async deleteById({ id, userId }) {
    try {
      const getCar = await carRepository.getByID({ id });
      if (!getCar) {
        return {
          status: false,
          status_code: 400,
          message: "Cars tidak ditemukan!",
          data: null,
        };
      }
      const deleteCar = await carRepository.deleteById({ id, userId });
      return {
        status: true,
        status_code: 200,
        message: "Delete product success",
        data: deleteCar,
      };
    } catch {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }
}

module.exports = carService;
