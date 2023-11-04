const User = require("../Models/User")
const jwt = require("jsonwebtoken")

const register = async (req,res)=>{
    const {email} = req.body 
    const user = await User.findOne(
        {email}
    )
    if(user){
        res.status(401).json("User already exists")
        return
    }
    const newUser = await User.create(
        req.body
    ) 
    res.status(201).json("Registration successful")
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json("User Doesn't Exist!");
    }

    if (password === user.password) {
        const Token = jwt.sign({ id:user._id, email:user.email, password:user.password }, process.env.JWT, { expiresIn: '1d' });

        // Check if the user is an admin
        const isAdmin = user.isAdmin;

        return res.status(200).json({ message: "Congratulations", Token, isAdmin });
    } else {
        return res.status(401).json("Email and Password Don't Match!");
    }
}

const getLoggedinUser = async (req, res) => {
    try {

        const user = req.user;
        console.log(user)

        res.status(200).json({ message: user })
    } catch (error) {

        res.status(501).json({ message: error })
    }
}


module.exports = {register,login,getLoggedinUser}