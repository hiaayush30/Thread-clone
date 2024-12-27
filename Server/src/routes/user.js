const express=require('express');
const { userSignup, userLogin, userInfo, logout, followUser } = require('../controllers/user');
const { userAuth } = require('../middlewares/auth');
const userRouter=express.Router();

userRouter.post('/signup',userSignup);
userRouter.post('/login',userLogin);
userRouter.get('/info/:id',userAuth,userInfo);
userRouter.post('/follow/:id',userAuth,followUser);  //for following and unfollowing
userRouter.post('/logout',userAuth,logout);

module.exports={userRouter};