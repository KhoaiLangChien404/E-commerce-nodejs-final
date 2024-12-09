import express from 'express'
import { loginUser,registerUser,adminLogin,getUserProfile,getAllUsers, updateUser, banUser, unbanUser } from '../controllers/userController.js'
import adminAuth from '../middleware/adminAuth.js';
import { userStats } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import userModel from '../models/userModel.js';
import authProfileMiddleware from '../middleware/authProfileMiddleware.js';
import { editUserInfo, changeUserPassword } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/history-profile', authMiddleware, getUserProfile)
userRouter.get('/stats', adminAuth, userStats);
userRouter.get('/all', adminAuth, getAllUsers); 
userRouter.post('/update', adminAuth, updateUser); 
userRouter.post('/ban', adminAuth, banUser);
userRouter.post('/unban', adminAuth, unbanUser)

userRouter.get('/profile', authProfileMiddleware, async (req, res) => {
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
                phoneNum: user.phoneNum,
                address: user.address,
                password: user.password,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

userRouter.put('/edit-profile', authProfileMiddleware, editUserInfo)
userRouter.put('/change-password', authProfileMiddleware, changeUserPassword)
    
export default userRouter;