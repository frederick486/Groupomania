// const express = require('express');
// // const helmet = require("helmet");
// const path = require('path');
// const bodyParser = require("body-parser");
// const userRoutes = require('./routes/userRoute');
// const postRoutes = require("./routes/postRoute");

// require('dotenv').config()
// require("./services/db");

// const app = express();


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

// app.use(bodyParser.json());
// app.use(express.json());

// app.use('/images', express.static(path.join(__dirname, 'images')));
// // app.use('/images', express.static(__dirname, 'images'));


// // app.use(helmet());

// // routes
// app.use('/api/user', userRoutes);
// app.use('/api/post', postRoutes);


let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser')

const api = require('../backend/routes/postRoute')

// Connexion à la base de donnée
require('dotenv').config()
require("./services/db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/images', express.static('images'));

app.use('/api', api)

module.exports = app;
