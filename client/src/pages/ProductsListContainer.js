import React, { Component } from "react";
// import "../style.css";
// import CarouselPage from "../components/Carousel";
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
// import ProductForm from "../components/ProductsOLD";
import ProductListItem from "../components/ProductListItem";

import dataStore from "../utils/dataStore";
import tokenStore from '../utils/tokenStore';


class ProductsListContainer extends Component {
    constructor(props) {
        super(props);
        /******************************************
             * STEP2a: SET DELETEURL
             ******************************************/
            this.deleteURL = `/products/product/delete/`;
            this.refreshURL = '/user/login/refresh';
            /******************************************/
        this._productsList = [];
        this.state = {
            products: '',

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
        this.setState({access_token: ''});
        this.setState({ refresh_token: '' });
        this.setState({ email: '' });
        this.setState({ hasTimeExpired: false });
    }
    setStateVariables(access_token, refresh_token, expiration, email, message) {
        /************************************************
         * SET State VARIABLES FROM LocalStorage
         ************************************************/
        let authToken = "Bearer " + access_token;

        console.log("Auth token", authToken);
        this.setState({ authToken });

        console.log("Refresh token", refresh_token);
        this.setState({ refresh_token });

        this.setState({ email });

        let hasTimeExpired = dataStore.hasTimeExpired();

        console.log("Expired?", hasTimeExpired);
        this.setState({ hasTimeExpired });

        this.setState({ isUserAuthorized: true });

        this.setState({ message });
        /************************************************/
    }

    componentDidMount() {
        let baseURL = "/products";

        let returnProducts = (baseURL) => {
            API.getProducts(baseURL)
                .then(res => {
                    console.log("COMPONENTDIDMOUNT", res);

                    // set this._productsList
                    this.productsList = res.data.products;
                })
                .catch(err => console.log(err));
        };

        // Execute getProducts
        returnProducts(baseURL);
    }

    set productsList(data) {
        let products = data;
        // let filterClickHandler = this.filterClickHandler;

        console.log("in get", products, "length", products.length);

        // Set productsList from response data

        this._productsList = products.map((product) => {
            return (<ProductListItem key={product._id} id={product._id} name={product.name} value={product.value} filterClickHandler={(event) => this.filterClickHandler(event)} deleteClickHandler={(event) => this.deleteClickHandler(event)} />)
        });

        // Set products state property to array of ProductListItems
        this.setState(
            {
                products: this._productsList
            });
        // console.log('productsList', this.state.products);
        // return productsList;
        // return 1;
    }

    get productsList() {
        return this._productsList;
    }

    filterClickHandler(event) {
        event.preventDefault();
        const event_id = event.target.id;
        console.log('IN Delete PRODUCT CALL', event_id);

        /******************************************
         *  10/02: ProductsLIst has nothing in it
         * ***************************************/
        console.log("productsList:Filter:", JSON.stringify(this.productsList));
        // Using Setters and getters
        let filteredList = this.productsList.filter((product) => {
            console.log("PRODUCT ID: ", product.props.id);
            if (product.props.id.toString() !== event_id.toString()) {
                console.log("MatchingProductID: ", product.props.id);
                let data = {
                    name: product.props.name,
                    value: product.props.value,
                    _id: product.props.id,
                    key: product.props.id
                };
                return data;
            }
        });
        this._productsList = filteredList;
        this.setState({ products: this.productsList });
    }

    async deleteProduct(url, accessToken, refresh_token, expired) {
        console.log('IN DELETE PRODUCT CALL');
        try {
            let response = await API.deleteProduct(url, accessToken, refresh_token, expired);
            this.setState({ message: "Product deleted" });
            return response;
        }
        catch (err) {
            if (err.response.status === 500) {
                console.log('response:', err.response);
                console.log('err:', err.message);
                this.setState({ message: 'Invalid Product' });
            }
        }
    }
    async refreshTokens() {
        // if (this.state.hasTimeExpired) {
            console.log("ProductListContainer refresh-token: ", this.state.refresh_token);

            /***************************************
             * Step3: RefreshTokens: If tokens have expired
             * **************************************/
            try {
                /*********************************
                 * Step3b:Call refreshTokens to perform update
                 *********************************/
                let res = await tokenStore.refresh(this.refreshURL, this.state.authToken, this.state.refresh_token, this.state.email, this.state.hasTimeExpired);
                /**************************/

                // do something with response
                console.log("ProductionList:response returned", res);
                if (res.status === 200) {
                    console.log("NEW ACCESS TOKENS HAVE BEEN RECEIVED RES:", res);
                    /***********************************************
                     * Step4: Set Local Storage Variables
                     ************************************************/
                    // console.log("In if 2: baseURL =", baseURL);
                    let { access_token, refresh_token, expiration, email, message } = await dataStore.setLocalStorage(
                        res.data.access_token,
                        res.data.refresh_token,
                        res.data.expiration,
                        res.data.email,
                        res.data.message);

                    /*********************************************
                     * STEP5: SET STATE VARIABLES FROM Local Storage
                     ********************************************/
                    await this.setStateVariables(access_token, refresh_token, expiration, email, message);
                    /********************************************/
                }
            }
            catch (err) {
                // Clear all localStorage, due to invalid Refresh token
                if (err.response.status === 401) {
                    console.log('401 status received in ProductUpdate');
                    /***********************************************
                     * STEP6: Reset Local Storage Variables
                     ************************************************/
                    // console.log("In if 3: baseURL =", baseURL);
                    await dataStore.resetLocalStorage();

                    /*********************************************
                     * STEP7: SET STATE VARIABLES FROM Local Storage
                     *********************************************/
                    await this.resetStateVariables();
                    console.log('err', err.response);
                    console.log('error status code', err.response.status);
                    this.setState({ isUserAuthorized: false });
                    console.log("isUserAuthorised = ", this.state.isUserAuthorized);
                    this.setState({ message: err.response.data.message });
                    //return err;
                } // if
            } // catch
        // } // if
    }
    performDBAction(id) {
        return this.deleteItem(id);
    }

    async deleteItem(productId){
        console.log("IN IF");
                // Refresh_Token should be set to 'norefresh' as tokens should be refreshed
                this.setState({ refresh_token: 'norefresh' });

                console.log('ProductUpdateContainer:refresh_token = ', this.state.refresh_token);

                /************************************
                 *  STEP8: Call method to delete product
                 ***********************************/
                // await  this.deleteProduct(this.baseURL, authToken, refresh_token, expiration);
                let deleteResponse = await this.deleteProduct(this.deleteURL+productId, this.state.authToken, this.state.refresh_token, this.state.expiration);
                console.log("DELETEMESSAGE ", deleteResponse);
                /***********************************/
                /*********************
                 * STEP9: update the productsList
                 ********************/
                try {
                    let res = await API.getProducts('/products');
                    let data = res.data.products;

                    // this._productsList = data;
                    this.productsList = data

                    // Reset Variables to Default
                    this.setState({ isUserAuthorized: true });
                    this.setState({ hasTimeExpired: false });
                }
                catch (err) {
                    console.log("Network Error", err.message);
                    this.setState({ message: "Network Error" });
                }

    }
    async deleteClickHandler(event) {
        try {
            event.preventDefault();
            console.log("deleteClickHandler1");
            /************************************
             * STEP1: SET STATE VARIABLES From LOCAL STORAGE
             ************************************/
            let productId = event.target.id;

            let { access_token, refresh_token, expiration, email, message } = await dataStore.getLocalStorage();

            console.log("deleteClickHandler2");
            /******************************************
             * STEP2: SETSTATEVARIABLES METHOD
             *******************************/
            await this.setStateVariables(access_token, refresh_token, expiration, email, message);

            console.log("deleteClickHandler3");

            // refresh_token = 'norefresh';
            let authToken = "Bearer " + access_token;
            console.log("AUTHTOKEN:", authToken);
            /*************************************/
            
            console.log("hasTimeExpired", this.state.hasTimeExpired);
            /**************************************************
             * STEP3: REFRESH TOKENS IF NECESSARY
             **************************************************/
            if (this.state.hasTimeExpired) {
                await this.refreshTokens();
            }
            /*************************************************/
            console.log("Is user authorized", this.state.isUserAuthorized);
            if (this.state.isUserAuthorized) {
                /*******************************
                 *STEP 4: PERFORM A DB ACTION IF TOKENS R VALID
                ********************************/
                await this.performDBAction(productId)
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
                {this.state.products}
            </React.Fragment>
        )
    }
} // class

export default ProductsListContainer;