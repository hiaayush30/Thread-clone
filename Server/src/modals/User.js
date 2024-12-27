const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        // select: false,  //will not be sent when a doc is fetched via the api
        type: String,
        required: true
    },
    bio: {
        type: String,
        trim: true
    },
    profilePic: {
        type: String,
        default: '/profilePic.png'
    },
    public_id: {
        type: String
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    reposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

//this hook runs whenever a doc is created or updated
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    //only when changes have been made to the password should we proceed
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
})

userSchema.methods.getJWT = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    return token;
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;
    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword;
}

const UserModel = mongoose.model("User", userSchema);
module.exports = { UserModel };