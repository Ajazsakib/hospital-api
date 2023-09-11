const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1/hospital-api');

const db = mongoose.connection;

db.once('open', function ()
{
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;