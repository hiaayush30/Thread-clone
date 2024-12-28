const zod = require('zod');
const bcrypt = require('bcrypt');
const { UserModel } = require('../models/User');

const validateSignupSchema = (body) => {
    const signupSchema = zod.object({
        username: zod.string(),
        email: zod.string().email(),
        password: zod.string()
    })
    return signupSchema.safeParse(body);
}

const validateLoginSchema = (body) => {
    const loginSchema = zod.object({
        email: zod.string(),
        password: zod.string()
    })
    return loginSchema.safeParse(body);
}

const checkExistingEmail = async (email) => {
    const user = await UserModel.findOne({ email });
    return user ? true : false;
}

module.exports = {
    validateSignupSchema,
    validateLoginSchema,
    checkExistingEmail
}


