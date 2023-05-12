const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid')
const { generateTokens } = require('../../utils/jwt');
const { addRefreshTokenToWhitelist, revokeTokens, findRefreshTokenById, deleteRefreshToken } = require('./auth.services');
const { getUserByEmail, createUser, getUserById } = require('../user/user.services');
const { hashToken } = require('../../utils/hashToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {isAuthenticated, validateCsrfToken, csrfMiddleware} = require("../../middleware");

/*
Route to register user
 */
router.post('/register', csrfMiddleware, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({msg: "You must provide an email and a password."});
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      res.status(400).json({msg: "Email already in use."});
    }

    const user = await createUser(req.body);
    const jti = uuidv4();
    // Tokens
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.userId });

    res.cookie('access_token', {accessToken, refreshToken}, {httpOnly: true, secure: true});
  } catch (err) {
    next(err);
  }
});

/*
Route to login user
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({msg: "You must provide an email and password."});
    }

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      res.status(404).json({msg: "Invalid login credentials."});
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403).json({msg: "Invalid login credentials."});
    }

    const jti = uuidv4();
    const {accessToken, refreshToken} = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({jti, refreshToken, userId: existingUser.userId});

    res.cookie('access_token', {accessToken, refreshToken}, {httpOnly: true, secure: true});
  } catch (err) {
    next(err);
  }
});

router.post('/logout', isAuthenticated, async (res, req, next) => {
  try {

  } catch (err) {
    next(err);
  }
});

/*
Refresh token
 */
router.post('/refreshToken', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({msg: "Missing refresh token."});
    }
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401).json({msg: "Unauthorized"});
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401).json({msg: "Unauthorized"});
    }

    const user = await getUserById(payload.userId);
    if (!user) {
      res.status(401).json({msg: "Unauthorized"});
    }

    await deleteRefreshToken(payload.jti);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

    res.cookie('access_token', {accessToken, newRefreshToken}, {httpOnly: true, secure: true});

  } catch (err) {
    next(err);
  }
});

router.post('/revokeRefreshTokens', async (req, res, next) => {
  try {
    const { userId } = req.body;
    await revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;