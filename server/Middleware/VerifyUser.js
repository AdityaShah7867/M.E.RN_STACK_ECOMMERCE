
const jwt = require('jsonwebtoken');
require('dotenv').config()


const verifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        console.log(token)
        if (!token) {
            res.status(401).json({ message: "token is required" })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT)
            req.user = decoded;
            // console.log(decoded)
            next();
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: error })
        }

    } catch (error) {
        console.log(error)
        res.status(501).json({ error: error })
    }
}



module.exports = {
    verifyToken
}