import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Cho phép null và unique cùng tồn tại
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId; // Chỉ yêu cầu nếu không có googleId
        },
    },
});

const userModel = mongoose.models.user || mongoose.model('user',userSchema)
export default userModel