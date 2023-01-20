const getUserDetails = async(id, sql, res) => {
    if(!id) res.status(500).send({result: false, message: 'id is required'})
    const userData = await sql`SELECT * FROM users WHERE id = ${id}`
    if(userData.length === 0) return res.status(201).send({result: false, message: 'user data not found'})
    res.status(200).send({result: true, data: userData[0]})
}

module.exports = {getUserDetails}