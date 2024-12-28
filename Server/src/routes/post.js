const express = require('express');
const { addPost, getAllPosts, deletePost, likePost, repost, singlePost } = require('../controllers/post');
const { userAuth } = require('../middlewares/auth');
const postRouter = express.Router();

postRouter.post('/add', userAuth, addPost);
postRouter.get('/', userAuth, getAllPosts);
postRouter.delete('/:postId', userAuth, deletePost);
postRouter.put('/like/:postId', userAuth, likePost);
postRouter.post('/repost/:postId', userAuth, repost);
postRouter.get('/:postId', userAuth, singlePost);

module.exports = { postRouter };