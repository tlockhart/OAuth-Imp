// Import Server-Side Utilities:
// const API = require('./API');
import API from '../utils/API';

export default {
    refresh: async (url, accessToken, refreshToken, email, expired) => {
        console.log('In REFRESHTOKENS:', refreshToken);
        let result = await API.refreshTokens(url, accessToken, refreshToken, email, expired);
        console.log("tokenStore: result = ", result);
        
        // Returns results to the calling program.
        return result;       
    }
};