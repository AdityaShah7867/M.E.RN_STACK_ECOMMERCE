const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required:true
        },
        password:{
            type: String,
            required:true
        },
        name:{
            type: String,
            required:false
        },
        isAdmin: {
            type: Boolean,
            default: false  // Default value is false, meaning the user is not an admin by default
        }
    }
)

module.exports = mongoose.model('User', userSchema)