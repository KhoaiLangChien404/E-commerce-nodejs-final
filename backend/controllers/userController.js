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
        const {name, email, phoneNum, password} = req.body
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false, message: "User already exists"})
        }
        if (!name || !email || !phoneNum || !password) {
            return res.json({ success: false, message: "All fields are required" });
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
            phoneNum,
            password:hashedPassword,
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
          address: user.address,
          phoneNum: user.phoneNum,
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

const editUserInfo = async(req,res) => {
    try {
        const { name, email, phoneNum, address } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name || !email || !phoneNum) {
            return res.status(400).json({ success: false, message: 'Name and email are required' });
        }

        const userId = req.user.id;

        // Cập nhật name và email
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, email, phoneNum, address },
            { new: true } // Trả về thông tin đã cập nhật
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'Failed to update profile' });
        }

        res.status(200).json({
            success: true,
            profile: {
                name: updatedUser.name,
                email: updatedUser.email,
                phoneNum: updatedUser.phoneNum,
                address: updatedUser.address,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const changeUserPassword = async(req,res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        const userId = req.user.id;

        // Lấy thông tin user
        const user = await userModel.findById(userId);

        // So sánh mật khẩu cũ
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid current password' });
        }

        // Hash mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu mới
        await userModel.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).json({ success: true, message: 'Password updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export {loginUser, registerUser, adminLogin, userStats, getAllUsers, updateUser, banUser, unbanUser, editUserInfo, changeUserPassword}