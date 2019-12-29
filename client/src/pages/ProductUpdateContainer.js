import React, { Component } from "react";

// Import module to get/set variables from/in the LocalStorage
import authenticationStore from '../utils/authenticationStore';

// Import Components
import ProductUpdateForm from "../components/ProductUpdateForm";
import credentialStore from '../utils/credentialStore';
import { updateProduct, performDBAction } from '../utils/productStore';

class ProductUpdateContainer extends Component {
    constructor(props) {
        super(props);
        this.refreshURL = '/user/login/refresh';
        this.baseURL = '/products/product/update/';
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

    async setStateVariables(access_token, refresh_token, expiration, email, message) {
        /************************************************
         * SET State VARIABLES FROM LocalStorage
         ************************************************/
        let authToken = "Bearer " + access_token;

        console.log("Auth token", authToken);
        this.setState({ authToken });

        console.log("Refresh token", refresh_token);
        this.setState({ refresh_token });

        this.setState({ email });

        let hasTimeExpired = await authenticationStore.hasTimeExpired();

        console.log("Expired?", hasTimeExpired);
        this.setState({ hasTimeExpired });

        this.setState({ isUserAuthorized: true });

        this.setState({ message });
        /************************************************/
    }

    resetStateVariables() {
        this.setState({ authToken: '' });
        this.setState({ access_token: '' });
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

    /************************************
    * stageDBActionis an integrator that passes an id and a callback function corresponding to the desired db action to be performed, and retrieves the new data and updates the state variables, to be displayed to screen. 
    ************************************/
    async stageDBAction(
        id, 
        name, 
        value, 
        url, 
        image = null, 
        cb) {
        console.log("Start performDBAction");
            //EXECUTE CALLBACK FUNCTION AND RETURN RESULSTS
        let results = await performDBAction(
            id, 
            this.state.refresh_token, 
            this.state.authToken, 
            this.state.hasTimeExpired, 
            name,
            value,
            null,
            url,
            cb);

        /************************************
         * Set placeholder text if data was updated
         ****************************************/
        if (results.message === "Action Completed") {
            if (name) {
                this.setState({ placeholderName: name });
            }
            if (value) {
                this.setState({ placeholderValue: value });
            }
        }
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
             * STEP1: Get Data out of local Storage
             ************************************/
            let { access_token, refresh_token, expiration, email, message } = await authenticationStore.getLocalStorage();
            /*************************************/

            /******************************************
             * STEP2: SET STATE VARIABLES With data returned from localStorage
             *******************************/
            await this.setStateVariables(access_token, refresh_token, expiration, email, message);

            console.log("HasTIMEExpired", this.state.hasTimeExpired);
            /******************************************
             * STEP3: Determine if Token Refresh is needed
             *******************************/
            if (this.state.hasTimeExpired) {
                console.log("ProductUpdateContainer refresh-token: ", this.state.refresh_token);

                /***************************************
                 * STEP3: RefreshTokens: If tokens have expired
                 * **************************************/
                try {
                    /*********************************
                     * STEP4: Call credendentialStore to get refreshTokens and all other 
                     * credentials from the API, AND SET LOCAL STORAGE WITH RESULTS
                     *********************************/
                    let results = await credentialStore.get(this.state.refresh_token, this.refreshURL, this.state.authToken, this.state.email, this.state.hasTimeExpired);
                    /**************************/
                    console.log("RESULTS STATUS", results);
                    if (results) {
                        console.log("NEW ACCESS TOKENS HAVE BEEN RECEIVED RESULTS:", results);

                        /*********************************************
                         * STEP5: SET STATE VARIABLES RECEIVED FROM CREDENTIAL STORE
                         ********************************************/
                        let { access_token,
                            refresh_token,
                            expiration,
                            email,
                            message } = results;

                        // do something with response
                        console.log("ProductionUpdate:response returned", results);

                        this.setStateVariables(access_token, refresh_token, expiration, email, message);

                        console.log("New AUTHTOKEN after Refresh:", this.state.authToken);
                        /********************************************/
                    }
                    else {
                        console.log("I NEVER MADE IT TO IF");
                    }
                }
                catch (err) {
                    // Clear all localStorage, due to invalid Refresh token
                    console.log("ERRORED OUT IN UPDATE CATCH");
                    if (err.response.status === 401) {
                        console.log('401 status received in ProductUpdate');
                        /***********************************************
                         * Reset Local Storage Variables
                         ************************************************/
                        await authenticationStore.resetLocalStorage();

                        /*********************************************
                         * SET STATE VARIABLES FROM Local Storage
                         *********************************************/
                        await this.resetStateVariables();
                        console.log('err', err.response);
                        console.log('error status code', err.response.status);
                        this.setState({ isUserAuthorized: false });
                        console.log("isUserAuthorised = ", this.state.isUserAuthorized);
                        this.setState({ message: err.response.data.message });
                    } // if
                } // catch
            }
            console.log("AUTHORIZED?:", this.state.isUserAuthorized);
            if (this.state.isUserAuthorized) {
                // Refresh_Token should be temporarily set to 'norefresh' in productionAction, as tokens should NOT be refreshed
                // this.setState({ refresh_token: 'norefresh' });

                console.log('ProductUpdateContainer:refresh_token = ', this.state.refresh_token);

                /***********************************************
                 * Step6: PERFORM A DB ACTION IF TOKENS R VALID 
                 **********************************************/
                //id, name, value, url, file = null, imageSrc = null, cb
                
                await this.stageDBAction(
                    this.state.productId, 
                    name, 
                    value, 
                    this.baseURL, 
                    null,  
                    updateProduct);
            } // if
        } // try
        catch (err) {
            console.log("User is logged out");
            this.setState({ message: "User is logged out" });
        }
    }

    render() {
        return (
            <React.Fragment>
                <ProductUpdateForm
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