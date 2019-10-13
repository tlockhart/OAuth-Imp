import axios from 'axios';
/****************************************************
 * API.js SHOULD NEVER CATCH ERROR, THAT SHOULD BE
 * HANDLED BY THE CONTAINER ON THE FRONTEND.  The 
 * API IS JUST FORWARDING THE HTTP REQUEST To Backend
 *****************************************************/
// Create Export Hash
export default {
    register: async (data) => {
        /*************************************************************
         *  package and send the body to the endpoint
         ************************************************************/
            const post = await axios({
                method: 'post',
                url: '/user/register',
                data: data
            }); // post
            /*************************************************************
             * Send the results back to the calling program
             ************************************************************/
            return post;
    },
    login: async (data) => {
        console.log("in login");
        /*************************************************************
         *  package and send the body to the endpoint
         ************************************************************/
        let post = await axios({
            method: 'post',
            url: '/user/login',
            data: data
        });
        /*************************************************************
         * Send the results back to the calling program
         ************************************************************/
        return post;
    },
    // products list
    getProducts: async (baseURL) => {
        if (baseURL) {
            console.log("In API.getProducts", baseURL);
            let get = await axios.get(baseURL);
            return get;
        }
    },
    // individual product
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
            /*************************************************************
             *  package and send the body to the endpoint
             ************************************************************/
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
             * Send the results back to the calling program
             ************************************************************/
            return post;
        }
    }, // catch

    // /:productId
    deleteProduct: async (baseURL, authToken, refreshToken, expired) =>
    {
        if (baseURL){
            const data = {
                expired
            };
            console.log(`API: GOING TO DELETE ROUTE: ${baseURL}`);
            console.log(`authtoken: ${authToken}, refreshtoken: ${refreshToken}, expired: ${expired}`);
            /*************************************************************
             *  package and send the body to the endpoint
             ************************************************************/
            const remove = await axios.delete(
                baseURL, 
                {
                    headers:
                    {
                        Authorization: authToken,
                        'Content-Type': 'application/json',
                        'refreshtoken': refreshToken
                    }
                },
                data);
            /*************************************************************
             * Send the results back to the calling program
             ************************************************************/
            console.log("REMOVE=", remove);
            return remove; 
        }

    },

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
            /*************************************************************
             *  package and send the body to the endpoint
             ************************************************************/
            const patch = await axios.patch(baseURL, data, {
                headers:
                {
                    Authorization: authToken,
                    'Content-Type': 'application/json',
                    'refreshtoken': refreshToken
                }
            });
            /*************************************************************
             * Send the results back to the calling program
             ************************************************************/
            return patch;
        }
    },
}; 