const { INTERNAL_SERVER_ERROR, BAD_REQUEST, OK, FORBIDDEN, CREATED } = require('../constants/statusCodes');
const { PostModel } = require('../models/Post');
const { CommentModel } = require('../models/Comment');
const { UserModel } = require('../models/User');

const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        if (!postId) return res.status(BAD_REQUEST).json({ message: 'post id required' });
        if (!text) return res.status(BAD_REQUEST).json({ message: 'comment cannot be empty!' });

        const post = await PostModel.findById(postId);
        if (!post) return res.status(BAD_REQUEST).json({ message: 'post not found' });
        const comment = await CommentModel.create({
            admin: req.user._id,
            post: postId,
            text
        });
        post.comments.push(comment._id);
        await post.save();
        await UserModel.findByIdAndUpdate(req.user._id, {
            $push: { replies: comment._id }
        });
        res.status(CREATED).json({
            message: 'comment added successfully!'
        })
    } catch (err) {
        console.log('add comment err:' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        if (!commentId || !postId) return res.status(BAD_REQUEST).json({ message: 'comment and post id required!' });
        const comment = await CommentModel.findById(commentId);
        if (!comment) return res.status(BAD_REQUEST).json({ message: 'comment not found!' });
        const post = await PostModel.findById(postId);
        if (!post) return res.status(BAD_REQUEST).json({ message: 'post not found!' });

        if (comment.admin.toString() !== req.user._id.toString()) {
            return res.status(FORBIDDEN).json({
                message: 'cannot delete another users comment'
            })
        }
        await UserModel.findByIdAndUpdate(req.user._id, {
            $pull: { replies: commentId }
        });
        if(!post.comments.includes(commentId)) return res.status(BAD_REQUEST).json({
            mesage:'The post does not include the comment'
        })
        post.comments.pop(commentId);
        await post.save();
        await CommentModel.findByIdAndDelete(commentId);
        return res.status(OK).json({
            message: 'comment deleted successfully!'
        })
    } catch (err) {
        console.log('delete comment error:' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

module.exports = {
    addComment, deleteComment
}