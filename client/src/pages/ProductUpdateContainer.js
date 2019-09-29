import React, { Component } from "react";
// import {browserHistory} from 'react-router';
// import "../style.css";
// import CarouselPage from "../components/Carousel";
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import module to get/set variables from/in the LocalStorage
import dataStore from '../utils/dataStore';

// Import Components
import ProductUpdateInputs from "../components/ProductUpdateInputs";

const moment = require('moment');

class ProductUpdateContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productId: '',
            token: '',
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
            // token: ''
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
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
            })
            .catch(err => console.log(err, err.message));
    }
    // call refreshTokens to perform update
    async refreshTokens(url, accessToken, refreshToken, email, expired) {
        console.log('In REFRESHTOKENS:', refreshToken);
        await API.refreshTokens(url, accessToken, refreshToken, email, expired)
            // API.refreshTokens(url, accessToken, refreshToken, email, expired)
            .then(async res => {
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
                else if (res.status === 401) {
                    // status is 401 clear all tokens
                    console.log('401 status received in ProductUpdate');
                    /***********************************************
                     * Reset Local Storage Variables
                     ************************************************/
                    await dataStore.resetLocalStorage();

                    /*********************************************
                     * SET STATE VARIABLES FROM Local Storage
                     *********************************************/
                    await this.resetStateVariables();
                    throw new Error("Authorization Error", res);
                }
            })
            .catch(err => {
                console.log(err, err.message);
                this.setState({ isUserAuthorized: false });
                //return err;
            });
    }

    async clickHandler(event) {
        try {
            event.preventDefault();
            let name = this.state.productName;
            let value = this.state.productValue;

            /************************************************************************
             * Reset state variables representing view input after submit
             * **********************************************************************/
            this.setState({ productName: '' });
            this.setState({ productValue: '' });
            // this.setState({ placeholderName: '' });
            // this.setState({ placeholderValue: '' });

            /************************************
             * SET STATE VARIABLES From LOCAL STORAGE
             ************************************/
            let { access_token, refresh_token, expiration, email, message } = await dataStore.getLocalStorage();
            await this.setStateVariables(access_token, refresh_token, expiration, email, message);
            /*************************************/

            let baseURL = `/products/product/update/${this.state.productId}`;
            // console.log('name', name, 'value', value);

            if (this.state.hasTimeExpired) {
                const baseURL = '/user/login/refresh';
                console.log("ProductUpdateContainer refresh-token: ", this.state.refresh_token);

                /***************************************
                 * RefreshTokens: If tokens have expired
                 * **************************************/
                await this.refreshTokens(baseURL, this.state.authToken, this.state.refresh_token, this.state.email, this.state.hasTimeExpired);
            }

            if (this.state.isUserAuthorized) {
                try {
                    // Refresh_Token should be set to 'norefresh' as tokens should be refreshed
                    this.setState({ refresh_token: 'norefresh' });

                    console.log('ProductUpdateContainer:refresh_token = ', this.state.refresh_token);

                    // Call method to update product
                    await this.updateProduct(baseURL, this.state.authToken, this.state.refresh_token, name, value);

                    // Reset Variables to Default
                    this.setState({ isUserAuthorized: true });
                    this.setState({ hasTimeExpired: false });

                } //try
                catch (err) {
                    console.log("Caught Authentiation Error 1", err);
                }
            } // if
        }
        catch (err) {
            console.log("Caught Authentiation Error 2", err);
        }
    }

    render() {
        return (
            <React.Fragment>
                <ProductUpdateInputs
                    changeHandler={this.changeHandler}
                    clickHandler={this.clickHandler}
                    productName={this.state.productName}
                    productValue={this.state.productValue}
                    placeholderName={this.state.placeholderName}
                    placeholderValue={this.state.placeholderValue}
                />
            </React.Fragment>
        )
    }
} // class

export default ProductUpdateContainer;