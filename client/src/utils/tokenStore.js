// Import Server-Side Utilities:
// const API = require('./API');
import API from '../utils/API';

export default {
    refresh: async (url, accessToken, refreshToken, email, expired) => {
        console.log('In REFRESHTOKENS:', refreshToken);
        /*************************************************************
         *  package and send the body to the endpoint
         ************************************************************/
        let result = await API.refreshTokens(url, accessToken, refreshToken, email, expired);
        console.log("tokenStore: result = ", result);

        /*************************************************************
         * Send the results back to the calling program
         ************************************************************/
        return result;
    }
};