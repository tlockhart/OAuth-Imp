const oAuthAccessToken = require('../generators/oAuthAccessToken');
const jwt = require('jsonwebtoken');
// var moment = require('moment');

// Add the following JWT middleware to the routes we wish to authenticate.
module.exports = (req, res, next) => {
    // Step1: call next() if we did successfully authenticate
    // verify and return decoded value
    try {
        let decoded;
        // console.log("REQ:",req);
        const refresh_token_header = req.headers.refreshtoken;
        const access_token_header = req.headers.authorization;
        const refresh_token_body = req.body.refreshtoken;
        const access_token_body = req.body.accesstoken;
        const expired = req.body.expired;
        console.log(`check-auth:refresh_token_body: ${refresh_token_body}`);
        console.log('check-auth:access_token_body: ', access_token_body);
        console.log('check-auth:refresh_token_header: ', refresh_token_header, 'isrefreshEqNoRefresh', refresh_token_header === 'norefresh');
        console.log('check-auth:access_token_header: ', access_token_header);
        console.log('check-auth:expired: ', expired, 'isTrue', expired == true);
        

        // When a refresh is needed time has expired, refreshtoken and accesstoken sent in the body.  Verify the refresh_token_body
        // Note: The if the refresh token has expired the user will have to relogin (5hs)
        if(expired == true) {
            console.log("check-auth: refresh_token: IF");
            decoded = oAuthAccessToken.verify(refresh_token_body, process.env.JWT_PRIVATE_KEY);
            console.log("CheckAuth: Refresh Token verified: IF: EXPIRED =", expired);
        }
        // If time has not expired then the refresh_token is set to norefresh and accesstokens is sent in the access_token_header and refresh_token_header
        else if(refresh_token_header === 'norefresh' && access_token_header) {
            console.log("check-auth: valid access_token_header refresh_token_header norefresh: ELSE IF2");
            const access_token = access_token_header.split(' ')[1];
            console.log("SPLIT", access_token);
            decoded = oAuthAccessToken.verify(access_token, process.env.JWT_PRIVATE_KEY);
            console.log("CheckAuth: Refresh Token verified");
        } 
        else {
            console.log("check-auth: refresh_token: ELSE");
            throw new Error("Unauthorized Use");
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};