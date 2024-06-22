const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


  
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI);

// route
require('./routes/todo')(app);

app.get('/', (req, res) => {
    res.send('Hello server');

});

app.get("*", (req, res) => {
    res.send('404 page not found');
});




    app.listen(process.env.PORT||8080, () => {
        // console.log(`Server running at http://localhost:${process.env.PORT}`);
    });