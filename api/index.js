const {login} = require('./login');
const {signup} = require('./signup');
const {getUserDetails} = require('./get-user-details');
const {onboard} = require('./onboard')
const {forgot} = require('./forgot');
const {resetPassword} = require('./reset-password')
module.exports = {
    login,
    signup,
    getUserDetails,
    onboard,
    forgot,
    resetPassword,
}
