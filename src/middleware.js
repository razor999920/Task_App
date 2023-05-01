const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({msg: '🚫 Un-Authorized 🚫'});
    }

    try {
        const token = authorization.split(' ')[1];

        req.payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
        res.status(401);

        if (err.name === 'TokenExpiredError') {
            console.error(err.name);
        }

        console.error('🚫 Un-Authorized 🚫');
    }

    return next();
}

module.exports = {
    isAuthenticated
}