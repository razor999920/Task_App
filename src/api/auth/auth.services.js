const { db } = require('../../utils/db');
const { hashToken } = require('../../utils/hashToken');

// Used when we create a refresh token.
function addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
  return db.refreshToken.create({
    data: {
      refreshTokenId: jti,
      hashedToken: hashToken(refreshToken),
      userId
    },
  });
}

// Used to check if the token sent by the client is in the database.
function findRefreshTokenById(id) {
  return db.refreshToken.findUnique({
    where: {
      refreshTokenId: id,
    },
  });
}

// Soft delete tokens after usage.
function deleteRefreshToken(id) {
  return db.refreshToken.update({
    where: {
      refreshTokenId: id,
    },
    data: {
      revoked: true
    }
  });
}

// Revoke user's current session token
function revokeToken(userId, refreshTokenId) {
  return db.refreshToken.updateMany({
    where: {
      userId,
      refreshTokenId
    },
    data: {
      revoked: true
    }
  });
}

// Revoke all user's token
function revokeTokens(userId) {
  return db.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}

module.exports = {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeToken,
  revokeTokens
};