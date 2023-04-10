const express = require('express');
const { v4: uuidv4 } = require('uuid')
const { generateTokens } = require('../../utils/jwt');
const { addRefreshTokenToWhitelist } = require('./auth.services');
const { getUserByEmail, createUser } = require('../user/user.services');

const router = new express.Router();

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

module.exports = router;