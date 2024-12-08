import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'; 

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'hoangnhat'); 
    const user = await userModel.findById(decoded.id); 

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authMiddleware;
