const onboard = async(userData, sql, req, res) => {
    const {first_name, last_name, current_age, current_location, gender, id} = userData;
    if(!first_name || !last_name || !current_age || !current_location || !gender) {
        return res.status(500).send({data: true, message: 'All fields are compulsory'})
    }
    try {
        const data = await  sql`INSERT INTO users(id, first_name, last_name, current_age, current_location, gender)
                            VALUES(${id}, ${first_name}, ${last_name}, ${current_age}, ${current_location}, ${gender})`;
        res.status(200).send({data: true, message: data})
    }
    catch (error){
        res.status(500).send({data: true, message: error})
        console.log(error)
    }
}
module.exports = {onboard}