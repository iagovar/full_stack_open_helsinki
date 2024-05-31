/**
 * Checks if a token has expired based on the issued time and the number of hours it should last.
 *
 * @param {number} iat - The issued time of the token in seconds since the Unix epoch.
 * @param {number} hours - The number of hours the token should last.
 * @return {boolean} Returns true if the token has expired, false otherwise.
 */
function checkTokenExpiration(iat, hours) {
    const tokenIssued = new Date(Number(iat) * 1000);
    tokenIssued.setHours(tokenIssued.getHours() + hours);
    const isTokenExpired = tokenIssued < Date.now();
    return isTokenExpired;
}

module.exports = checkTokenExpiration;