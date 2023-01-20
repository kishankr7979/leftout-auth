const bcrypt = require("bcryptjs");
const resetPassword = async(email_id, password, new_password,sql, res) => {
    try {
        const data = await  sql`SELECT * FROM auth WHERE email = ${email_id}`;
        if(data.length === 0) return res.status(401).send({result: true, message: 'invalid credentials'})
        const decrypted = await bcrypt.compare(password, data[0].password)
        const encryptNewPassword = await bcrypt.hash(new_password, 10);
        if(decrypted){
            const data = await sql`UPDATE auth SET password=${encryptNewPassword} WHERE email=${email_id}`
            console.log(data);
            res.status(200).send({success: true, message: 'Password updated successfully'})
        }
    }
    catch (error){
        console.log(error)
        res.status(500).send({success: false, message: 'something went wrong'})
    }

}

module.exports = {
    resetPassword
}