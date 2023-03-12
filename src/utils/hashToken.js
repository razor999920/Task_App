const crypto = require('crypto');

/*
    Hash the given token
*/
function hashToken(token) {
    crypto.createHash('sha512').update(token).digest('hex');
}

module.exports = { hashToken };