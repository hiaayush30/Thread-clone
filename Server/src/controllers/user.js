const { validateSignupSchema, validateLoginSchema, checkExistingEmail } = require('../services/user');
const { UserModel } = require('../modals/User');
const { CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } = require('../constants/statusCodes');

const userSignup = async (req, res) => {
    const validBody = validateSignupSchema(req.body);
    if (!validBody.success) {
        return res.status(404).json({
            message: "invalid request",
            error: validBody.error
        })
    }
    try {
        const { username, email, password } = req.body;
        const existingEmail = await checkExistingEmail(email);
        if (existingEmail) {
            return res.status(BAD_REQUEST).json({
                message: 'user already registered'
            })
        }
        const user = await UserModel.create({
            username,
            email,
            password
        });
        return res.status(CREATED).json({
            message: "User created successfully",
        })
    } catch (err) {
        console.log('signup error:' + err);
        res.status(500).json({
            message: 'internal server error'
        });
    }
}

const userLogin = async (req, res) => {
    const validBody = validateLoginSchema(req.body);
    if (!validBody.success) {
        return res.status(404).json({
            message: 'invalid body',
            error: validBody.error
        })
    }
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(BAD_REQUEST).json({
                message: 'user not found'
            })
        }
        const validPassword = await user.validatePassword(password);
        if (!validPassword) {
            return res.status(BAD_REQUEST).json({
                message: 'incorrect credentials'
            })
        }
        const token = user.getJWT();
        res.cookie('token', 'Bearer ' + token, {
            httpOnly: true,
            maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true
        });
        res.status(OK).json({
            message: 'logged in successfully'
        })
    } catch (err) {
        console.log('login error:' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

const userInfo = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(BAD_REQUEST).json({
                message: 'user id required'
            })
        }
        const user = await UserModel.findOne({
            _id: id
        })
            .select('-password')
            .populate('followers')  //basic details of all followers
            .populate({ path: 'threads', populate: [{ path: 'likes' }, { path: "comments" }, { path: 'admin' }] })
            //user's posts as well as his/her liked posts,comments,admin details of those posts
            .populate({ path: "replies", populate: { path: 'admin' } })
            .populate({ path: 'reposts', populate: [{ path: 'likes' }, { path: 'comments' }, { path: 'admin' }] })
        //nested population
        return res.status(OK).json({
            message: 'user details fetched successfully',
            user
        });
    } catch (err) {
        console.log('error in fetching user info' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(OK).json({
            message: 'logged out successfully'
        })
    } catch (err) {
        console.log('logout error:' + err);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

const followUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) return res.status(BAD_REQUEST).json({ message: "user id required" })
        if (userId == req._id) {
            return res.status(BAD_REQUEST).json({
                message: 'cannot follow yourself'
            })
        }
        const user = await UserModel.findOne({ _id: userId });
        if (!user) return res.status(BAD_REQUEST).json({ message: 'user not found' });

        if (user.followers.includes(req._id)) {
            await UserModel.findByIdAndUpdate(user._id, {
                $pull: { followers: req._id }//pull takes something out of an array
            },{new:true})
            // By default, findByIdAndUpdate returns the document before the update is applied.
            return res.status(OK).json({
                message: `you unfollowed ${user.username}`
            })
        } else {
            await UserModel.findByIdAndUpdate(user._id, {
                $push: { followers: req._id }
            },{new:true})
            return res.status(OK).json({
                message: `you followed ${user.username}`
            })
        }
    } catch (err) {
        console.log('followUser error:' + err);
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        })
    }
}

module.exports = {
    userSignup,
    userLogin,
    userInfo,
    followUser,
    logout
}