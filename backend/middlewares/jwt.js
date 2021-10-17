const jwt = require('jsonwebtoken');

const JWT = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const data = jwt.verify(token, "Test");
        if (!data) return res.sendStatus(401);
        req.token = data;
        next();
    } catch {
        res.sendStatus(401);
    }
};

module.exports = JWT;