const jwt = require('jsonwebtoken');//application token
const bcrypt = require('bcrypt'); //application bcrypt

const User = require('../models/user');



exports.signup = async (req, res, next) => {
    let usermail = await User.findOne({email: req.body.email});
        if(!usermail)
        {
            bcrypt.hash(req.body.password, 10) //« saler » le mot de passe + 10
                .then(hash => {
                    const user = new User({
                    email: req.body.email,
                    password: hash
                    });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                    .catch(error => res.status(401).json({ error}));
                })
        }    
        else
        {
            return res.status(422).json({ message : "Adresse mail déja utilisée" })
        }};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(//nouveau token
                        { userId: user._id },//contient ID encodées dans le token
                        'RANDOM_TOKEN_SECRET',// encoder avec la clef "RANDOM_TOKEN_SECRET"
                        { expiresIn: '24h' }//durée de validité
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
  };