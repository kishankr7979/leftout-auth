const jwt = require("jsonwebtoken");
const validateToken = (token) => {
    const KEY = process.env.TOKEN_KEY
    const decodeToken = jwt.verify(token, KEY);
    const current_time = new Date().getTime() / 1000;
    const expiry_time = decodeToken.exp;
    return +current_time <= +expiry_time;
}


module.exports = {validateToken};