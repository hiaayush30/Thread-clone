const cloudinary = require('../config/cloudinary');
const formidable = require('formidable');
const { INTERNAL_SERVER_ERROR, BAD_REQUEST, CREATED, OK, FORBIDDEN } = require('../constants/statusCodes');
const { UserModel } = require('../models/User');
const { PostModel } = require('../models/Post');
const { CommentModel } = require('../models/Comment');

const addPost = async (req, res) => {
    try {
        const form = formidable({
            //uploadDir: '/path/to/uploads',
            //keepExtensions: true, // Keep original file extensions
        });
        let uploadedImage;
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log('formidable parsing error:' + err);
                res.status(INTERNAL_SERVER_ERROR).json({
                    message: 'internal server error in file parsing'
                })
            }
            if (!fields.text) return res.status(BAD_REQUEST).json({
                message: 'text feild cannot be empty'
            })
            if (files.media) {
                uploadedImage = await cloudinary.uploader.upload(files.media.filepath, {
                    folder: 'Threads_clone/Posts'
                });
                if (!uploadedImage) {
                    res.status(INTERNAL_SERVER_ERROR).json({
                        message: "Error while uploading image"
                    })
                }
            }
            const post = await PostModel.create({
                admin: req.user._id,
                text: fields.text,
                ...(files.media && {
                    media: uploadedImage.secure_url,
                    public_id: uploadedImage.public_id
                })
            })
            await post.populate({path:'admin',select:'-password'});
            await UserModel.findByIdAndUpdate(req.user._id, {
                $push: { threads: post._id }
            })
            res.status(CREATED).json({
                message: 'post added!',
                post
            })
        })
    } catch (err) {
        console.log('add post error' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error',
        })

    }
}

const getAllPosts = async (req, res) => {
    try {
        let { page, limit } = req.query;
        if (!limit || limit > 3 || limit < 1 || limit === undefined) limit = 3;
        if (!page || page < 1 || page === undefined) page = 1;
        const posts = await PostModel.find({})
            .sort({ createdAt: -1 })
            //descending order ie the latest at the top  
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({ path: 'comments', populate: { path: 'admin', select: '-password' } })
            .populate({ path: 'likes', select: '-password' })
            .populate({ path: 'admin', select: '-password' })
        //to get the names of those who commented
        res.status(OK).json({
            message: 'posts fetched successfully',
            posts
        })
    } catch (err) {
        console.log('getAllPost error:' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'could not fetch posts'
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) return res.status(BAD_REQUEST).json({ message: 'post id required' });
        const post = await PostModel.findById({ _id: postId });
        if (!post) return res.status(BAD_REQUEST).json({
            message: 'post not found'
        });
        if (post.admin.toString() !== req.user._id.toString()) {
            return res.status(FORBIDDEN).json({
                message: 'cannot delete post of another user'
            })
        }
        //all cehcks done
        if (post.media) {
            await cloudinary.uploader.destroy(post.public_id, {}, (err, result) => {
                console.log({ err, result });
            });
        }
        await UserModel.updateMany({
            $or: [{ threads: postId }, { replies: postId }, { reposts: postId }] //search for these docs
        }, {
            $pull: {  //delete these
                replies: postId,
                reposts: postId,
                threads: postId
            }
        })
        await CommentModel.deleteMany({
            post: postId
        });
        await PostModel.findByIdAndDelete(postId);
        res.status(OK).json({
            message: 'post deleted'
        })
    } catch (err) {
        console.log('delete post err' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error while deleting post'
        })
    }
}

const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) return res.status(BAD_REQUEST).json({ message: 'post id required' })
        const post = await PostModel.findOne({ _id: postId });
        if (!post) {
            return res.status(BAD_REQUEST).json({
                message: 'post not found'
            })
        }
        if (post.likes.includes(req.user._id)) {
            post.likes.pop(req.user._id);
            await post.save();
            return res.status(OK).json({
                message: 'post unliked'
            })
        }
        post.likes.push(req.user._id);
        await post.save();
        return res.status(OK).json({
            message: 'post liked'
        })
    } catch (err) {
        console.log('likePost error:' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'Internal server error'
        })
    }
}

const repost = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) return res.status(BAD_REQUEST).json({ message: 'post id required!' })
        const post = await PostModel.findById(postId);
        if (!post) return res.status(BAD_REQUEST).json({
            message: 'post not found!'
        })
        const alreadyReposted = req.user.reposts.some(repost => repost._id.toString() === postId.toString());
        // some() iterates through the array and checks if at least one object meets the condition.
        //returns true or false
        if (alreadyReposted) {
            return res.status(BAD_REQUEST).json({
                message: 'already reposted'
            })
        }
        await UserModel.findByIdAndUpdate(req.user._id, {
            $push: { reposts: postId }
        })
        return res.status(OK).json({
            message: 'post reposted'
        })
    } catch (err) {
        console.log('repost error' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error in repost'
        })
    }
}

const singlePost = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            return res.status(BAD_REQUEST).json({
                message: 'post id required!'
            })
        }
        const post = await PostModel.findById(postId)
            .populate({ path: 'admin', select: '-password' })
            .populate({ path: 'likes', select: '-password' })
            .populate({ path: 'comments', populate: { path: 'admin', select: '-password' } })
        if (!post) return res.status(BAD_REQUEST).json({ message: 'post not found' });
        res.status(OK).json({
            message: 'post fetched successfully',
            post
        })

    } catch (err) {
        console.log('single plost error:' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

module.exports = {
    addPost,
    getAllPosts,
    deletePost,
    likePost,
    repost,
    singlePost
}