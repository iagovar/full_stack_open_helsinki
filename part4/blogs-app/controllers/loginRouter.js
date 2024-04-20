const loginRouter = require("express").Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


loginRouter.post("/api/login", async (request, response) => {
    try {
        const { username, password } = request.body;
        const user = await UserModel.findOne({ username });

        if (user === null) {
            return response.status(401).json({ error: "invalid username or password" });
        }
    
        const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

        if (!passwordCorrect) {
            return response.status(401).json({ error: "invalid username or password" });
        }

        const dataForJsonToken = {
            username: user.username,
            id: user._id
        };

        const token = jwt.sign(dataForJsonToken, process.env.SECRET);

        response.status(200).json({ token, username: user.username, name: user.name });

    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = loginRouter;