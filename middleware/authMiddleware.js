const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

// Protected Routes token base

const requireSignIn = async (req, res, next) => {
    try {
        const decode = jwt.verify(
            req.headers.authorization,
            process.env.SECRET_KEY
        );

        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized Access'
            })
        }
        else {
            next();
        }
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: 'Error in Admin Middleware',
            error
        })
    }
}

module.exports = {
    requireSignIn,
    isAdmin
};