import axios from 'axios';
/****************************************************
 * API.js SHOULD NEVER CATCH ERROR, THAT SHOULD BE
 * HANDLED BY THE CONTAINER ON THE FRONTEND.  The 
 * API IS JUST FORWARDING THE HTTP REQUEST To Backend
 *****************************************************/
// Create Export Hash
export default {
    register: async (data) => {
            const post = await axios({
                method: 'post',
                url: '/user/register',
                data: data
            }); // post
            return post;
    },
    login: async (data) => {
        console.log("in login");

        let post = await axios({
            method: 'post',
            url: '/user/login',
            data: data
        });
        return post;
    },
    getProducts: async (baseURL) => {
        if (baseURL) {
            console.log("In API.getProducts", baseURL);
            let get = await axios.get(baseURL);
            return get;
        }
    },
    getProduct: async (baseURL) => {
        if (baseURL) {
            console.log("in API.getProduct", baseURL);
            let get = await axios.get(baseURL);
            return get;
        }
    },
    refreshTokens: async (url, accessToken, refreshToken, email, expired) => {
        console.log("API In RefreshToken: ", refreshToken);
        if (url) {
            // package the body
            const post = await axios({
                method: 'post',
                url,
                data: {
                    email,
                    expired
                },
                headers:
                {
                    Authorization: accessToken,
                    'Content-Type': 'application/json',
                    'refreshtoken': refreshToken
                }
            }); // post
            // console.log(post.data, post.status);
            /*************************************************************
             * Send HTTP Post Request
             ************************************************************/
            return post;
        }
    }, // catch

    // /:productId
    updateProduct: async (baseURL, authToken, refreshToken, name, value) => {
        if (baseURL) {
            console.log("in API.updateProduct, baseURL:", baseURL);
            console.log('authToken:', authToken);
            console.log('refreshToken', refreshToken);
            console.log('name', name, 'value', value);

            const data =
                [
                    {
                        'propName': 'name',
                        'value': name
                    },
                    {
                        'propName': 'value',
                        'value': value
                    }
                ];

            const patch = await axios.patch(baseURL, data, {
                headers:
                {
                    Authorization: authToken,
                    'Content-Type': 'application/json',
                    'refreshtoken': refreshToken
                }
            });
            return patch;
        }
    },
}; 