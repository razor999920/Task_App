const jwt = require('jsonwebtoken');
function isAuthenticated(req, res, next) {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            res.status(401).json({msg: '🚫 Un-Authorized 🚫'});
        }

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