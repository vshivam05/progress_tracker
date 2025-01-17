const userService = require("../services/user.services");

const registerUser = async(req, res) => {
    try{
        const {email, password, confirmPassword} = req.body;
        const result = await userService.registerUser(email, password, confirmPassword);
        res.status(201).json(result);
    }catch(error){
        res.status(error.status || 500).json({message: error.message});
    }
}

const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;
        const result = await userService.loginUser(email, password);
        res.status(200).json(result);
    }catch(error){
        res.status(error.status || 500).json({message: error.message});
    }
}

module.exports = {
    registerUser,
    loginUser,
};