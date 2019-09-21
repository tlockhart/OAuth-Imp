const mongoose = require('mongoose');

//import oAuthAccessToken
const oAuthAccessToken = require('../generators/oAuthAccessToken');

//import user model
const User = require('../models/user');

//import momentjs
const moment = require('moment');

exports.user_signup = async (req, res, next) => {
    // Check if the user exists before inserting a document
    let user = await User.find({ email: req.body.email }).exec();

    if (user.length >= 1) {
        return res.status(409).json({
            message: 'Mail exists'
        });
    } else {
        // Generate user with hashed password
        let password = req.body.password;
        console.log("Password", password);

        try {
            let salt = 10;

            /************************
             ** Encrypt Password
             ***********************/
            const passwordHash = await oAuthAccessToken.getHash(password, salt);
            // console.log("Password Hash", passwordHash);

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: passwordHash
            });

            // try {
            let result = await user.save();
            console.log("user:", result);

            res.status(201).json({
                message: 'User created',
                id: result._id
            });
        } // try
        catch (error) {
            console.log("ERROR", error);
            return res.status(500).json({
                error: error
            });
        } // catch  
    } // else
};

exports.user_login = async (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(async user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            } else {

                // let time = moment().format('MM-DD-YYYY HH:mm:ss');
                let time = moment();
                console.log('time:', time);

                let startTime = moment(time);
                let endTime = moment(startTime).add(1, 'hours');
                console.log('startTime:', startTime, 'endTime:', endTime);

                let diff = endTime.diff(startTime, 'hours');
                console.log('Dif:', diff);
                    /*************************************************************
                     * Check if password sent matches what was saved to database
                     **************************************************************/
                    let passwordsEqual = await oAuthAccessToken.comparePasswords(req.body.password, user.password);

                    console.log("Passwords Equal:", passwordsEqual);
                    console.log("In comparePasswords");

                    let access_token;

                    // if passwords Equal
                    if (passwordsEqual) {
                        /*******************************************
                        * Returns signed JWT TOken
                        *******************************************/
                        access_token = oAuthAccessToken.createAccessToken(user.email, user._id);
                        console.log("TOKEN:", access_token);
                        return res.status(200).json({
                            message: 'Auth successful',
                            access_token: access_token,
                            expiration: endTime.toString(),
                            moose: 'moose'
                        });
                    } // if
                    // if passwords not Equal
                    else {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    } // else
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
            } // else
        })
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
        }); // catch
};
