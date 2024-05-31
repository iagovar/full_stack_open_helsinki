const loginRouter = require("express").Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkTokenExpiration = require("../utils/checkTokenExpiration");


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

loginRouter.post("/api/validatetoken", async (request, response) => {
    try {
        // Ectract token from header
        const authorization = request.get("authorization");
        if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
            request.token =  String(authorization).replace("Bearer ", "");
        } else {
            return response.status(401).json({ error: "invalid token" });
        }

        // Extract issued
        const verifiedToken = jwt.verify(request.token, process.env.SECRET);

        // Check if token has expired
        const isTokenExpired = checkTokenExpiration(verifiedToken.iat, 24);
        if (isTokenExpired) {
            response.status(401).json({ error: "token expired" });
        } else {
            response.status(200).json({ message: "valid token" });
        }

    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = loginRouter;