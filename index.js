const express = require("express");
const app = express()
const router = require('./route')
const connectDb = require('./dbConnection')

// require("dotenv").config()
require("dotenv").config()
const cors = require("cors")
connectDb()

const PORT= process.env.PORT

app.use(express.json())
app.use('/',router)

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Server is runnig on the port ${PORT}`)
});
