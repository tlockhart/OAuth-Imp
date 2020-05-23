import React, { Component } from "react";
// import "../style.css";
// import CarouselPage from "../components/Carousel";
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
// import ProductForm from "../components/ProductsOLD";
import ProductViewItem from "../components/ProductViewItem";


class ProductViewContainer extends Component {
    _productListComponent = [];
    constructor(props) {
        super(props);
        this.state = {
            products: '',
        };
    } // constructor

    componentDidMount() {
        // Option1: Simple limiting
        // const { product_id } = this.props.match.params;
        // console.log('ID', product_id);

        if (this.props.location.state) {
            // Option2: Can pull more complex properties
            const { id } = this.props.location.state;
            console.log('ID:', id);


            let baseURL = `/api/products/${id}`;
            console.log("baseline:", baseURL);

            let returnProduct = (baseURL) => {
                API.getProduct(baseURL)
                    .then(res => {
                        console.log(res);
                        //setter
                        this.productListComponent = { ...res.data, _id: id };
                    })
                    .catch(err => console.log(err));
            };

            // Execute getProducts
            returnProduct(baseURL);
        }
    }

    set productListComponent(data) {
        let productData = data;
        console.log("in get", productData, "length", productData.length);
        this._productListComponent = <ProductViewItem 
        image = {productData.productImage} key={productData._id} id={productData._id} name={productData.name} value={productData.value} />;

        this.setState({ products: this._productListComponent });
        console.log('productListComponent', this.state.products);
    }

    get productListComponent() {
        return this._productListComponent;
    }

    render() {

        const ProductListComponent = this.productListComponent;
        console.log('components:', ProductListComponent);
        return (
            <React.Fragment>
                {ProductListComponent}
            </React.Fragment>
        )
    }
} // class

export default ProductViewContainer;