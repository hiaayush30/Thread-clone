const express = require('express');
const { addPost, getAllPosts, deletePost } = require('../controllers/post');
const { userAuth } = require('../middlewares/auth');
const postRouter=express.Router();

postRouter.post('/add',userAuth,addPost);
postRouter.get('/',userAuth,getAllPosts);
postRouter.delete('/:postId',userAuth,deletePost);

module.exports={postRouter};