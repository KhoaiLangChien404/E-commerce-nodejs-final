import express from 'express'
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js'
import userModel from '../models/userModel.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

userRouter.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({
            success: true,
            profile: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default userRouter;