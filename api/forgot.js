const {sendMail} = require("../configs/send-mail");
const bcrypt = require("bcryptjs");
const forgot = async(email_id, sql, res) => {
    try {
        const temp_password = email_id + '-' + Math.random().toFixed(12).toString();
        const encryptedPassword = await bcrypt.hash(temp_password, 10);
        const data = await sql`UPDATE auth SET password=${encryptedPassword} WHERE email=${email_id}`
        console.log(data)
        await sendMail(email_id, temp_password, res)
    }
    catch (error){
        console.log(error)
        res.status(500).send({success: false, message: 'Something went wrong'})
    }

}

module.exports = {
    forgot
}