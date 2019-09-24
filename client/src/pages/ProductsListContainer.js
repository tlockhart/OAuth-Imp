import React, { Component } from "react";
// import "../style.css";
// import CarouselPage from "../components/Carousel";
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
// import ProductForm from "../components/ProductsOLD";
import ProductListItem from "../components/ProductListItem";


class ProductsListContainer extends Component {
    constructor(props) {
        super(props);
        let _productsComponent = [];
        this.state = {
            products: '',
        };

        // this.clickHandler = this.clickHander.bind(this);
    } // constructor
    
    componentDidMount() {
        let baseURL = "/products";

        let returnProducts = (baseURL) => {
            API.getProducts(baseURL)
            .then(res => {
                // callback to store state variables
                // cb(res);
                console.log(res);
                // this.setState({products: res.data.products});
                this.ProductsComponent = res.data.products;
            })
            .catch(err => console.log(err));
        };

        // Execute getProducts
        returnProducts(baseURL);
    }

    set ProductsComponent(data) {
        let productsData = data;
        console.log("in get", productsData, "length", productsData.length);
        this._productsComponent = productsData.map((productData) => {
            return <ProductListItem key={productData._id} id={productData._id} name={productData.name} value={productData.value} /> 
        });
        
        this.setState(
            {
                products: this._productsComponent
            });
        console.log('productsComponent', this.state.products);
        // return ProductsComponent;
        // return 1;
    }

    get productsComponent() {
        return this._productsComponent;
    }
    
    // clickHander(event) {
    //     event.preventDefault();
        // getProducts = (cb) => {
        
    // } // clickHandler

    
    render() {
        
        const productsComponent = this.state.products;

        console.log('components:', productsComponent);
        return (
            <React.Fragment>
                {/* <ProductForm  */}
                {/* // clickHandler={this.clickHandler} 
                // /> */}
                {productsComponent}
            </React.Fragment>
        )
    }
} // class

export default ProductsListContainer;