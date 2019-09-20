import React, { Component } from "react";
// import {browserHistory} from 'react-router';
// import "../style.css";
// import CarouselPage from "../components/Carousel";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
import ProductUpdateInputs from "../components/ProductUpdateInputs";

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
            const { handle } = this.props.match.params;
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

    clickHandler(event) {
        event.preventDefault();

        let name = this.state.productName;
        let value = this.state.productValue;

        // Reset state variables after submit
        this.setState({ productName: '' });
        this.setState({ productValue: '' });
        this.setState({ placeholderName: '' });
        this.setState({ placeholderValue: '' });

        // Get token
        const token = localStorage.getItem('token');
        // console.log('gettoken:', token);

        let authToken = token ? 'Bearer ' + token : '';
        // console.log('authtoken:', authToken);

        let baseURL = `/products/product/update/${this.state.productId}`;
        // console.log('name', name, 'value', value);

        // Define Call to Server Side utils to post body to the backend server:
        let updateProduct = (url, token, name, value) => {
            console.log('IN LOGIN CALL');
            API.updateProduct(url, token, name, value)
                .then(res => {
                    // console.log("RES:", res);

                    // Set State Values
                    this.setState({ placeholderName: name });
                    this.setState({ placeholderValue: value });

                })
                .catch(err => console.log(err, err.message));
        };

        // Execute Updat
        updateProduct(baseURL, authToken, name, value);
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