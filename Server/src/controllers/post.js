const cloudinary = require('../config/cloudinary');
const formidable = require('formidable');
const { INTERNAL_SERVER_ERROR, BAD_REQUEST, CREATED } = require('../constants/statusCodes');
const { UserModel } = require('../modals/User');
const { PostModel } = require('../modals/Post');

const addPost = async (req, res) => {
    try {
        const form = formidable({});
        let uploadedImage;
        form.parse(req, async (err, feilds, files) => {
            if (err) {
                console.log('formidable parsing error:'+err);
                res.status(INTERNAL_SERVER_ERROR).json({
                    message:'internal server error in file parsing'
                })
            }
            if (!feilds.text) return res.status(BAD_REQUEST).json({
                message: 'text feild cannot be empty'
            })
            if (files.media) {
                uploadedImage = await cloudinary.uploader.upload(files.media.filepath,{
                    folder:'Threads_clone/Posts'
                });
            }
            const post = await PostModel.create({
                admin: req.user._id,
                text: feilds.text,
                ...(files.media && {
                    media: uploadedImage.secure_url,
                    public_id: uploadedImage.public_id
                })
            })
            await UserModel.findByIdAndUpdate(req.user._id,{
                $push:{threads:post._id}
            })
            res.status(CREATED).json({
                message:'post added!'
            })
        })
    } catch (err) {
        console.log('add post error' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })

    }
}

module.exports = {
    addPost
}