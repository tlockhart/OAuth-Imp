const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//import user model
const User = require('../models/user');

exports.user_signup = async (req, res, next) => {
    // Check if the user exists before inserting a document
    let user = await User.find({ email: req.body.email }).exec();
    if (user.length >= 1) {
        return res.status(409).json({
            message: 'Mail exists'
        });
    } else {
        let salt = 10;
        // Generate user with hashed password
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });

                try {
                    let result = await user.save();
                    console.log("user:", result);
                    res.status(201).json({
                        message: 'User created',
                        id: result._id
                    })
                } catch (err) {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                    });
                }
            } // success
        }); // bcrypt
    } // else
};

exports.user_login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        // .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            } else {
                // Check if password sent matches what was saved to database
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        },
                            process.env.JWT_PRIVATE_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );

                        // Update document with token
                        // User.where({email: user.email}).updateOne({token: token})
                        // .exec()
                        user.updateOne({ token: token })
                            .then((result) => {
                                console.log("token inserted", result);
                            })
                            .catch(error => {
                                console.log("error:", error);
                            });

                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        });

                    } // if
                    res.status(401).json({
                        message: 'Auth failed'
                    });
                });
            } // else
        }) //find user
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
};

exports.user_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "user deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
};