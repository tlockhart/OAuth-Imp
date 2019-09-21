const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getHash = ((password, salt) => {
    return new Promise((resolve, reject) => {
        console.log("IN PROMISE");
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                // console.log('Err:', err);
                reject(err);
            }
            else {
                // console.log('Hash:', hash);
                resolve(hash);
            }
        }); // bcrypt
    });  // promise 
});

exports.comparePasswords = ((inputPassword, storedPassword) => {
    return new Promise((resolve, reject) => {
        console.log("IN PROMISE");
        bcrypt.compare(inputPassword, storedPassword, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        }); // bcrypt
    });  // promise  
});

const accessExpire = 1;

// Create a new access_token
exports.createAccessToken = (email, id) => {
    return jwt.sign(
        {
            email: email,
            userId: id
        },
        process.env.JWT_PRIVATE_KEY,
        {
            expiresIn: `${accessExpire}h`
        }
    );
};

// Create a new access_token
exports.createRefreshToken = (email, id) => {
    return jwt.sign(
        {
            email: email,
            userId: id
        },
        process.env.JWT_PRIVATE_KEY
        // {
        //     expiresIn: "5h"
        // }
    );
};