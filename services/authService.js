/* eslint-disable no-undef */
const UsersRepository = require("../repositories/usersRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT } = require("../lib/const");
const SALT_ROUND = 10;
const { OAuth2Client } = require("google-auth-library");
class AuthService {
  static async register({ name, email, password, role }) {
    try {
      // Payload Validation
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Nama wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Email wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }
      const getUserByEmail = await UsersRepository.getByEmail({ email });
      // console.log(getUserByEmail);
      if (getUserByEmail) {
        // console.log("1");
        return {
          status: false,
          status_code: 400,
          message: "Email sudah digunakan",
          data: {
            registered_user: null,
          },
        };
      } else {
        // console.log("2");
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
        const createdUser = await UsersRepository.create({
          name,
          email,
          password: hashedPassword,
          role,
        });

        return {
          status: true,
          status_code: 201,
          message: "Berhasil mendaftarkan user",
          data: {
            registered_user: createdUser,
          },
        };
      }
    } catch (err) {
      // console.log("3");
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async login({ email, password }) {
    try {
      // Payload Validation
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Email wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      const getUser = await UsersRepository.getByEmail({ email });
      // console.log(getUser);
      if (!getUser) {
        // console.log("123");
        return {
          status: false,
          status_code: 404,
          message: "Email belum terdaftar",
          data: {
            user: null,
          },
        };
      }
      if (!getUser.password) {
        return {
          status: false,
          status_code: 400,
          message: "Akun ini belum melakukan setup password.",
          data: {
            user: null,
          },
        };
      }

      const isPasswordMatch = await bcrypt.compare(password, getUser.password);

      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            id: getUser.id,
            email: getUser.email,
          },
          JWT.SECRET,
          {
            expiresIn: JWT.EXPIRED,
          }
        );

        return {
          status: true,
          status_code: 200,
          message: "User berhasil login",
          data: {
            token,
          },
        };
      } else {
        return {
          status: false,
          status_code: 400,
          message: "Password salah",
          data: {
            user: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async registeradmin({ name, email, password }) {
    try {
      // Payload Validation
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Nama wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Email wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }

      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }
      const getUserByEmail = await UsersRepository.getByEmail({ email });
      if (getUserByEmail) {
        // console.log("1");
        return {
          status: false,
          status_code: 400,
          message: "Email sudah digunakan",
          data: {
            registered_user: null,
          },
        };
      } else {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
        const createdUser = await UsersRepository.create({
          name,
          email,
          password: hashedPassword,
          role: "admin",
        });

        return {
          status: true,
          status_code: 201,
          message: "Berhasil mendaftarkan user",
          data: {
            registered_user: createdUser,
          },
        };
      }
    } catch (err) {
      // console.log("3");
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async loginGoogle({ google_credential: googleCredential }) {
    try {
      // Get google user credential
      // eslint-disable-next-line no-undef
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const userInfo = await client.verifyIdToken({
        idToken: googleCredential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email, name } = userInfo.payload;

      const getUserByEmail = await UsersRepository.getByEmail({ email });

      if (!getUserByEmail) {
        await UsersRepository.create({
          name,
          email,
          role: "member",
        });
      }

      const token = jwt.sign(
        {
          id: getUserByEmail.id,
          email: getUserByEmail.email,
        },
        JWT.SECRET,
        {
          expiresIn: JWT.EXPIRED,
        }
      );

      return {
        status: true,
        status_code: 200,
        message: "User berhasil login",
        data: {
          token,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }
}
module.exports = AuthService;
