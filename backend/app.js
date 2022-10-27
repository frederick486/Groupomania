const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoute');
const postRoutes = require("./routes/postRoute");

// Connexion à la base de donnée
require('dotenv').config()
require("./services/db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// // routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/images', express.static('images'));

module.exports = app;
