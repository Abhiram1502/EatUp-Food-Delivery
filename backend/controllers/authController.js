const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =======================
// Register User
// =======================
const registerUser = async (req, res) => {
    try {

        const { name, email, phone, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profileImage: user.profileImage,
                addresses: user.addresses,
                isVerified: user.isVerified
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// =======================
// Login User
// =======================
const loginUser = async (req, res) => {

    try {

        const { email, password, role } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        // Check login portal
        if (role && user.role !== role) {
            return res.status(403).json({
                message: "Invalid role for this login"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({

            message: "Login Successful",

            token,

            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profileImage: user.profileImage,
                addresses: user.addresses,
                isVerified: user.isVerified
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =======================
// Get Current User
// =======================
const getCurrentUser = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =======================
// Update Profile
// =======================
const updateProfile = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            profileImage
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.phone = phone ?? user.phone;
        user.profileImage = profileImage ?? user.profileImage;

        await user.save();

        res.status(200).json({

            message: "Profile Updated Successfully",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profileImage: user.profileImage,
                addresses: user.addresses,
                isVerified: user.isVerified
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =======================
// Add Address
// =======================
const addAddress = async (req, res) => {

    try {

        const { address } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (address.isDefault) {

            user.addresses.forEach(addr => {
                addr.isDefault = false;
            });

        }

        user.addresses.push(address);

        await user.save();

        res.status(200).json({

            message: "Address Added Successfully",

            user

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// =======================
// Delete Address
// =======================
const deleteAddress = async (req, res) => {

    try {

        const { addressId } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.addresses = user.addresses.filter(

            (address) => address._id.toString() !== addressId

        );

        await user.save();

        res.status(200).json({

            message: "Address Deleted Successfully",

            user

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    registerUser,

    loginUser,

    getCurrentUser,

    updateProfile,

    addAddress,

    deleteAddress

};