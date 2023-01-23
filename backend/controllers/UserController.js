const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const fs = require("fs"); //<<< Permet de modifier le système de fichiers


exports.signup = (req, res, next) => {   
    const url = req.protocol + '://' + req.get('host')

    if(req.body.password.length < 6) {
        res.status(400).json( {message: 'le password doit contenir au moins 6 caractères'} );
    } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {        
            const user = new User({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
                profileImgUrl:  req.file != null ?
                 url + '/images/profile/' + req.file.filename : 
                 url + '/images/default/noAvatar.png'
            });
            user.save()
                .then(() => res.status(201).json( 
                    // { message: 'Utilisateur crée !'},
                    {   userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                        pseudo: user.pseudo,
                        profileImgUrl: user.profileImgUrl                    
                    }
                ) )
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
}; 


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(user === null) {
            res.status(401).json( { message: 'Paire identifiant / mot de passe incorrecte' } );
        }else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    res.status(401).json( {message: 'Paire identifiant / mot de passe incorrecte'} );
                }else {
                    res.status(200).json( {
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                        pseudo: user.pseudo,
                        profileImgUrl: user.profileImgUrl                    
                    });
                }
            })
            .catch(error => {
                res.status(500).json( { error });
            })
        }
    })
    .catch(error => {
        res.status(500).json( { error } );
    })
};

// get all users
module.exports.getAllUser = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  };


// delete a user
module.exports.deleteUser = async (req, res) => {   
    const userId = req.body.userId;
    const isAdmin = req.auth.isAdmin;
    // console.log("userId", req.body.userId)

    try {
        const user = await User.findById(userId);
        // res.json(user)
        // const userId-BDD = user._id.toString()
        const userId_BDD = user._id.valueOf()
        
        // if(userId === req.auth.userId || req.auth.isAdmin) {
        if(isAdmin || userId === userId_BDD) {

            // console.log("userId_BDD : ", userId_BDD)

            const filename = user.profileImgUrl.split('/images/profile/')[1]
            fs.unlink(`images/profile/${filename}`, async () => {
                await user.deleteOne();
                res.status(200).json("Compte supprimé")
            })

        } else {
            res.status(403).json("Action interdite");
        }

    } catch (error) {
      res.status(500).json(error);
    }
  };