import jwt from 'jsonwebtoken';

const authProfileMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ Header

    if (!token) {
        return res.status(401).json({ success: false, message: 'Authorization failed' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token
        req.user = decoded; // Lưu thông tin user vào req
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};

export default authProfileMiddleware;