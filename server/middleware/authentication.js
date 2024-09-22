const jwt = require('jsonwebtoken');
const User = require('../model/Useschema');

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // If the Authorization header in the HTTP request looks like this:
        // Authorization: Bearer abcdefghijklmnopqrstuvwxyz123456
        // Then:
        // req.headers.authorization.split(" ") results in ["Bearer", "abcdefghijklmnopqrstuvwxyz123456"].
        // req.headers.authorization.split(" ")[1] extracts the token "abcdefghijklmnopqrstuvwxyz123456".
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) {
            throw new Error('User not found');
        }

        req.token = token;
        req.user = rootUser;
        req.userID = rootUser._id;

        next();// this is middleware
    } catch (err) {
        res.status(401).send('Unauthorized: No token provided');
        console.log(err);
    }
}

module.exports = authentication;