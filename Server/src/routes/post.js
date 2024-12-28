const express = require('express');
const { addPost } = require('../controllers/post');
const { userAuth } = require('../middlewares/auth');
const postRouter=express.Router();

postRouter.post('/add',userAuth,addPost);

module.exports={postRouter};