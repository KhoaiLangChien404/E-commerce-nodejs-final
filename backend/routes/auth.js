import express from 'express';
import passport from '../config/googleAuth.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

// Google Login Route
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account', 
    })
);


router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.redirect(`http://localhost:5173/login?token=${token}`);
    }
);



export default router;
