const jwt = require('jsonwebtoken');
const { get } = require('mongoose');
const User = require('../models/userModel');

 
module.exports = async (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
    //    const token = req.body.token;
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       const user = await User.findById(userId);

       req.auth = {
           userId: userId,
           isAdmin: user.pseudo === "administrateur" // <<< Condition
       };
       
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};