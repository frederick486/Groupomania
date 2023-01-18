const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const fs = require("fs"); //<<< Permet de modifier le système de fichiers


exports.signup = (req, res, next) => {   
    const url = req.protocol + '://' + req.get('host')

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


// delete a user
module.exports.deleteUser = async (req, res) => {

    try {
        const user = await User.findById(req.auth.userId);

        // const userId = user._id.toString()
        const userId = user._id.valueOf()

        console.log("req.auth.isAdmin => ", req.auth.isAdmin)
        console.log("req.auth.userId => ", req.auth.userId)
        console.log("userId => ", userId)
        
        if(userId === req.auth.userId || req.auth.isAdmin) {
            const filename = user.profileImgUrl.split('/images/profile/')[1]
            fs.unlink(`images/profile/${filename}`, async () => {
                await User.findByIdAndDelete(req.auth.userId);
                res.status(200).json("Account has been deleted succefuly")
            })
        } else {
            res.status(403).json("Action interdite");
        }

    } catch (error) {
      res.status(500).json(error);
    }
  };