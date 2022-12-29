const AuthService = require("../authService");

describe("register", () => {
  it("should create post to db", async () => {
    // Create payload
    const postToCreate = {
      name: "test 2",
      email: "testing@gmail.com",
      password: "1234",
      role: "member",
    };

    // Expected Response
    const expectedCreatedUser = {
      id: 999,
      name: "test 2",
      email: "testing@gmail.com",
      password: "1234",
      role: "member",
    };

    const expectedCreatedUserService = {
      status: true,
      status_code: 201,
      message: "Berhasil mendaftarkan user",
      data: {
        registered_user: expectedCreatedUser,
      },
    };

    // Create service mock function
    const mockAuthService = AuthService;

    mockAuthService.register = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCreatedUserService));

    const createdRegisterResponse = await mockAuthService.register(
      postToCreate
    );

    // Assertion
    expect(expectedCreatedUserService.status).toEqual(
      createdRegisterResponse.status
    );
    expect(expectedCreatedUserService.status_code).toEqual(
      createdRegisterResponse.status_code
    );
    expect(expectedCreatedUserService.message).toEqual(
      createdRegisterResponse.message
    );
    expect(expectedCreatedUserService.data.registered_user).toEqual(
      createdRegisterResponse.data.registered_user
    );
  });
});
describe("Login", () => {
  it("should create post to db", async () => {
    // Create payload
    const userToLogin = {
      email: "testing@gmail.com",
      password: "1234",
    };

    // Expected Response
    const expectedCreatedUser = {
      token: "adsweqdqw",
    };

    const expectedCreatedUserService = {
      status: true,
      status_code: 200,
      message: "User berhasil login",
      data: {
        token: expectedCreatedUser,
      },
    };

    // Create service mock function
    const mockAuthService = AuthService;

    mockAuthService.login = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCreatedUserService));

    const createdLoginResponse = await mockAuthService.login(userToLogin);

    // Assertion
    expect(expectedCreatedUserService.data.token).not.toEqual(null);
  });
});

describe("register admin", () => {
  it("should create post to db", async () => {
    // Create payload
    const postToCreate = {
      name: "test 2",
      email: "testing@gmail.com",
      password: "1234",
    };

    // Expected Response
    const expectedCreatedUser = {
      id: 999,
      name: "test 2",
      email: "testing@gmail.com",
      password: "1234",
      role: "admin",
    };

    const expectedCreatedUserService = {
      status: true,
      status_code: 201,
      message: "Berhasil mendaftarkan user",
      data: {
        registered_user: expectedCreatedUser,
      },
    };

    // Create service mock function
    const mockAuthService = AuthService;

    mockAuthService.registeradmin = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCreatedUserService));

    const createdRegisterAdminResponse = await mockAuthService.registeradmin(
      postToCreate
    );

    // Assertion
    expect(expectedCreatedUserService.status).toEqual(
      createdRegisterAdminResponse.status
    );
    expect(expectedCreatedUserService.status_code).toEqual(
      createdRegisterAdminResponse.status_code
    );
    expect(expectedCreatedUserService.message).toEqual(
      createdRegisterAdminResponse.message
    );
    expect(expectedCreatedUserService.data.registered_user).toEqual(
      createdRegisterAdminResponse.data.registered_user
    );
  });
});
