const express = require('express');
// const helmet = require("helmet");
const app = express();
const path = require('path');
// const bodyParser = require("body-parser");
const userRoutes = require('./routes/userRoute');
const postRoutes = require("./routes/postRoute");

require('dotenv').config()
require("./services/db");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use(bodyParser.json());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use(helmet());

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;