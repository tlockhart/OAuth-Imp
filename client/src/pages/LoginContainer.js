import React, { Component } from "react";
// import "../style.css";
// import CarouselPage from "../components/Carousel";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
import LoginForm from "../components/Login";

class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            message: '',
            token: ''
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

    clickHandler(event) {
        event.preventDefault();
        // alert(`User Name: ${this.state.email}\n
        //   Password: ${this.state.password}\n`);
        console.log(`User Name: ${this.state.email}, Password: ${this.state.password}`);

        // Package Data to be sent in the Post Request Body
        let data = {
            email: this.state.email,
            password: this.state.password
        };

        // Define Call to Server Side utils to post body to the backend server:
        let register = (data) => {
            console.log('IN LOGIN CALL');
            API.login(data)
                .then(res => {
                      this.setState( { token: res.token});
                    console.log("RES:", res);
                })
                .catch(err => console.log(err));
        };

        // Execute register
        register(data);

        // Reset state variables after submit
        this.setState({
            email: '',
            password: ''
        });
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