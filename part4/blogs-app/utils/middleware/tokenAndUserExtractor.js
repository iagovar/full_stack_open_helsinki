const jwt = require("jsonwebtoken");

function tokenAndUserExtractor(request, response, next) {
    // Extract token from header
    try {
        const authorization = request.get("authorization");
        if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
            request.token =  String(authorization).replace("Bearer ", "");
        } else {
            request.token = undefined;
        }
    
        // Extract user
        if (request.token) {
            request.user = jwt.verify(request.token, process.env.SECRET).id;
        }

        next();
    } catch (error) {
        response.status(401).json({ error: "invalid token" });
    }
}

module.exports = tokenAndUserExtractor;