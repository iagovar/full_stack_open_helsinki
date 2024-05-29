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

        // Check if token has expired (24 hours)
        if (request.token.iat) {
            const tokenIssued = new Date(Number(request.token.iat));
            tokenIssued.setHours(tokenIssued.getHours() + 24);
            const isTokenExpired = tokenIssued < Date.now();
            if (isTokenExpired) {
                throw new Error("token expired");
            }

        } else {
            throw new Error("invalid token");
        }

        next();
    } catch (error) {
        response.status(401).json({ error: "invalid token" });
    }
}

module.exports = tokenAndUserExtractor;