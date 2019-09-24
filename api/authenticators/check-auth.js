const oAuthAccessToken = require('../generators/oAuthAccessToken');
const jwt = require('jsonwebtoken');
// var moment = require('moment');

// Add the following JWT middleware to the routes we wish to authenticate.
module.exports = (req, res, next) => {
    // Step1: call next() if we did successfully authenticate
    // verify and return decoded value
    try {
        let decoded;
        const refresh_token_header = req.headers.refreshtoken;
        const access_token_header = req.headers.authorization;
        const refresh_token_body = req.body.refreshtoken;
        console.log(`check-auth:requestBody.refreshtoken: ${refresh_token_body}`);
        console.log('check-auth:req.headers.refreshtoken: ', refresh_token_header, 'isrefreshEqNoRefresh', refresh_token_header === 'norefresh');
        console.log('check-auth:req.headers.accesstoken: ', access_token_header);

        // Verify refresh token when access token time has expired, token sent in the body
        if( refresh_token_body && refresh_token_header != "norefresh") {
            console.log("check-auth: refresh_token != refresh");

            decoded = oAuthAccessToken.verify(refresh_token_body, process.env.JWT_PRIVATE_KEY);
            console.log("CheckAuth: Refresh Token verified");
        } // if
        
        else if (refresh_token_header === 'norefresh') {
            // Run a reguler access check because acces token is not required, token is sent in the header
            console.log('In no refresh');
            // Parse token, to remove Bearer
            const access_token = req.headers.authorization.split(' ')[1];
            console.log('check-auth:split token:', access_token);
            decoded = oAuthAccessToken.verify(access_token, process.env.JWT_PRIVATE_KEY);
            
            console.log("check-auth:Decoded token:", decoded);
            // add a new decoded token to the request
            // req.userData = decoded;
        }  
        else {
            throw new Error("Unauthorized Use");
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};