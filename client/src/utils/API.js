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
                const responseToken = response.data.token;
                console.log('Message:', responseMessage, 'Token:', responseToken);
                const responseData = {
                    message: responseMessage,
                    token: responseToken
                }
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
        if(baseURL) {
            console.log("in API.getProduct", baseURL);
            let response = await axios.get(baseURL);
            return response;
        }
        else
            console.log("NO DATA TO SEND");
    },
}; 