const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// route
require('./routes/todo')(app);


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {

        app.listen(process.env.PORT, () => {
            // console.log(`Server running at http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => {
        // console.log(err);
    });