import React, { Component } from "react";

// Import module to get/set variables from/in the LocalStorage
import * as authenticationStore from '../utils/authenticationStore';

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
import LoginForm from "../components/LoginForm";

class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            message: '',
            access_token: '',
            refresh_token: '',
            expiration: ''
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    } // constructor

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

    async clickHandler(event) {
        event.preventDefault();

        console.log(`User Name: ${this.state.email}, Password: ${this.state.password}`);

        /********
             * 12/31: STEP1 of 2: Get Data out of local Storage
             ************************************/
            // let { access_token, refresh_token, expiration, email, message } = await authenticationStore.getLocalStorage();
            /*************************************/

            /******************************************
             * 12/31: STEP2 of 2: SET STATE VARIABLES With data returned from localStorage
             *******************************/
            // await this.setStateVariables(access_token, refresh_token, expiration, email, message);

            // console.log("HasTIMEExpired", this.state.hasTimeExpired);
            /****************************
             */ 
        // Package Data to be sent in the Post Request Body
        let data = {
            email: this.state.email,
            password: this.state.password,
            /*****************/
            // 12/31:
            // expiration: this.state.expiration,
            // access_token: this.state.access_token,
            // refresh_token: this.refresh_token
            /*****************/
        };

        // Define Call to Server Side utils to post body to the backend server and set states, using login method:
        let login = (data) => {
            console.log('IN LOGIN CALL');
            API.login(data)
                .then(async res => {
                    if (res) {
                        // Step 1 of 2: Set state variables from response
                        let { message, access_token, refresh_token, expiration, email } = res.data;
                        this.setState(
                            { 
                                access_token,
                                expiration,
                                refresh_token,
                                message, 
                                email
                         });
                        console.log("RES:", res);

                        // Step 2 fo 2: Set Local Storage variables from respons
                        await authenticationStore.setLocalStorage(
                            access_token,
                            refresh_token,
                            expiration,
                            email,
                            message);
                    }
                })
                .catch(async err => {
                    console.log("LOGIN ERROR", err);
                    this.setState(
                        { message: err.message});
                });
        };

        // Execute login
        login(data);

        // Reset state variables after submit
        this.setState({
            email: '',
            password: ''
        });
    }

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

    render() {
        return (
            <React.Fragment>
                <LoginForm
                    changeHandler={this.changeHandler}
                    clickHandler={this.clickHandler}
                    email={this.state.email}
                    password={this.state.password}
                    message={this.state.message}
                    token={this.state.token} />
            </React.Fragment>
        )
    }
} // class

export default LoginContainer;