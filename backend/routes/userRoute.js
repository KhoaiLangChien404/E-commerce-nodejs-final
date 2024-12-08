import express from 'express'
import { loginUser,registerUser,adminLogin,getUserProfile } from '../controllers/userController.js'
import adminAuth from '../middleware/adminAuth.js';
import { userStats } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/profile', authMiddleware, getUserProfile)
userRouter.get('/stats', adminAuth, userStats);

export default userRouter