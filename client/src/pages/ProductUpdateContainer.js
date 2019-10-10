import React, { Component } from "react";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import module to get/set variables from/in the LocalStorage
import dataStore from '../utils/dataStore';

// Import Components
import ProductUpdateInputs from "../components/ProductUpdateInputs";

import tokenStore from '../utils/tokenStore';

const moment = require('moment');

class ProductUpdateContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productId: '',
            productName: '',
            productValue: '',
            placeholderName: '',
            placeholderValue: '',
            authToken: '',
            refresh_token: '',
            email: '',
            hasTimeExpired: false,
            isUserAuthorized: true,
            message: '',
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.updateClickHandler = this.updateClickHandler.bind(this);
    } // constructor

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

    resetStateVariables() {
        this.setState({ authToken: '' });
        this.setState({ refresh_token: '' });
        this.setState({ email: '' });
        this.setState({ hasTimeExpired: false });
    }

    componentDidMount() {
        if (this.props.match.params.product_id && this.props.location.state) {
            /******************************************
             *  Get id off the URL Dynamic Segment
             * ****************************************/
            const { product_id } = this.props.match.params;
            console.log("Product_ID:", product_id);

            /********************************************
             * Pass item info from click button
             * *****************************************/
            const { name, value } = this.props.location.state;
            this.setState({
                productId: product_id,
                placeholderName: name,
                placeholderValue: `$ ${value}`,
            });
        }
        // else find the ID, name and value
    }

    changeHandler(event) {
        // First disable default behavior
        event.preventDefault();

        const {
            name,
            value
        } = event.target;

        if (name && typeof value === 'string') {
            this.setState(
                {
                    // set name computed property to the name of the element clicked, 
                    // and set the corresponding state property to the element's value
                    [name]: value,
                }
            );  // setState
        }
    } // changeHandler

    // Define Call to Server Side utils to post body to the backend server:
    async updateProduct(url, accessToken, refreshToken, name, value) {
        console.log('IN UPDATE PRODUCT CALL');
        await API.updateProduct(url, accessToken, refreshToken, name, value)
            .then(res => {
                // Set State Values
                if (name) {
                    this.setState({ placeholderName: name });
                }
                if (value) {
                    this.setState({ placeholderValue: value });
                }
                // Set message
                this.setState({message: "Product updated"});
            })
            .catch(err => {
                if (err.response.status === 500) {
                    console.log('response:', err.response);
                    console.log('err:', err.message);
                    this.setState({ message: 'Invalid Input' });
                }

            });
    }

    
    // async 
    //         .catch(async err => {
                
    //             }
    //         });
    // }

    async updateClickHandler(event) {
        try {
            event.preventDefault();
            let name = this.state.productName;
            let value = this.state.productValue;

            /************************************************************************
             * Reset state variables representing view input after submit
             * **********************************************************************/
            this.setState({ productName: '' });
            this.setState({ productValue: '' });
            this.setState({ placeholderName: '' });
            this.setState({ placeholderValue: '' });

            /************************************
             * STEP1: SET STATE VARIABLES From LOCAL STORAGE
             ************************************/
            let { access_token, refresh_token, expiration, email, message } = await dataStore.getLocalStorage();
            /*************************************/

            await this.setStateVariables(access_token, refresh_token, expiration, email, message);
            

            let baseURL = `/products/product/update/${this.state.productId}`;
            // console.log('name', name, 'value', value);
            /******************************************
             * STEP2: SETSTATEVARIABLES METHOD
             *******************************/
            if (this.state.hasTimeExpired) {
                const baseURL = '/user/login/refresh';
                console.log("ProductUpdateContainer refresh-token: ", this.state.refresh_token);

                /***************************************
                 * Step3: RefreshTokens: If tokens have expired
                 * **************************************/
                try {
                    /*********************************
                     * Call refreshTokens to perform update
                     *********************************/
                    let res = await tokenStore.refresh(baseURL, this.state.authToken, this.state.refresh_token, this.state.email, this.state.hasTimeExpired);
                    /**************************/
                    // do something with response
                    console.log("ProductionUpdate:response returned", res);
                    if (res.status === 200) {
                        console.log("NEW ACCESS TOKENS HAVE BEEN RECEIVED RES:", res);
                        /***********************************************
                         * Set Local Storage Variables
                         ************************************************/
                        let { access_token, refresh_token, expiration, email, message } = await dataStore.setLocalStorage(
                            res.data.access_token,
                            res.data.refresh_token,
                            res.data.expiration,
                            res.data.email,
                            res.data.message);

                        /*********************************************
                         * SET STATE VARIABLES FROM Local Storage
                         ********************************************/
                        await this.setStateVariables(access_token, refresh_token, expiration, email, message);
                        /********************************************/
                    }
                }
                catch(err) {
                    // Clear all localStorage, due to invalid Refresh token
                    if (err.response.status === 401) {
                        console.log('401 status received in ProductUpdate');
                        /***********************************************
                         * Reset Local Storage Variables
                         ************************************************/
                        await dataStore.resetLocalStorage();

                        /*********************************************
                         * SET STATE VARIABLES FROM Local Storage
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
            }

            if (this.state.isUserAuthorized) {
                    // Refresh_Token should be set to 'norefresh' as tokens should be refreshed
                    this.setState({ refresh_token: 'norefresh' });

                    console.log('ProductUpdateContainer:refresh_token = ', this.state.refresh_token);

                    // Call method to update product
                    await this.updateProduct(baseURL, this.state.authToken, this.state.refresh_token, name, value);

                    // Reset Variables to Default
                    this.setState({ isUserAuthorized: true });
                    this.setState({ hasTimeExpired: false });
            } // if
        } // try
        catch(err){
            // console.log("ERROR:", err.response);
            console.log("ERROR:", err);
            // console.log("Caught Authentiation Error 2", err);
            console.log("User is logged out");
            this.setState({message: "User is logged out"});
        }
    }

    render() {
        return (
            <React.Fragment>
                <ProductUpdateInputs
                    changeHandler={this.changeHandler}
                    updateClickHandler={this.updateClickHandler}
                    productName={this.state.productName}
                    productValue={this.state.productValue}
                    placeholderName={this.state.placeholderName}
                    placeholderValue={this.state.placeholderValue}
                    message={this.state.message}
                />
            </React.Fragment>
        )
    }
} // class

export default ProductUpdateContainer;