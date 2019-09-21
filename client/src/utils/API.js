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
                const responseMessage = response.data.message;
                const responseToken = response.data.access_token;
                const responseExpiration = response.data.expiration;
                const responseMoose = response.data.moose;
                // console.log('Message:', responseMessage, 'Token:', responseToken, 'responseExpiration', responseExpiration);
                const responseData = {
                    message: responseMessage,
                    access_token: responseToken,
                    expiration: responseExpiration,
                    exAt: responseMoose
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
    // /:productId
    updateProduct: async (baseURL, authToken, name, value) => {
        if (baseURL) {
            console.log("in API.updateProduct, baseURL:", baseURL, 'authToken:', authToken, 'name', name, 'value', value);

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
            // JSON.stringify( // );

        // const headers =

        const response = await axios.patch(baseURL, data, {
            headers:
            {
                Authorization: authToken,
                'Content-Type': 'application/json'
            }
        });

        return response;



    }
        else
            console.log("NO DATA TO SEND");
},
}; 