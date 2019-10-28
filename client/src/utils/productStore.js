import API from './API';

// retrieves all products from the database
export let retrieveUpdatedProductList = async () => {
    /***********************************/
    /*********************
     * STEP9: Get the new updated productsLis
     ********************/
    try {
        let res = await API.getProducts('/products');
        let data = res.data.products;
        console.log("productStore:retrieveUpdatedProductList data =", data);
        return data;
    } catch (err) {
        console.log("ERROR", err);
    }
};

export let deleteProduct = async (url, accessToken, refresh_token, expired) => {
    console.log('IN DELETE PRODUCT CALL');
    console.log(`DATA URL: ${url}, ATOKENT: ${accessToken}, RTOKEN: ${refresh_token}, EXPIRED: ${expired}`);
    let response = await API.deleteProduct(url, accessToken, refresh_token, expired);
    console.log("deleteProduct: ", response);

    // Return response from deleteProduct on the backend
    return response;
};

// Define Call to Server Side utils to post body to the backend server:
export let updateProduct = async (url, authToken, refreshToken, expiration = null, name, value) => {
    console.log('IN UPDATE PRODUCT CALL');
    let updateResponse = await API.updateProduct(url, authToken, refreshToken, name, value);

    // Return results to the calling program
    return updateResponse;
};

// Define Call to Server Side utils to post body to the backend server:
export let insertProduct = async (url, authToken, refreshToken, expiration = null, name, value) => {
    console.log('IN INSERT PRODUCT CALL');
    let insertResponse = await API.updateProduct(url, authToken, refreshToken, name, value);

    // Return results to the calling program
    return insertResponse;
};

// Delete an item from the db
export let performDBAction = async (productId, refresh_token, authToken, expired, name = null, value = null, url, cb) => {
    console.log("IN IF");
    console.log('ProductUpdateContainer:refresh_token = ', refresh_token);

    /************************************
     *  STEP8: Call method to delete product
     ***********************************/
    try {
        // Set Refresh Token Temporarly to norefresh to clear checkAuthi
        let refresh_token = 'norefresh';
        
        console.log("BEFORE UPDATE CALLED");

        let response = await cb(url + productId, authToken, refresh_token, expired, name, value);
        console.log("AFTER UPDATE CALLED");

        console.log("RESPONSEMESSAGE ", JSON.stringify(response), "STATUS", response.status);

        if (response.status == 200) {
            /************************************
             *  10142019: Set the global variable to  
             *  the updated ProductsListContainer
             ***********************************/

            let productsList = await retrieveUpdatedProductList();
            console.log("retrievedUpdatedProductList:", productsList);
            // products = {
            //     name:"BS0",
            //     value:0,
            //     _id:"5da082c31c9d440000576976",
            //     productImage:"uploads/1570591284561_tlockhart.png"
            // };

            let data = {
                message: "Action Completed",
                refresh_token: "norefresh",
                isUserAuthorized: true,
                hasTimeExpired: false,
                productsList: productsList
            };

            return data;
        }
    }
    catch (err) {
        console.log('err:', err.message);
        let data = {
            message: err.message
        };
        return data
    }
};
