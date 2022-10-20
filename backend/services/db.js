// Connection à MongoDB
const mongoose = require("mongoose");
const password = process.env.PASSWORD;
const login = process.env.LOGIN;

// URI de Atlas MongoDB : Groupomania cluster
const uri = `mongodb+srv://${login}:${password}@groupomania-cluster.jhzkkyb.mongodb.net/?retryWrites=true&w=majority`

mongoose
    .connect(uri)
    .then(() => console.log("Connected to Mongo groupomania-cluster"))
    .catch((err) => console.log("failed to connect to Mongo cluster:", err))

module.exports = {mongoose}