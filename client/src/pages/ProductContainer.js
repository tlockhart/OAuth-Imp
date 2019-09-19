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
    } // constructor

    componentDidMount() {
        // Option1: Simple limiting
        // const { product_id } = this.props.match.params;
        // console.log('ID', product_id);

        if (this.props.location.state) {
            // Option2: Can pull more complex properties
            const { id } = this.props.location.state;
            console.log('ID:', id);


            let baseURL = `/products/${id}`;
            console.log("baseline:", baseURL);

            let returnProduct = (baseURL) => {
                API.getProduct(baseURL)
                    .then(res => {
                        console.log(res);
                        this.productListComponents = { ...res.data, _id: id };
                    })
                    .catch(err => console.log(err));
            };

            // Execute getProducts
            returnProduct(baseURL);
        }
    }

    set productListComponents(data) {
        let productData = data;
        console.log("in get", productData, "length", productData.length);
        this._productListComponents = <ProductList key={productData._id} id={productData._id} name={productData.name} price={productData.price} />;

        this.setState({ products: this._productListComponents });
        console.log('productListComponent', this.state.products);
    }

    get productListComponents() {
        return this._productListComponents;
    }

    render() {

        const productComponents = this.productListComponents;
        console.log('components:', productComponents);
        return (
            <React.Fragment>
                {productComponents}
            </React.Fragment>
        )
    }
} // class

export default ProductContainer;