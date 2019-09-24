import axios from 'axios';

// Create Export Hash
export default {
    register: async (data) => {
        try {
            console.log("in register");

            const response = await axios({
                method: 'post',
                url: '/user/signup',
                data: data
            }); // response

            if (response.status == 201) {
                const responseMessage = response.data.message;
                console.log('Message:', responseMessage);
                return responseMessage;
            }

        } catch (error) {
            console.log('ERROR:', error);
        }
    },
    login: async (data) => {
        try {
            console.log("in login");

            const response = await axios({
                method: 'post',
                url: '/user/login',
                data: data
            }); // response

            if (response.status == 200) {
                // const responseMessage = response.data.message;
                // const responseAccessToken = response.data.access_token;
                // const responseExpiration = response.data.expiration;
                let { message, access_token, refresh_token, expiration, email } = response.data;
                // const responseMoose = response.data.moose;
                // console.log('Message:', responseMessage, 'Token:', responseToken, 'responseExpiration', responseExpiration);
                const responseData = {
                    message,
                    access_token,
                    expiration,
                    refresh_token,
                    email
                };
                return responseData;
            }

        } catch (error) {
            console.log('ERROR:', error);
        }
    },
    getProducts: async (baseURL) => {
        if (baseURL) {
            console.log("In API.getProducts", baseURL);
            let response = await axios.get(baseURL);
            return response;
        }
        else
            console.log("NO DATA TO SEND");
    },

    getProduct: async (baseURL) => {
        if (baseURL) {
            console.log("in API.getProduct", baseURL);
            let response = await axios.get(baseURL);
            return response;
        }
        else
            console.log("NO DATA TO SEND");
    },
    refreshTokens: async (url, accessToken, refreshToken, email) => {
        // try {
            console.log("API: in login");
            console.log("API RefreshToken: ", refreshToken);

            // package the body
            const response = await axios({
                method: 'post',
                url,
                data: {
                    accesstoken: accessToken,
                    refreshtoken: refreshToken,
                    email
                }
            }); // response

            if (response.status == 200) {
                let { message, access_token, refresh_token, email } = response.data;

                const responseData = {
                    message,
                    access_token,
                    refresh_token,
                    email
                };
                return responseData;
            }
            else {
                console.log("ERROR", response.message);
                return response.status(401).json({
                    message: response.message
                });
            }
        }, // catch

        // /:productId
        updateProduct: async (baseURL, authToken, refreshToken, name, value) => {
            if (baseURL) {
                console.log("in API.updateProduct, baseURL:", baseURL, 'authToken:', authToken, 'refreshToken', refreshToken, 'name', name, 'value', value);

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

                const response = await axios.patch(baseURL, data, {
                    headers:
                    {
                        Authorization: authToken,
                        'Content-Type': 'application/json',
                        'refreshtoken': refreshToken
                    }
                });
                return response;

            } // if
            else
                console.log("NO DATA TO SEND");
        },
}; 