const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 1212;
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken");
dotenv.config()
const postgres  = require('postgres');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const {login} = require('./methods/login');
const {signup} = require('./methods/signup');
const {onboard} = require('./methods/onboard');
const {validateToken} = require('./methods/validate-token');
const {getUserDetails} = require('./methods/get-user-details');
const sql = postgres(URL, { ssl: 'require' });
(async() => {
    const result = await sql`select version()`;
    console.log(result);
})()
app.use(cors({
    origin: '*'
}));
app.use(bodyParser());

app.post('/signup', (req, res) => {
    const {email_id, password} = req.body
    signup(email_id, password, sql, req, res)
})

app.post('/login', (req, res) => {
    const {email_id, password} = req.body
    login(email_id, password, sql, req, res)
})

app.post('/onboard', (req, res) => {
    const token = req.headers.authorization.split(' ');
    if(!token){
        return res.status(401).json({success:false, message: "Authentication is required"});
    }
    const validToken = validateToken(token[1]);
    if(!validToken){
        return res.status(401).json({success:false, message: "Authentication is required"});
    }
    onboard(req.body, sql, req, res)
})
app.get('/user/detail/:id', (req, res) => {
    const {id} = req.params;
    const token = req.headers.authorization.split(' ');
    if(!token){
        return res.status(401).json({success:false, message: "Authentication is required"});
    }
    const validToken = validateToken(token[1]);
    if(!validToken){
        return res.status(401).json({success:false, message: "Authentication is required"});
    }
    getUserDetails(id, sql, res)
})

app.listen(port, () => {
    console.log('server is listening')
})
