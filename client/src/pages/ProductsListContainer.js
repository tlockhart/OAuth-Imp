import React, { Component } from "react";
// import "../style.css";
// import CarouselPage from "../components/Carousel";
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
// import ProductForm from "../components/ProductsOLD";
import ProductListItem from "../components/ProductListItem/index";

import authenticationStore from "../utils/authenticationStore";
// import tokenStore from '../utils/tokenStore';
import credentialStore from '../utils/credentialStore';
import { performDBAction, deleteProduct } from '../utils/productStore';


class ProductsListContainer extends Component {
    constructor(props) {
        super(props);
        /******************************************
             * STEP2a: SET DELETEURL
             ******************************************/
        this.deleteURL = `/products/product/delete/`;
        this.refreshURL = '/user/login/refresh';
        /******************************************/
        // this._productsList = [];
        this.state = {
            productListData: [],
            productListItems: '',
            access_token: '',
            authToken: '',
            refresh_token: '',
            expiration: '',
            email: '',
            hasTimeExpired: false,
            isUserAuthorized: true,
            message: ''
        };

        // this.clickHandler = this.clickHander.bind(this);
    } // constructor

    resetStateVariables() {
        this.setState({ authToken: '' });
        this.setState({ access_token: '' });
        this.setState({ refresh_token: '' });
        this.setState({ email: '' });
        this.setState({ hasTimeExpired: false });
    }
    /************************************************
   //      * SET State VARIABLES FROM LocalStorage
   //      ************************************************/
    setStateVariables(access_token, refresh_token, expiration, email, message) {
        let authToken = "Bearer " + access_token;
        let hasTimeExpired = authenticationStore.hasTimeExpired();

        this.setState({
            access_token,
            refresh_token,
            expiration,
            email,
            message,
            hasTimeExpired,
            authToken,
            isUserAuthorized: true
        });

    }
    /************************************************/


    componentDidMount() {
        let baseURL = "/products";

        let returnProducts = (baseURL) => {
            API.getProducts(baseURL)
                .then(res => {
                    // set this.state.productsList
                    this.productListData = res.data.products;
                })
                .catch(err => console.log(err));
        };

        // Execute getProducts
        returnProducts(baseURL);
    }

    set productListData(data) {
        let products = data;
        console.log("in get", products, "length", products.length);
        let user = {
            // role: "admin",
            role: "visitor",
            data: products
        };
        // Set productsList from response data
        let productItemArray = products.map((product) => {
            return (
                <ProductListItem
                    user={user}
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    value={product.value}
                    productImage={product.productImage}
                    filterClickHandler={(event) => this.filterClickHandler(event)} deleteClickHandler={(event) => this.deleteClickHandler(event)} />
            )
        });

        // Set products state property to array of ProductListItems
        this.setState(
            {
                productListData: products,
                productListItems: productItemArray

            });
    }

    get productListData() {
        return this.state.productListData;
    }

    filterClickHandler(event) {
        event.preventDefault();
        const event_id = event.target.id;
        console.log('IN Delete PRODUCT CALL', event_id);

        /******************************************
         *  10/02: ProductsLIst has nothing in it
         ****************************************/
        // console.log("productListData:Filter:", JSON.stringify(this.productListData));
        // Using Setters and getters
        let filteredList = this.productListData.filter((product) => {
            console.log("PRODUCT ID: ", product._id);
            let data = {};
            if (product._id.toString() !== event_id.toString()) {
                console.log("MatchingProductID: ", product._id);
                data = {
                    name: product.name,
                    value: product.value,
                    _id: product._id,
                    key: product._id
                };
                return data;
            }
            return;
        });
        this.productListData = filteredList;
        console.log("FIltered LiST", this.productListData);

    }
    /************************************
     * stageDBActionis an integrator that passes an id and a callback function corresponding to the desired db action to be performed, and retrieves the new data and updates the state variables, to be displayed to screen. 
     ************************************/
    //productId, this.deleteURL, deleteProduct
    async stageDBAction(id, url, cb) {
        console.log("Start performDBAction");
        let results = await performDBAction(
            id,
            this.state.refresh_token,
            this.state.authToken,
            this.state.hasTimeExpired,
            null,
            null,
            null,
            url,
            cb);

        // console.log("RESULTS1: ", JSON.stringify(results));
        // console.log("RESULTS2: ", results);
        console.log("Passed performDBAction");

        // let parsedResults = JSON.parse(results);
        let { message, refresh_token, isUserAuthorized, hasTimeExpired, productsList } = results;

        /***************************************************
         * Set State with the results of calling the DB Action
         *****************************************************/
        this.setState({
            message,
            refresh_token,
            isUserAuthorized,
            hasTimeExpired,
        });

        console.log("productListData =", productsList);
        // 10/15/2019: Set the rendering components
        this.productListData = productsList;
    }

    async deleteClickHandler(event) {
        try {
            event.preventDefault();
            /************************************
             * STEP1: GET Product ID to be deleted
             ************************************/
            let productId = event.target.id;

            /***************************************
             * STEP2: Get Data out of local Storage
             ***************************************/
            let { access_token, refresh_token, expiration, email, message } = await authenticationStore.getLocalStorage();

            /******************************************
             * STEP3: SET STATE VARIABLES With data returned from localStorage
             *******************************/
            await this.setStateVariables(access_token, refresh_token, expiration, email, message);

            console.log("AUTHTOKEN Set to LocalStorage:", this.state.authToken);
            /*************************************/

            console.log("hasTimeExpired", this.state.hasTimeExpired);
            /**************************************************
             * STEP4: Determine if Token Refresh is needed
             **************************************************/
            if (this.state.hasTimeExpired) {
                try {
                    /***********************************
                     * Step5: Call credendentialStore to get refreshTokens and all other 
                     * credentials from the API, AND SET LOCAL STORAGE WITH RESULTS
                     ***********************************/
                    let results = await credentialStore.get(this.state.refresh_token, this.refreshURL, this.state.authToken, this.state.email, this.state.hasTimeExpired);
                    /***********************************/

                    if (results) {
                        console.log("NEW ACCESS TOKENS HAVE BEEN RECEIVED RESULTS:", results);
                        /*********************************************
                         * STEP6: SET STATE VARIABLES RECEIVED FROM CREDENTIAL STORE 
                         ********************************************/
                        let { access_token,
                            refresh_token,
                            expiration,
                            email,
                            message } = results;

                        this.setStateVariables(access_token, refresh_token, expiration, email, message);

                        console.log("New AUTHTOKEN after Refresh:", this.state.authToken);
                    }
                    else {
                        console.log("I NEVER MADE IT TO IF");
                    }
                }
                catch (err) {
                    // Clear all localStorage, due to invalid Refresh token
                    console.log("err: ", err);
                }
            } // if
            /*************************************************/
            console.log("AUTHORIZED?:", this.state.isUserAuthorized);
            if (this.state.isUserAuthorized) {
                /*******************************
                 *STEP 7: PERFORM A DB ACTION IF TOKENS R VALID
                ********************************/
                await this.stageDBAction(productId, this.deleteURL, deleteProduct);
            } // if

        }
        catch (err) {
            console.log("ERROR:", err);
            console.log("User is logged out");
            this.setState({ message: "User is logged out" });
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.state.productListItems}
            </React.Fragment>
        )
    }
} // class

export default ProductsListContainer;