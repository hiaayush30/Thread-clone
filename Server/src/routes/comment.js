const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { addComment, deleteComment } = require('../controllers/comment');
const commentRouter = express.Router();

commentRouter.post('/:postId',userAuth,addComment);
commentRouter.delete('/:commentId',userAuth,deleteComment);

module.exports = { commentRouter };
