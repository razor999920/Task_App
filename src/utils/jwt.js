const jwt = require('jsonwebtoken');
const JsonBig = require('json-bigint');
/*
    Generate token with 5 minutes expiration
*/
function generateAccessToken(user) {
    return jwt.sign({ userId: user.userId.toString() }, process.env.JWT_ACCESS_SECRET, { expiresIn: '5m' });
}

/*
    Keep the user logged in until inactivity
*/
function generateRefreshToken (user, jti) {
    return jwt.sign ({ userId: user.userId.toString(), jti }, process.env.JWT_REFRESH_SECRET, { expiresIn: '8h' });
}

/*
    Generate token for user
*/
function generateTokens(user, jti) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken
    };
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokens
};