const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('Token from cookies:', token);

    if (!token) return res.status(401).json({ msg: 'No token, access denied' });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = decoded; // attach user info to request

    next(); // move to next middleware/controller
  } catch (error) {
    console.error('JWT Verify Error:', error);
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};


module.exports=authMiddleware;