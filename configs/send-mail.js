const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendMail = async(email_id, temp_password, res) => {
    const resetLink = `http://localhost:3000/reset?temp=${temp_password}`
    const msg = {
        to: email_id,
        from: 'undefined.kishan@gmail.com',
        subject: 'Reset you leftout password',
        text: 'Click on the below link to reset',
        dynamicTemplateData: {
                link: resetLink
            },
        templateId: 'd-773c1f74e25142a3b5b1bea414172791',
        trackingSettings: {
            clickTracking: {
                enable: false,
                enableText: false
            },
            openTracking: {
                enable: false
            }
        }
    }
    try {
        await sgMail.send(msg)
        res.status(200).send({success: true, message: 'reset email sent'})
    }
    catch (error){
        res.status(500).send({success: false, message: 'something went wrong'})
        console.log(error)
    }
}

module.exports = {sendMail}