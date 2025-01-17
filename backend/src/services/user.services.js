const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async(email, password, confirmPassword) => {
    if (!email || !password || !confirmPassword) {
        const error = new Error('All fields are required');
        error.status = 400;
        throw error;
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        const error = new Error('User already exists');
        error.status = 400;
        throw error;
    }
    if(password !== confirmPassword){
        const error = new Error("Password don't match");
        error.status = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({email, password : hashedPassword});
    await newUser.save();
    return { message: "User registered successfully" };
}

const loginUser = async(email, password) => {
    const user = await User.findOne({email});
    if(!user){
        const error = new Error('Invalid credentials');
        error.status = 400;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Invalid credentials');
        error.status = 400;
        throw error;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {token};
}

module.exports = {
    registerUser,
    loginUser,
};