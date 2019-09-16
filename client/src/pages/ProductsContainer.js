import React, { Component } from "react";
// import "../style.css";
// import CarouselPage from "../components/Carousel";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
import ProductForm from "../components/Products";
import ProductList from "../components/ProductList";


class ProductsContainer extends Component {
    constructor(props) {
        super(props);
        let _productListComponents = [];
        this.state = {
            products: '',
        };

        this.clickHandler = this.clickHander.bind(this);
    } // constructor

    set productListComponents(data) {
        let productsData = data.data.products;
        console.log("in get", productsData, "length", productsData.length);
        this._productListComponents = productsData.map((productData) => {
            return <ProductList key={productData._id} name={productData.name} price={productData.price}/>
        });
        console.log('productListCom', this._productListComponents);
        this.setState({products: this._productListComponents})
        // return productListComponents;
        // return 1;
    }

    get productListComponents() {
        return this._productListComponents;
    }
    
    clickHander(event) {
        event.preventDefault();
        // getProducts = (cb) => {
        let baseURL = "/products";

        let returnProducts = (baseURL) => {
            API.getProducts(baseURL)
            .then(res => {
                // callback to store state variables
                // cb(res);
                console.log(res);
                // this.setState({products: res.data.products});
                this.productListComponents = res;
            })
            .catch(err => console.log(err));
        };

        // Execute getProducts
        returnProducts(baseURL);
    } // clickHandler

    
    render() {
        
        const productComponents = this.productListComponents;
        console.log('components:', productComponents);
        return (
            <React.Fragment>
                <ProductForm 
                clickHandler={this.clickHandler} />
                {productComponents}
            </React.Fragment>
        )
    }
} // class

export default ProductsContainer;