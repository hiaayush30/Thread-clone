const jwt = require('jsonwebtoken');
const { FORBIDDEN } = require('../constants/statusCodes');
const { UserModel } = require('../modals/User');
const { PostModel } = require('../modals/Post');
const { CommentModel } = require('../modals/Comment');

const userAuth = async (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        return res.status(FORBIDDEN).json({
            message: 'token not found,please login first'
        })
    }
    try {
        token = token.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded._id)
            .select('-password')
            .populate('followers')
            .populate('threads')
            .populate('replies')
            .populate('reposts')
        if (!req.user) throw new Error('user not found')
        next();
    } catch (err) {
        console.log('auth error:' + err);
        return res.status(FORBIDDEN).json({
            message: 'invalid or expired token,please login again'
        })
    }
}

module.exports = { userAuth }