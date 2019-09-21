const jwt = require('jsonwebtoken');
var moment = require('moment');

// Add the following JWT middleware to the routes we wish to authenticate.
module.exports = (req, res, next) => {
    // Step1: call next() if we did successfully authenticate
    // verify and return decoded value
    try {
        // Parse token, to remove Bearer
        const access_token = req.headers.authorization.split(' ')[1];
        console.log('check-auth:split token:', access_token);
        const decoded = jwt.verify(access_token, process.env.JWT_PRIVATE_KEY);
        
        // console.log("check-auth:Decoded token:", decoded);
        // add a new decoded token to the request
        req.userData = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
    

    //Step 2: call error if we did not succeed.

}