import express from 'express'
import { loginUser,registerUser,adminLogin,getUserProfile,getAllUsers, updateUser, banUser, unbanUser } from '../controllers/userController.js'
import adminAuth from '../middleware/adminAuth.js';
import { userStats } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/profile', authMiddleware, getUserProfile)
userRouter.get('/stats', adminAuth, userStats);
userRouter.get('/all', adminAuth, getAllUsers); 
userRouter.post('/update', adminAuth, updateUser); 
userRouter.post('/ban', adminAuth, banUser);
userRouter.post('/unban', adminAuth, unbanUser)

export default userRouter