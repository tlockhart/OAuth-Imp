import React, { Component } from "react";
// import "../style.css";
// import CarouselPage from "../components/Carousel";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
import ProductUpdateForm from "../components/ProductUpdateInputs";

class ProductUpdateContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productName: '',
            productPrice: '',
            // message: '',
            // token: ''
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
        console.log(`Product Name: ${this.state.productName}, Password: ${this.state.productPrice}`);

        // Package Data to be sent in the Post Request Body
        let data = {
            productName: this.state.productName,
            productPrice: this.state.productPrice
        };

        // Define Call to Server Side utils to post body to the backend server:
        // let updateProduct = (data) => {
        //     console.log('IN LOGIN CALL');
        //     API.login(data)
        //         .then(res => {
        //               this.setState( { token: res.token});
        //             console.log("RES:", res);
        //         })
        //         .catch(err => console.log(err));
        // };

        // Execute register
        // updateProduct(data);

        // Reset state variables after submit
        this.setState({
            productName: '',
            productValue: ''
        });
    }

    componentDidMount() {
        if (this.props.match.params.product_id) {
            const {product_id} = this.props.match.params;
            console.log("Product_ID:", product_id);
        }
    }
    render() {
        return (
            <React.Fragment>
                <ProductUpdateForm
                    changeHandler={this.changeHandler}
                    clickHandler={this.clickHandler}
                    productName={this.state.productName}
                    productPrice={this.state.productPrice} 
                    />
            </React.Fragment>
        )
    }
} // class

export default ProductUpdateContainer;