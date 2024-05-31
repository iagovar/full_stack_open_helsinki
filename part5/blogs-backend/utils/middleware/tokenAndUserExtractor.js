const jwt = require("jsonwebtoken");
const checkTokenExpiration = require("../checkTokenExpiration");

/**
 * Extracts the token from the request header and verifies it. If the token is valid, it extracts the user and token issued date.
 * It also checks if the token has expired (24 hours).
 *
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 * @return {void}
 */
function tokenAndUserExtractor(request, response, next) {
    // Extract token from header
    try {
        const authorization = request.get("authorization");
        if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
            request.token =  String(authorization).replace("Bearer ", "");
        } else {
            request.token = undefined;
        }
    
        // Extract user, issued
        // If token is required, just check !request.user in the corresponding routes
        if (request.token) {
            const verifiedToken = jwt.verify(request.token, process.env.SECRET);
            request.user = verifiedToken.id;
            request.tokenIssued = verifiedToken.iat;
        }

        // Check if token has expired (24 hours)
        if (request.token && request.tokenIssued) {
            const isTokenExpired = checkTokenExpiration(request.tokenIssued, 24);
            if (isTokenExpired) {
                request.tokenExpired = true;
                return response.status(401).json({ error: "token expired" });
            } else {
                request.tokenExpired = false;
            }
        }

        next();
    } catch (error) {
        response.status(401).json(error);
    }
}

module.exports = tokenAndUserExtractor;