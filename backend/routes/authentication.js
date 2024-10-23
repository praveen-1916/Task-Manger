import { compare, genSalt, hash } from "bcrypt";
import { Router } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from '../models/UserDetails.js';
import fetchUser from "../middleware/fetchUser.js";

const mySecret = "praveen@is@1619@is@praveen"

const router = Router();

router.post('/register', [
    body('firstName', 'Please enter a valid name').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password contains atleast 5 characters').isLength({ min: 5 }),
],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.json({ success: false, errors: result.array() });
        } else {
            try {
                const user = await User.findOne({ email: req.body.email });
                if (user) {
                    res.status(400).json({ success: false, errorMsg: 'This Email is already taken. Try with another one' })
                } else {
                    const salt = await genSalt(10);
                    const hashPassWord = await hash(req.body.password, salt);
                    req.body.password = hashPassWord;
                    const userData = new User(req.body);
                    await userData.save();
                    res.json({ userData, success: true, msg: 'Account Created Successfully' })
                }
            } catch (error) {
                res.status(400).json({ success: false, errorMsg: 'Internal server error!', err: error })
            }
        }
    })


router.post('/createTeamMember', fetchUser, [
    body('firstName', 'Please enter a valid name').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password contains atleast 5 characters').isLength({ min: 5 }),
],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.json({ success: false, errors: result.array() });
        } else {
            try {
                const { firstName, lastName, email, role } = req.body;
                const adminId = req.userId;
                const user = await User.findOne({ email: email });
                if (user) {
                    res.status(400).json({ success: false, errorMsg: 'This Email is already taken. Try with another one' })
                } else {
                    const salt = await genSalt(10);
                    const hashPassWord = await hash(req.body.password, salt);
                    const userData = new User({ firstName, lastName, email, password: hashPassWord, role, adminId });
                    await userData.save();
                    res.json({ userData, success: true, msg: 'Team Member Created Successfully. Share This Email and password to your team member.' })
                }
            } catch (error) {
                res.status(400).json({ success: false, errorMsg: 'Internal server error!', err: error })
            }
        }
    })

router.post('/login', [
    body('email', 'Please enter a valid name').isLength({ min: 3 }),
    body('password', 'Password contains atleast 3 characters').isLength({ min: 5 })
],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.json({ success: false, errors: result.array() });
        } else {
            try {
                const { email, password } = req.body;
                const user = await User.findOne({ email: email });
                if (!user) {
                    res.status(400).json({ success: false, errorMsg: 'Please login with correct credentials' })
                } else {
                    const passwordMatch = await compare(password, user.password);
                    if (passwordMatch) {
                        const data = {
                            user: {
                                id: user._id
                            }
                        }
                        const authToken = jwt.sign(data, mySecret);
                        res.json({ success: true, authToken, admin: user.admin, msg: 'Login Successfull' });
                    } else {
                        res.status(400).json({ success: false, errorMsg: 'Please login with correct password credentials' })
                    }
                }

            } catch (error) {
                res.status(400).json({ success: false, errorMsg: 'Internal server error!', err: error })
            }
        }
    })


router.get('/getuser', fetchUser,
    async (req, res) => {
        try {
            const userId = req.userId;
            const userDetails = await User.findById(userId, { password: false })
            res.json({ success: true, userDetails })
        } catch (error) {
            res.status(400).json({ success: false, errorMsg: 'Internal server error!', err: error })
        }
    })



export default router;