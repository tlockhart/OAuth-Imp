import API from './API';

// retrieves all products from the database
export let retrieveUpdatedProductList = async (email) => {
    /***********************************/
    /*********************
     * STEP9: Get the new updated productsLis
     ********************/
    const baseURL = '/api/products';
    try {
        let res = await API.getProducts(baseURL);
        let data = res.data.products;
        console.log("productStore:retrieveUpdatedProductList data =", data);
        return data;
    } catch (err) {
        console.log("ERROR", err);
    }
};
//url, authToken, refreshToken, name, value, image
export async function deleteProduct(
    url,
    productId,
    email,
    accessToken,
    refresh_token,
    expired,
    name = null,
    value = null,
    imageSrc = null
) {
    console.log('IN DELETE PRODUCT CALL');
    console.log(`DATA URL: ${url}, ATOKENT: ${accessToken}, RTOKEN: ${refresh_token}, EXPIRED: ${expired}, EMAIL: ${email}`);

    let response = await API.deleteProduct(url, accessToken, refresh_token, expired, email);

    /*NEVER COMES BACK*/
    console.log("deleteProduct: ", response);

    // Return response from deleteProduct on the backend
    return response;
}

// Define Call to Server Side utils to post body to the backend server:
export let updateProduct = async (
    url,
    id,
    email,
    authToken,
    refreshToken,
    expired,
    name,
    value,
    image = null) => {
    console.log('ProductStore:IN UPDATE PRODUCT CALL', "expired", expired);
    let updateResponse = await API.updateProduct(url, authToken, refreshToken, name, value, image, expired, email);

    // Return results to the calling program
    return updateResponse;
};

// Cloudinary
export let insertCloudinary = async (baseURL, imageObj) => {
    console.log("productStore.insertCloudinary called, Name:", imageObj.imageName);
    const cloudinaryResponse = await API.insertCloudinary(baseURL, imageObj);

    return cloudinaryResponse;
};

// Define Call to Server Side utils to post body to the backend server:
export async function insertProduct(
    url,
    id,
    email,
    authToken = null,
    refreshToken = null,
    expired = null,
    name,
    value,
    image) {
    console.log('IN INSERT PRODUCT CALL');
    console.log("Insert Product Image:", image);
    let insertResponse = await
        API.insertProduct(url, id, email, authToken, refreshToken, name, value, image, expired);

    // Return results to the calling program
    return insertResponse;
}

export let performDBAction = async (
    productId = '',
    email,
    authToken,
    refreshToken,
    expired,
    name = null,
    value = null,
    image = null,
    url,
    cb) => {

    console.log("ProductStore: PerformDbAction:", "email:", email);

    console.log('ProductUpdateContainer:refresh_token = ', refreshToken);

    /************************************
     *  STEP8: Call method to delete product
     ***********************************/
    try {
        // Set Refresh Token Temporarly to norefresh to clear checkAuthi
        let refresh_token = 'norefresh';

        console.log("BEFORE UPDATE CALLED");
        console.log("PerformDBAction Image:", image);
        let response = await cb(
            url + productId,
            productId,
            email,
            authToken,
            refreshToken,
            expired,
            name,
            value,
            image
        );

        console.log("AFTER UPDATE CALLED");

        console.log("RESPONSEMESSAGE ", JSON.stringify(response), "STATUS", response.status);

        if (response.status === 200 || response.status === 201) {
            /************************************
             *  10142019: Set the global variable to  
             *  the updated ProductsListContainer
             ***********************************/

            let productsList = await retrieveUpdatedProductList(email);
            console.log("retrievedUpdatedProductList:", productsList);

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

/************************************
stageDBActionis an integrator that passes an id and a callback function corresponding to the desired db action to be performed, and retrieves the new data and updates the state variables, to be displayed to screen. 
************************************/
export let stageDBAction = async (
    id,
    email,
    name,
    value,
    image,
    url,
    refreshToken,
    authToken,
    expired,
    cb) => {
    console.log("Start performDBAction");

    //EXECUTE CALLBACK FUNCTION AND RETURN RESULSTS
    let results = await performDBAction(
        id,
        email,
        authToken,
        refreshToken,
        expired,
        name,
        value,
        image,
        url,
        cb);

    console.log("PRODUCTINSERT: CONTAINER performDBAction RESULTS:", results);

    /************************************
     * Set placeholder text if data was insertd
     ****************************************/
    let namePlaceHolder;
    let valuePlaceHolder;
    if (results.message === "Action Completed") {

        if (name) {
            namePlaceHolder = { placeholderName: name };
        }
        if (value) {
            valuePlaceHolder = { placeholderValue: value };

        }
    }
    console.log("Passed performDBAction");
    let { message, isUserAuthorized, productsList } = results;

    /***************************************************
     * Set objects to be returned from stageDBAction
     *****************************************************/
    let dbObj;
    if (namePlaceHolder && valuePlaceHolder) {
        dbObj = {
            message,
            refreshToken,
            isUserAuthorized,
            expired,
            productsList,
            placeholderName: namePlaceHolder ? namePlaceHolder.placeholderName : '',
            placeholderValue: valuePlaceHolder ? valuePlaceHolder.placeholderValue : ''
        }
    }
    else{
        dbObj = {
            message,
            refreshToken,
            isUserAuthorized,
            hasTimeExpired: expired,
            productsList
        }
    }

    console.log("STAGEDBACTION: productListData =", productsList);

    return dbObj;

    // 10/15/2019: Set the rendering components
    // this.productListData = productsList;
}
