const jwt = require('jsonwebtoken');
const User = require('../model');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Missing token' });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        try {
            const user = await User.findOne({ id: decoded.id });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    });
};

module.exports = verifyToken;
