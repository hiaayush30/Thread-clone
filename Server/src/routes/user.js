const express=require('express');
const { userSignup, userLogin, userInfo, logout, followUser, updateProfile } = require('../controllers/user');
const { userAuth } = require('../middlewares/auth');
const userRouter=express.Router();

userRouter.post('/signup',userSignup);
userRouter.post('/login',userLogin);
userRouter.get('/info/:id',userAuth,userInfo);
userRouter.put('/follow/:id',userAuth,followUser);  //for following and unfollowing
userRouter.post('/logout',userAuth,logout);
userRouter.put('/update',userAuth,updateProfile)

module.exports={userRouter};