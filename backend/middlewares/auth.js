const jwt = require('jsonwebtoken');
const userSchema = require("../models/user")

// Generate token
function generateJwtToken(userSchema) {
    const payload = {
        user: userSchema._id,
        email: userSchema.email,
        role: userSchema.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
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

function authorizeRoles(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'User is not allowed to access this resource' });
      }
      next();
    };
  }

  //admin access
async function isAdmin  (req, res, next) {
    try {
      const user = await userSchema.findById(req.user.user);
      if (user.role !== "admin") {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };


module.exports = {
    generateJwtToken,
    verifyToken,
    authorizeRoles,
    isAdmin
};
