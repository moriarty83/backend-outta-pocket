// JWT middleware to control access based on user login status
require("dotenv").config({ path: "../.env"});
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    if (req.headers["authorization"]) {
        const token = req.headers["authorization"].split(" ")[1];
        const payload = await jwt.verify(token, process.env.jwtSecret);
        req.currentUser = payload._id;
        next();
    } else {
        res.sendStatus(403);
    }
};