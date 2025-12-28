const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ phone });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    // Note: password hashing is handled in User model pre-save hook
    // We map 'password' input to 'passwordHash' schema field
    const user = await User.create({
        name,
        phone,
        passwordHash: password,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { phone, password } = req.body;

    // Check for user phone
    const user = await User.findOne({ phone });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user)
}

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users)
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (user) {
            user.name = req.body.name || user.name
            user.phone = req.body.phone || user.phone

            if (req.body.password) {
                user.passwordHash = req.body.password
            }

            console.log('Saving user:', user._id);
            const updatedUser = await user.save()
            console.log('User saved successfully');

            res.json({
                _id: updatedUser.id,
                name: updatedUser.name,
                phone: updatedUser.phone,
                role: updatedUser.role,
                token: generateToken(updatedUser._id),
            })
        } else {
            res.status(404)
            throw new Error('User not found')
        }
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getUsers,
    updateProfile,
};
