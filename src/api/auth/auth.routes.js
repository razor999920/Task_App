const express = require('express');
const { v4: uuidv4 } = require('uuid')
const { generateTokens } = require('../../utils/jwt');
const { addRefreshTokenToWhitelist } = require('./auth.services');
const { getUserByEmail, createUser } = require('../user/user.services');
const bcrypt = require('bcryptjs');

const router = new express.Router();

/*
Route to register user
 */
router.post('/register', async (req, res, next) => {
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

    res.json({ accessToken, refreshToken });
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

    res.json({accessToken, refreshToken});
  } catch (err) {
    next(err);
  }
});

/*
Refresh token
 */
router.post('/refreshToken', async (req, res, next) => {
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

    res.json({accessToken, refreshToken});
  } catch (err) {
    next(err);
  }
});

module.exports = router;