const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    text: {
        type: String,
        trim: true
    }
});

const CommentModel = mongoose.model('Comment', commentSchema);
module.exports = { CommentModel }