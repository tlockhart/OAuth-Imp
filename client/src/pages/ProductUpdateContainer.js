import React, { Component } from "react";
// import {browserHistory} from 'react-router';
// import "../style.css";
// import CarouselPage from "../components/Carousel";
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';
// import tokenAccess from '../utils/dataStore';
import dataStore from '../utils/dataStore';

// Import Components
import ProductUpdateInputs from "../components/ProductUpdateInputs";

const moment = require('moment');

// import query
// const $ = window.$;

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
            isUserAuthorized: true
            // message: '',
            // token: ''
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    } // constructor

    componentDidMount() {
        if (this.props.match.params.product_id && this.props.location.state) {
            // Get id off the URL Dynamic Segment
            const { product_id } = this.props.match.params;
            console.log("Product_ID:", product_id);

            // Pass item info from button
            // const { handle } = this.props.match.params;
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
    updateProduct(url, accessToken, refreshToken, name, value) {
        console.log('IN LOGIN CALL');

        API.updateProduct(url, accessToken, refreshToken, name, value)
            .then(res => {
                // console.log("RES:", res);

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
    refreshTokens(url, accessToken, refreshToken, email) {
        console.log('ProductionUpdate-refreshTokens:', refreshToken);
        API.refreshTokens(url, accessToken, refreshToken, email)
            .then(res => {
                console.log("ProductionUpdate:response returned", res);
                if (res.ok) {
                    console.log("NEW ACCESS TOKENS HAVE BEEN RECEIVED");
                    console.log(res);
                    /***********************************************
                     * MAKE DRY, SAME METHODS CALLED IN LOGIN
                     ************************************************/
                    dataStore.set('access_token', res.data.access_token);
                    dataStore.set('refresh_token', res.data.refresh_token);
                    dataStore.set('expiration', res.data.expiration);
                    dataStore.set('email', res.data.email);
                }
                else {
                    // status is 401 clear all tokens
                    console.log('401 status received in ProductUpdate');
                    dataStore.set('access_token', '');
                    dataStore.set('refresh_token', '');
                    dataStore.set('expiration', '');
                    dataStore.set('email', '');

                    this.setState({ authToken: '' });
                    this.setState({ refresh_token: '' });
                    this.setState({ email: '' });
                    this.setState({ hasTimeExpired: false });

                    throw new Error("Authorization Error", res);
                }
            })
            .catch(err => {
                console.log(err, err.message);
                this.setState({ isUserAuthorized: false })
                //return err;
            });
    }

    async clickHandler(event) {
        try {
            event.preventDefault();

            let name = this.state.productName;
            let value = this.state.productValue;

            // Reset state variables after submit
            this.setState({ productName: '' });
            this.setState({ productValue: '' });
            // this.setState({ placeholderName: '' });
            // this.setState({ placeholderValue: '' });

            /************************************************
             * SET VARIABLES
             ************************************************/
            let authToken = "Bearer "+await dataStore.get('access_token');
            console.log("Auth token", authToken);
            this.setState({ authToken: authToken });

            // Get refresh_token for expired access_token
            let refresh_token = await dataStore.get('refresh_token');
            console.log("Refresh token", refresh_token);
            this.setState({ refresh_token: refresh_token });

            let email = await dataStore.get('email');
            this.setState({ email: email });

            let hasTimeExpired = dataStore.hasTimeExpired();
            console.log("Expired?", hasTimeExpired);
            this.setState({ hasTimeExpired: hasTimeExpired });
            /************************************************/

            let baseURL = `/products/product/update/${this.state.productId}`;
            // console.log('name', name, 'value', value);

            if (this.state.hasTimeExpired) {

                const baseURL = '/user/login/refresh';
                console.log("ProductUpdateContainer: ", refresh_token);

                // RefreshTokens
                // await this.refreshTokens(baseURL, authToken, refresh_token, email);
                await this.refreshTokens(baseURL, this.state.authToken, this.state.refresh_token, this.state.email);
            }
            else {
                refresh_token = 'norefresh';
                this.setState({ refresh_token: refresh_token });
            }

            if (this.state.isUserAuthorized) {
                try {
                    console.log('ProductUpdateContainer:refresh_token = ', refresh_token);
                    // Call method to update product
                    this.updateProduct(baseURL, this.state.authToken, this.state.refresh_token, name, value);
                } //try
                catch(err) {
                    console.log("Caught Authentiation Error 1", err);
                }        
            } // if
        }
        catch(err) {
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