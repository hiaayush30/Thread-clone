require('dotenv').config();
const express = require("express");
const { connectToDatabase } = require('./config/db');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('server is up and running')
})

connectToDatabase()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('server running on port ' + process.env.PORT);
        })
    })
