import React, { Component } from "react";
// import "../style.css";
// import CarouselPage from "../components/Carousel";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
import ProductForm from "../components/ProductsOLD";
import ProductList from "../components/ProductList";


class ProductContainer extends Component {
    constructor(props) {
        super(props);
        let _productListComponents = [];
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
                this.productListComponents = res.data.products;
            })
            .catch(err => console.log(err));
        };

        // Execute getProducts
        returnProducts(baseURL);
    }

    set productListComponents(data) {
        let productsData = data;
        console.log("in get", productsData, "length", productsData.length);
        this._productListComponents = productsData.map((productData) => {
            return <ProductList key={productData._id} id={productData._id} name={productData.name} price={productData.price} /> 
        });
        
        this.setState({products: this._productListComponents});
        console.log('productListComponent', this.state.products);
        // return productListComponents;
        // return 1;
    }

    get productListComponents() {
        return this._productListComponents;
    }
    
    // clickHander(event) {
    //     event.preventDefault();
        // getProducts = (cb) => {
        
    // } // clickHandler

    
    render() {
        
        const productComponents = this.productListComponents;
        console.log('components:', productComponents);
        return (
            <React.Fragment>
                {/* <ProductForm  */}
                {/* // clickHandler={this.clickHandler} 
                // /> */}
                {productComponents}
            </React.Fragment>
        )
    }
} // class

export default ProductContainer;