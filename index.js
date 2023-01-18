const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 1212;
const dotenv = require("dotenv")
dotenv.config()
const postgres  = require('postgres');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const {login} = require('./methods/login');
const {signup} = require('./methods/signup')
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
app.listen(port, () => {
    console.log('server is listening')
})
