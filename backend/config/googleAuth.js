import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET= process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET  = process.env.JWT_SECRET

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:4000/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                if (!profile) {
                    throw new Error('No profile received');
                }

                // Kiểm tra nếu người dùng đã tồn tại
                let user = await userModel.findOne({ googleId: profile.id });
                if (!user) {
                    // Tạo người dùng mới nếu chưa tồn tại
                    user = await userModel.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                    });
                }
                return done(null, user);
            } catch (error) {
                console.error('Error in GoogleStrategy:', error);
                return done(error, false);
            }
        }
    )
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

export default passport;
