import express from 'express'
<<<<<<< HEAD
import { loginUser,registerUser,adminLogin,getUserProfile } from '../controllers/userController.js'
import adminAuth from '../middleware/adminAuth.js';
import { userStats } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
=======
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js'
>>>>>>> cf2e1869b557e3969b924c5377464f77434d9c79

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
<<<<<<< HEAD
userRouter.get('/profile', authMiddleware, getUserProfile)
userRouter.get('/stats', adminAuth, userStats);
=======
>>>>>>> cf2e1869b557e3969b924c5377464f77434d9c79

export default userRouter