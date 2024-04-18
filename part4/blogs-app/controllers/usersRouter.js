const usersRouter = require("express").Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

usersRouter.get("/api/users/", async (request, response) => {
    try {
        // Returns ussers with blogs. This is no join, logic is embedded in models and routers.
        const users = await UserModel.find({}).populate("blogs", { title: 1, author: 1, url: 1, likes: 1 });
        response.status(200).json(users);        
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

usersRouter.get("/api/users/:id", async (request, response) => {
    try {
        const users = await UserModel.findById(request.params.id).populate("blogs");
        response.status(200).json(users);        
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

usersRouter.post("/api/users", async (request, response) => {
    try {
        // Load user info
        const thisUser = {
            username: request.body.username,
            name: request.body.name,
            password: request.body.password
        };

        // Check if password is at least 3 chars.
        if (thisUser.password.length < 3) {
            throw new Error("Password must be at least 3 characters long");
        }

        // Check if user already exists > Done with Mongoose in the model with mongoose-unique-validator

        const saltRounds = 10; // More salt rounds > More difficult to break precomputing with raimbow tables
        const passwordHash = await bcrypt.hash(thisUser.password, saltRounds);

        const userToSave = new UserModel({
            username: thisUser.username,
            name: thisUser.name,
            passwordHash: passwordHash
        });

        const savedUser = await userToSave.save();

        response.status(201).json(savedUser);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = usersRouter;