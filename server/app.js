const dotenv = require("dotenv");
const express = require("express");
const app = express();   

dotenv.config({ path: './config.env' });// which connect the config file to app.js
require('./db/conn');// this should be the after of dotenv.config
app.use(express.json()); // This is important to parse JSON bodies     // this is new 
app.use(require("./router/auth"));


app.get('/', (req, res) => {
    res.send("hello world");
})

app.get('/senddata',(req,res)=>{
    res.send("hello")
})

app.get('/register',(req,res)=>{
    res.send("hello world");
})

app.listen(9000, () => {
    console.log("happy to connect");
})