import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success:false, message: "User doesn't exists"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else {
            res.json({success:false, message: 'Invalid credentials'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
const registerUser = async(req,res) => {
    try {
        const {name, email, password} = req.body
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false, message: "User already exists"})
        }
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch(error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
const adminLogin = async(req,res) => {
    try {
        
        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
        {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        }
        else
        {
            res.json({success:false, message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
const userStats = async (req, res) => {
    try {
      const totalUsers = await userModel.countDocuments({});
      const newUsers = await userModel.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Người dùng trong 7 ngày qua
      });
      res.json({ success: true, totalUsers, newUsers });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
}
export const getUserProfile = async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id); // Giả sử bạn lưu thông tin người dùng trong req.user.id
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          defaultAddress: user.defaultAddress, // Địa chỉ mặc định của người dùng
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, '-password'); // Không trả về mật khẩu
        res.json({ success: true, users });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
const updateUser = async (req, res) => {
    try {
        const { userId, name, email, isBanned } = req.body;

        const user = await userModel.findByIdAndUpdate(
            userId,
            { name, email, isBanned },
            { new: true }
        );

        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
const banUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findByIdAndUpdate(
            userId,
            { isBanned: true },
            { new: true }
        );

        res.json({ success: true, message: 'User has been banned', user });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
const unbanUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findByIdAndUpdate(
            userId,
            { isBanned: false },
            { new: true }
        );

        res.json({ success: true, message: 'User has been unbanned', user });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
export {loginUser, registerUser, adminLogin, userStats, getAllUsers, updateUser, banUser, unbanUser}
