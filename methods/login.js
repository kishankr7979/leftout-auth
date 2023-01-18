const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const login = async(emailId, password, sql, req, res) => {
    if(!emailId || !password) {
        return res.status(500).send({data: true, message: 'email and password is mandatory'})
    }
    try {
        const data = await  sql`SELECT * FROM auth WHERE email = ${emailId}`;
        if(data.length === 0) return res.status(401).send({result: true, message: 'invalid credentials'})
        const decrypted = await bcrypt.compare(password, data[0].password)
        if(decrypted){
            const KEY = process.env.TOKEN_KEY
            let token = jwt.sign({email: emailId}, KEY, {expiresIn: "2h"})
            return  res.status(200).send({result: true, data: data[0].email, jwt_token: token, message:'login success'})
        }
        res.status(401).send({result: true, message: 'invalid credentials'})
    }
    catch (error){
        console.error(error)
        res.status(500).send({result: true, message: error})
        console.log(error)
    }
}
module.exports = {login}