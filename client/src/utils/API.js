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
        console.log("in login- Data:", data);
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
    // products list GET
    getProducts: async (baseURL) => {
        if (baseURL) {
            console.log("In API.getProducts", baseURL);
            let get = await axios.get(baseURL, {
                headers:
                {
                    Accept: "application/json,application/xml;q=0.9,*/*;q=0.8"
                }
            });
            // let get = await axios.get(baseURL);
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
    // 01/03/2020:
    getUserInfo: async (baseURL, email) => {
        
        if ( email && baseURL ) {
            let response = await axios.get(baseURL, email);
            console.log("APIGETUSERINFO: "+JSON.stringify(response));
            return response;
        }
        else {
            console.log("API.email:", email);
            console.log("API.baseURL:", baseURL);
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
    deleteProduct: async (baseURL, authToken, refreshToken, expired, email) => {
        if (baseURL) {
            const data = {
                expired: expired,
                email: email,
            };
            console.log("DATA:", JSON.stringify(data));
            console.log(`API: GOING TO DELETE ROUTE: ${baseURL}`);
            console.log(`authtoken: ${authToken}, refreshtoken: ${refreshToken}, expired: ${expired}, email: ${email}, URL: ${baseURL}`);
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
                    },
                    data: data
                });
            /*************************************************************
             * Send the results back to the calling program
             ************************************************************/
            // console.log("REMOVE=", remove);
            return remove;
        }

    },

    // /:productId
    updateProduct: async (baseURL, authToken, refreshToken, name, value, image, expired, email) => {
        if (baseURL) {
            console.log("in API.updateProduct, baseURL:", baseURL);
            console.log('authToken:', authToken);
            console.log('refreshToken', refreshToken);
            console.log('name:', name, 'value:', value, 'expired:', expired );

            const data =
                [
                    // first set
                    {
                        'propName': 'name',
                        'value': name
                    },
                    // second set
                    {
                        'propName': 'value',
                        'value': value
                    },
                    // third set
                    {
                        'propName': 'expired',
                        'value': expired
                    },
                    // fourth set
                    {
                        'propName': 'email',
                        'value': email
                    },
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
    // insertCloudinary
    insertCloudinary: async (baseURL, imageObj) => {
        if (imageObj) {
            console.log ("In insertCloudinary", baseURL);
            // console.log ("#ImageObj:", imageObj);

            //create formData from BASE64 file
            const formData = new FormData();
            formData.append('file',imageObj);

            const config = {
                headers:
                {
                    'Content-Type': "multipart/form-data"
                }
            };

            // NEW POST WITH FORMDATA
            const post = await axios.post(baseURL, formData, config)
            return post;
        }
    },
    // /:productId
    insertProduct: async (baseURL, id,
        email, authToken, refreshToken, name, value, image, expired) => {
    // insertProduct: async (baseURL, authToken, refreshToken, name, value, imageUrl, imageFile, imageSrc) => {
        var base64Image = image.base64Str;
        if (baseURL) {
            // console.log("in API.insertProduct, baseURL:", baseURL);
            // console.log("API: INSERT TOKEN: INSERT PRODUCT IMAGE:", "*", imageUrl, "*");
            console.log('authToken:', authToken);
            console.log('refreshToken', refreshToken);
            // console.log("API: INSERT TOKEN:", 'name:', name, ',value:', value,'base64', image.base64Str);

            const data =
                [
                    {
                        'propName': 'name',
                        'value': name
                    },
                    {
                        'propName': 'value',
                        'value': value
                    },
                    {
                        'propName': 'productImage',
                        'value': base64Image
                    },
                    {
                        'propName': 'productId',
                        'value': id
                    },
                    {
                        'propName': 'authToken',
                        'value': authToken
                    },
                    {
                        'propName': 'refreshToken',
                        'value': refreshToken
                    },
                    {
                        'propName': 'email',
                        'value': email
                    },
                    {
                        'propName': 'expired',
                        'value': expired
                    },
                ];
            /*************************************************************
             *  package and send the body to the endpoint
             ************************************************************/
            const insert = await axios.post(baseURL, data, {
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
            return insert;
        }
    },
}; 