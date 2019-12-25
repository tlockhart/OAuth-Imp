import React, { Component } from "react";
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
import RegistrationForm from "../components/RegistrationForm";

class RegistrationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            message: ''
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    } // constructor

    // Sets state on all input values
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

        // Define Call to Server Side utils to post body to the backend server and set states, using register method:
        let register = (data) => {
            console.log('IN REGISTER CALL');
            API.register(data)
                .then(res => {
                    console.log("RES:", res);
                      this.setState( { message: res.data.message}); 
                })
                .catch(err => {
                    console.log("ERROR:", err, "Message:", err.message);
                    this.setState(
                        { message: err.message}); });
        };

        // Execute register
        register(data);

        // Reset state variables after submit
        this.setState({
            email: '',
            password: ''
        });
    } // clickHandler

    render() {
        return (
            <React.Fragment>
                <RegistrationForm
                    changeHandler={this.changeHandler}
                    clickHandler={this.clickHandler}
                    email={this.state.email}
                    password={this.state.password} 
                    message={this.state.message}/>
            </React.Fragment>
        )
    }
} // class

export default RegistrationContainer;