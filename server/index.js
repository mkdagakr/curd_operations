const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config({path: './config.env'});

const app = express();

const port = process.env.PORT;

// connection with database
const mongoURI = process.env.DATABASE;

mongoose.connect(mongoURI).then(()=>{
    console.log('connected successfully');
}).catch((err)=>{console.log(err)})

app.use(cors());
app.use(express.json());

// routes
app.use(require('./routes/auth'));
app.use(require('./routes/emp'));


// server listening
app.listen(port, ()=>{
    console.log("your server is running on port: "+port);
})