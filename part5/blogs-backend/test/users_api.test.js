const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const UserModel = require("../models/userModel");
const api = supertest(app);

const initialUsers = require("./userList").users;

beforeEach(async () => {
    await UserModel.deleteMany({});
    let userObjects = initialUsers.map(user => new UserModel(user));
    let promiseArray = userObjects.map(user => user.save());
    await Promise.all(promiseArray);
});

describe("Testing adding and retrieving users", () => {
    test("Can't add a user with password < 3 chars", async () => {
        const newUser = {
            username: "Iagovar",
            name: "Iago Var",
            password: "12"
        };
        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });

    test("Can't add a duplicated user", async () => {
        const newUser = initialUsers[0];
        newUser.password = "1234";
        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });

});

afterAll(() => {
    mongoose.connection.close();
});