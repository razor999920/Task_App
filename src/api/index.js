const express = require('express');
const auth = require('./auth/auth.routes');
const user = require('./user/user.routes');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏'
    });
});

router.use('/auth', auth);
router.use('/user', user);

module.exports = router;