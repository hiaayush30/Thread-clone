const cloudinary = require('../config/cloudinary');
const formidable = require('formidable');
const { INTERNAL_SERVER_ERROR, BAD_REQUEST, CREATED, OK, FORBIDDEN } = require('../constants/statusCodes');
const { UserModel } = require('../modals/User');
const { PostModel } = require('../modals/Post');
const { CommentModel } = require('../modals/Comment');

const addPost = async (req, res) => {
    try {
        const form = formidable({});
        let uploadedImage;
        form.parse(req, async (err, feilds, files) => {
            if (err) {
                console.log('formidable parsing error:' + err);
                res.status(INTERNAL_SERVER_ERROR).json({
                    message: 'internal server error in file parsing'
                })
            }
            if (!feilds.text) return res.status(BAD_REQUEST).json({
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
                text: feilds.text,
                ...(files.media && {
                    media: uploadedImage.secure_url,
                    public_id: uploadedImage.public_id
                })
            })
            await UserModel.findByIdAndUpdate(req.user._id, {
                $push: { threads: post._id }
            })
            res.status(CREATED).json({
                message: 'post added!'
            })
        })
    } catch (err) {
        console.log('add post error' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })

    }
}

const getAllPosts = async (req, res) => {
    try {
        let { page, limit } = req.query;
        if (!limit || limit > 5 || limit < 1 || limit === undefined) limit = 5;
        if (!page || page < 1 || page === undefined) page = 1;
        const posts = await PostModel.find({})
            .sort({ createdAt: -1 })
            //descending order ie the latest at the top  
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('likes')
            .populate('admin')
            .populate({ path: 'comments', populate: 'admin' })  //to get the names of those who commented
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
        const post = await PostModel.findById({_id:postId});
        if(!post) return res.status(BAD_REQUEST).json({
            message:'post not found'
        });
       if(post.admin.toString() !== req.user._id.toString()){
        return res.status(FORBIDDEN).json({
            message:'cannot delete post of another user'
        })
       }
       //all cehcks done
       if(post.media){
        await cloudinary.uploader.destroy(post.public_id,{},(err,result)=>{
            console.log({err,result});
        });
       }
       await UserModel.updateMany({ 
        $or:[{threads:postId},{replies:postId},{reposts:postId}] //search for these docs
       },{
        $pull:{  //delete these
            replies:postId,
            reposts:postId,
            threads:postId
        }
       })
       await CommentModel.deleteMany({
        post:postId
       });
       await PostModel.findByIdAndDelete(postId);
       res.status(OK).json({
        message:'post deleted'
       })
    } catch (err) {
        console.log('delete post err' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error while deleting post'
        })
    }
}

module.exports = {
    addPost,
    getAllPosts,
    deletePost
}