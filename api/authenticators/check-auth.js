const jwt = require('jsonwebtoken');

// Add the following JWT middleware to the routes we wish to authenticate.
module.exports = (req, res, next) => {
    // Step1: call next() if we did successfully authenticate
    // verify and return decoded value
    try {
        // Parse token, to remove Bearer
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        // const decoded = jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY);
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
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