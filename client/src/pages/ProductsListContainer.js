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
        this._productsList = [];
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
                console.log(res);

                // set this._productsList
                this.productsList = res.data.products;
            })
            .catch(err => console.log(err));
        };

        // Execute getProducts
        returnProducts(baseURL);
    }

    async deleteProduct(url, accessToken) {
        console.log('IN UPDATE PRODUCT CALL');
        await API.deleteProduct(url, accessToken)
            .then(res => {
                this.setState({message: "Product deleted"});
            })
            .catch(err => {
                if (err.response.status === 500) {
                    console.log('response:', err.response);
                    console.log('err:', err.message);
                    this.setState({ message: 'Invalid Product' });
                }
            });
    }

    set productsList(data) {
        let products = data;
        // let filterClickHandler = this.filterClickHandler;

        console.log("in get", products, "length", products.length);

        // Set productsList from response data
        
        this._productsList = products.map((product) => {
            return (<ProductListItem key={product._id} id={product._id} name={product.name} value={product.value} filterClickHandler={ (event)=>this.filterClickHandler(event) }/>) 
        });

        //  = list; 
        
        this.setState(
            {
                products: this._productsList
            });
        // console.log('productsList', this.state.products);
        // return productsList;
        // return 1;
    }

    get productsList() {
        return this._productsList;
    }

    filterClickHandler(event) {
        // event.preventDefault();
        const event_id = event.target.id;
        console.log('IN Delete PRODUCT CALL', event_id);

        /******************************************
         *  10/02: ProductsLIst has nothing in it
         * ***************************************/
        console.log("productsList:delete:", JSON.stringify(this.productsList));
        // Using Setters and getters
        let filteredList = this.productsList.filter((product)=>{
            console.log("PRODUCT ID: ", product.props.id);
            if (product.props.id.toString() != event_id.toString()) {
                console.log("MatchingProductID: ", product.props.id);
                let data = {
                    name: product.props.name,
                    value: product.props.value,
                    _id: product.props.id,
                    key: product.props.id
                };
                return data;
            }
        });
        this._productsList = filteredList;
        this.setState({products: this.productsList});
    }
        
    render() {
        
        let productsList = this.state.products;

        // console.log('components:', productsList);
        return (
            <React.Fragment>
                {/* <ProductForm  */}
                {/* // clickHandler={this.clickHandler} 
                // /> */}
                {productsList}
            </React.Fragment>
        )
    }
} // class

export default ProductsListContainer;