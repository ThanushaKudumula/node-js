const express = require('express');
const cookieParser = require('cookie-parser');
const model = require('./../models/userModel');
const asyncHandler = require('express-async-handler');
const generatetoken = require('./../config/jwttoken');
const generaterefreshtoken = require('../config/refreshtoken');
const jwt = require('jsonwebtoken');
const crypto=require('crypto')

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// Controller functions
// Signin
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await model.findOne({ email: email });
    if (!findUser) {
        const newUser =model.create(req.body);
        res.status(201).json(newUser);
    } else {
        throw new Error('User already exists');
    }
});

// Login
const loginuser = asyncHandler(async (req, res,next) => { 
    const email = req.body.email;
    const pwd = req.body.password;
    const finduser = await model.findOne({ email:email });
    if (finduser && (finduser.isPasswordMatched(pwd))) {
        const refreshToken = generaterefreshtoken(finduser._id);
        await model.findByIdAndUpdate(finduser._id, {
            refreshToken: refreshToken
        }, {
            new: true
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        res.json({
            email: finduser.email,
            mobile: finduser.mobile,
            token: generatetoken(finduser._id)
        });
        next()
    } else {
        throw new Error('User doesn\'t exist');
    }
});

// Get all users
const getalluser = asyncHandler(async (req, res) => {
    try {
        const users = await model.find();
        res.json({ users });
    } catch (error) {
        throw new Error("error")
    }
});

// Get user by ID
const getbyId = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const found = await model.findById(id);
        if (found) {
            res.json({ user: found });
        } else {
            throw new Error("User not found");
        }
    } catch (err) {
        throw new Error(err.message);
    }
});

// Delete a user by ID
const deletebyId = asyncHandler(async (req, res) => {
    try {
        const id = req.params; 
        const found = await model.findByIdAndDelete(id);
        if (found) {
            res.json({ user: found });
        } else {
            throw new Error("User not found");
        }
    } catch (err) {
        throw new Error(err);
    }
});
// Update by ID
const updatebyId = asyncHandler(async (req, res) => {
    try {
        const {_id} = req.user; 
        const found = await model.findByIdAndUpdate(_id, {
            firstname: req.body.firstname, 
            lastname: req.body.lastname
        }, {
            new: true
        });
        res.json(found);
    } catch (err) {
        throw new Error(err);
    }
});
// Block user
const block = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const find = await model.findByIdAndUpdate(id, {
            isBlocked: true
        }, {
            new: true
        });
        res.json({ message: 'User blocked' });
    } catch (err) {
        throw new Error(err.message);
    }
});

// Unblock user
const unblock = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const find = await model.findByIdAndUpdate(id, {
            isBlocked: false
        }, {
            new: true
        });
        res.json({ message: 'User unblocked' });
    } catch (err) {
        throw new Error(err.message);
    }
});

// Handle refresh token
const handlerefreshtoken = asyncHandler(async (req, res) => {
    const cookie = req.cookies; // Correctly access cookies using req.cookies
    console.log('Cookies received:', cookie); // Debugging line
    if (!cookie.refreshToken) {
        return res.status(403).json({ message: "No refresh token in cookies" });
    }
    const refreshToken = cookie.neew;
    try {
        const user = await model.findOne({ refreshToken });
        if (!user) {
            // If no user is found with the refresh token
            return res.status(403).json({ message: 'No refresh token present in DB' });
        }
        // Verify the refresh token
        jwt.verify(refreshToken, process.env.SECRET_TOKEN, (err, decoded) => {
            if (err || user._id.toString() !== decoded.id) {
                return res.status(403).json({ message: 'Something is wrong with the token' });
            }
            // Generate a new access token
            const accessToken = generatetoken(user._id);
            res.json({ accessToken });
        });
    } catch (error) {
        console.error('Error handling refresh token:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
//logout
const logout=asyncHandler(async(req, res)=>{
    const cookie=req.cookies;
    if(!cookie.refreshToken)throw new Error("no refresh token in cookies")
        const refreshToken=cookie.refreshToken;
    const user=await model.findOne({refreshToken});
    if(!user){
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:true
        })
        return res.sendStatus(204);
    }
    await model.findByIdAndUpdate(refreshToken,{
        refreshToken:"",
    })
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true
    })
    return res.sendStatus(204);
})

//update password
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    // validateMongoDbId(_id);
    const user = await model.findById(_id);
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  });

  const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await model.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
      const token = await model.createPasswordResetToken();
      await user.save();
      const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
      const data = {
        to: email,
        text: "Hey User",
        subject: "Forgot Password Link",
        htm: resetURL,
      };
      sendEmail(data);
      res.json(token);
    } catch (error) {
      throw new Error(error);
    }
  });
  const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await model.findOne({
      passwordresettoken: hashedToken,
      passwordresetexpires: { $gt: Date.now() },
    });
    if (!user) throw new Error(" Token Expired, Please try again later");
    user.password = password;
    user.passwordresettoken = undefined;
    user.passwordresetexpires = undefined;
    await user.save();
    res.json(user);
  });

module.exports = { 
    createUser, 
    loginuser, 
    getalluser, 
    getbyId, 
    deletebyId, 
    updatebyId, 
    block, 
    unblock, 
    handlerefreshtoken, 
    logout ,
    updatePassword,
    forgotPasswordToken,
    resetPassword
};
