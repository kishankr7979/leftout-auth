const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const signup = async(emailId, password, sql, req, res) => {
    if(!emailId || !password) {
        return res.status(500).send({data: true, message: 'email and password is mandatory'})
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const uuid = uuidv4();
        const data = await   sql`INSERT INTO auth(email, password, id) VALUES(${emailId}, ${encryptedPassword}, ${uuid})`;
        res.status(200).send({data: true, message: data})
        console.log(data)
    }
    catch (error){
        res.status(500).send({data: true, message: error})
        console.log(error)
    }
}
module.exports = {signup}