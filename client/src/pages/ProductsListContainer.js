import React, { Component } from "react";
// import "../style.css";
// import CarouselPage from "../components/Carousel";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
import ProductListItem from "../components/ProductListItem/index";
import UploadSpinner from '../components/UploadSpinner';

//import utils
import * as auth from '../utils/authenticationStore';
import credentialStore from '../utils/credentialStore';
import { performDBAction, deleteProduct } from '../utils/productStore';


class ProductsListContainer extends Component {
    constructor(props) {
        super(props);
        // authorizationStore.setUserRole((data)=>{
        //     role = data;
        // });
        /******************************************
             * STEP2a: SET DELETEURL
             ******************************************/
        this.deleteURL = `/api/products/product/delete/`;
        this.refreshURL = '/user/login/refresh';
        this.baseURL = "/api/products";
        /******************************************/
        this._productsListData = [];
        this.state = {
            productListData: [],
            access_token: '',
            authToken: '',
            refresh_token: '',
            expiration: '',
            email: '',
            hasTimeExpired: false,
            isUserAuthorized: true,
            message: '',
            // user: {},
            role: '',
            loading: false
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
        // let hasTimeExpired = authenticationStore.hasTimeExpired();
        let hasTimeExpired = auth.hasTimeExpired();
        // .hasTimeExpired();
        this.setState({
            access_token,
            refresh_token,
            expiration,
            email,
            message,
            hasTimeExpired,
            authToken,
            isUserAuthorized: true,
            refreshed: false
        });

    }

    componentDidMount() {
        //01/05:
        console.log("Mount 1");
        // componentDidMount() {
        this.setState({ refreshed: true });
        console.log("Mount 2");
        //5/23/2020
        /**************************** */
        const localStateObj = auth.getLocalStorage();
        console.log("ProductListContainer LOCALSTATEOBJ:", localStateObj);
        this.setState(localStateObj);
        console.log("EMAIL:", localStateObj.email);
        //5/18/20
        /*******************************************/
        const email = localStateObj.email;
        console.log("Mount3 Email:", email);

        /* Set user role on state, by using call back
        function instead of async await */
        this.setState({ loading: true });

        auth.setUserRole(email)
            .then((data => {

                console.log("setUserRole:", data.role);
                this.setState({ role: data.role });
                this.setState({ loading: false });
                console.log("AFTER WILLMOUNT LOAD user:", this.state.role);
            }));
        /******************************************** */


        // Execute getProducts
        this.returnProducts(this.baseURL);
        // returnProducts(baseURL);

        this.setState({ refreshed: false });
    } //componentdidmount

    async returnProducts(baseURL) {
        //  let res;
        try {
            let res = await API.getProducts(baseURL);
            console.log("RES: ", res);
            if (res) {
                this.productsListData = res.data.products;
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    get productsListData() {
        return this._productsListData;
    }
    /******************************
     * 1/8/19: setUser HERE
     ******************************/
    set productsListData(data) {
        this.setState(auth.getLocalStorage());
        console.log("----Data", data);
        this._productsListData = data;

        console.log("***ProductListData Set:", this._productsListData, "length", this._productsListData.length);

        this.setState({ productsListData: this._productsListData });
        // Set productsList to mapped productsListData array
        // return this.state.productsListData;
    } // setProductList

    setHtmlItems() {
        let productList = this.productsListData.map((product) => {
            return (
                <ProductListItem
                    role={this.state.role}
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    value={product.value}
                    productImage={product.productImage}
                    filterClickHandler={(event) => this.filterClickHandler(event)}
                    deleteClickHandler={(event) => this.deleteClickHandler(event)}
                />
            )
        });
        return productList;
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

        let filteredList = this.productsListData.filter((product) => {
            return (product._id.toString() !== event_id.toString());
        })
            .map((product) => {
                let data = {
                    name: product.name,
                    value: product.value,
                    productImage: product.productImage,
                    _id: product._id,
                    key: product._id,
                    event: event
                };
                return data;
            });

        this.productsListData = filteredList;

    }
    /************************************
     * stageDBActionis an integrator that passes an id and a callback function corresponding to the desired db action to be performed, and retrieves the new data and updates the state variables, to be displayed to screen. 
     ************************************/
    //productId, this.deleteURL, deleteProduct
    async stageDBAction(id, email, url, cb) {
        console.log("Start performDBAction");
        let results = await performDBAction(
            id,
            email,
            this.state.refresh_token,
            this.state.authToken,
            this.state.hasTimeExpired,
            null,
            null,
            null,
            url,
            cb);

        console.log("Passed performDBAction");

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

        console.log("productsListData =", productsList);
        // 10/15/2019: Set the rendering components
        this.productsListData = productsList;
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
            // let { access_token, refresh_token, expiration, email, message } = await authenticationStore.getLocalStorage();
            let { access_token, refresh_token, expiration, email, message } = await auth.getLocalStorage();


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
                await this.stageDBAction(
                    productId,
                    this.state.email,
                    this.deleteURL,
                    deleteProduct);
            } // if

        }
        catch (err) {
            console.log("ERROR:", err);
            console.log("User is logged out");
            this.setState({ message: "User is logged out" });
        }
    }
    render() {
        /* 5/23/2020: In order to stop the component from
            rendering before the user's role has been loaded
            add a loading state property.  When the loading state changes, the page will be rerendered with the correct usr role. */
        if (this.state.loading === true) {
            console.log('loading...');
            // return <h2>Loading...</h2>;
            return <UploadSpinner />
        }
        else {
            var userRole = this.state.role;
            console.log("ProductListContainer: userRole =", userRole);
            let updatedProductsListData = this.setHtmlItems();
            console.log("UpdateProducts", updatedProductsListData);
            return (
                <React.Fragment>
                    {updatedProductsListData}
                </React.Fragment>
            )
        }

    }
} // class

export default ProductsListContainer;