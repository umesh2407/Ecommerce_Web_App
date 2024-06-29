const jwt = require('jsonwebtoken');
const userSchema = require("../models/user")

// Generate token
function generateJwtToken(userSchema) {
    const payload = {
        user: userSchema._id,
        email: userSchema.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // Token expires in 1 hour
    };
    
    // Generate JWT token
    const token = jwt.sign(payload, process.env.secretKey);
    return token;
}

//Verify token
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Unauthorized - Invalid authorization header' });
    }
    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        req.user = decoded;
    
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}

module.exports = {
    generateJwtToken,
    verifyToken,
};
