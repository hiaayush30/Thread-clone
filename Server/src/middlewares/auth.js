const jwt = require('jsonwebtoken');
const { FORBIDDEN } = require('../constants/statusCodes');

const userAuth = async (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        return res.status(FORBIDDEN).json({
            message: 'token not found,please login first'
        })
    }
    try {
        token=token.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req._id = decoded._id;
        next();
    } catch (err) {
        return res.status(FORBIDDEN).json({
            message: 'invalid or expired token,please login again'
        })
    }
}

module.exports = { userAuth }