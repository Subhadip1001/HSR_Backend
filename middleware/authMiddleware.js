// HSR_Backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js'; // Optional: to attach the full user object

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token (remove 'Bearer ' part)
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using your secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Attach user ID to the request object
      // We find the user *without* the password for security
      // req.user = await User.findById(decoded.userId).select('-password'); 
      // OR simpler: just attach the ID
      req.userId = decoded.userId; 

      // 5. Allow the request to continue to the next step (the controller)
      next(); 

    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token was found in the header
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect;