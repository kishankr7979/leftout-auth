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
        const id = data[0].id
        const userData = await sql`SELECT * FROM users WHERE id = ${id}`
        if(decrypted){
            const KEY = process.env.TOKEN_KEY
            let token = jwt.sign({email: emailId, user_id: id}, KEY, {expiresIn: "2h"})
            return  res.status(200).send({result: true, email: data[0].email,
                jwt_token: token, message:'login success',
                user_data: userData,
                user_id: id
            })
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