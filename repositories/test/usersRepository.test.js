const UsersRepository = require("../usersRepository");

describe("create user", () => {
  it("should create user to db", async () => {
    const userToCreate = {
      name: "test",
      email: "test@gmail.com",
      password: "1234",
      role: "member",
    };

    const createdUser = await UsersRepository.create({
      name: "test",
      email: "test@gmail.com",
      password: "1234",
      role: "member",
    });
    // console.log("createdUser");
    // console.log(createdUser);
    // Assertation
    expect(createdUser.name).toEqual(userToCreate.name);
    expect(createdUser.email).toEqual(userToCreate.email);
    expect(createdUser.role).toEqual(userToCreate.role);

    UsersRepository.destroy({ id: createdUser.id });
  });
});

describe("get by email", () => {
  it("should create user to db", async () => {
    const userToCreate = {
      name: "test",
      email: "test@gmail.com",
      password: "1234",
      role: "member",
    };

    const createdUser = await UsersRepository.create({
      name: "test",
      email: "test@gmail.com",
      password: "1234",
      role: "member",
    });

    const getByEmail = await UsersRepository.getByEmail({
      email: userToCreate.email,
    });

    console.log(getByEmail);
    expect(getByEmail.name).toEqual(userToCreate.name);
    expect(getByEmail.email).toEqual(userToCreate.email);
    expect(getByEmail.role).toEqual(userToCreate.role);
    expect(getByEmail.password).toEqual(userToCreate.password);

    UsersRepository.destroy({ id: createdUser.id });
  });
});

describe("delete user", () => {
  it("should create user to db", async () => {
    const userToCreate = {
      name: "test",
      email: "test@gmail.com",
      password: "1234",
      role: "member",
    };

    const createdUser = await UsersRepository.create(userToCreate);

    const deletedUser = await UsersRepository.destroy({id: createdUser.id});

    // Assertation
    expect(deletedUser).not.toEqual(null);
    // expect(createdUser.email).toEqual(userToCreate.email);
    // expect(createdUser.role).toEqual(userToCreate.role);

    // UsersRepository.destroy({ id: createdUser.id });
  });
});
