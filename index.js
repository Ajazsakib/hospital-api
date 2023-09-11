const express = require("express")
const db = require("./config/mongoose")
const bodyParser = require('body-parser');

const app = express()

const PORT = 9000

app.use(bodyParser.json());

// use express router
app.use('/', require('./routes'));

app.listen(PORT, function (err)
{
    if (err) {
        console.log("Error in creating server", err)
        return
    }
    console.log("Server Running on Port", PORT)
})