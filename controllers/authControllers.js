require('dotenv').config()
const { hashedPassword, comparePassword } = require("../helper/authHelper");
const { Order } = require('../models/orderModel');
const { User } = require("../models/userModel");
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        if (!name) { return res.status(400).send({ success: false, message: 'Name is required' }); }
        if (!email) { return res.status(400).send({ success: false, message: 'Email is required' }); }
        if (!password) { return res.status(400).send({ success: false, message: 'Password is required' }); }
        if (!phone) { return res.status(400).send({ success: false, message: 'Phone is required' }); }
        if (!address) { return res.status(400).send({ success: false, message: 'Address is required' }); }
        if (!answer) { return res.status(400).send({ success: false, message: 'Answer is required' }); }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'Email is already registered, please login'
            });
        }

        const hashPassword = await hashedPassword(password);

        const user = new User({
            name,
            email,
            password: hashPassword,
            phone,
            address,
            answer
        }).save();

        res.status(200).send({
            success: true,
            message: 'User registration successful',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }

        // Check User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            })
        }

        // Token Creation

        const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: 'Login Successfull',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}

const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        if (!email) { res.status(400).send({ message: 'Email is Required' }) }
        if (!answer) { res.status(400).send({ message: 'Answer is Required' }) }
        if (!newPassword) { res.status(400).send({ message: 'New Password is Required' }) }

        const user = await User.findOne({ email, answer });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong email or answer"
            })
        }

        const hashed = await hashedPassword(newPassword);
        await User.findByIdAndUpdate(user._id, {
            password: hashed
        })

        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

const testController = async (req, res) => {
    res.send({ message: "Test router connected" })
}

const updateProfileController = async (req, res) => {
    try {
        const { name, password, phone, address } = req.body;
        const user = await User.findById(req.user._id);

        // Password
        if (password && password.length < 6) {
            return res.json({ error: "Password is required and 6 Charachter long" })
        }

        const hashPassword = password ? await hashedPassword(password) : undefined

        const updateUser = await User.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashPassword || user.hashPassword,
            phone: phone || user.phone,
            address: address || user.address,
        }, {
            new: true
        })

        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updateUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating Profile',
            error
        })
    }
}

// GET ORDERS

const getOrdersController = async (req, res) => {
    try {
        const order = await Order.find({ buyer: req.user._id }).populate("products", "-image").populate("buyer", "name");
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting Orders',
            error
        })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const order = await Order.find({}).populate("products", "-image").populate("buyer", "name").sort({ createdAt: -1 });
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting All Orders',
            error
        })
    }
}

const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating order',
            error
        })
    }
}

module.exports = {
    registerController,
    loginController,
    forgotPasswordController,
    testController,
    updateProfileController,
    getOrdersController,
    getAllOrders,
    orderStatusController
};
