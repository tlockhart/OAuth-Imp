import React, { Component } from "react";
// import "../style.css";
// import CarouselPage from "../components/Carousel";
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Server-Side Utilities:
import API from '../utils/API';

// Import Components
// import ProductForm from "../components/ProductsOLD";
import ProductListItem from "../components/ProductListItem";

import dataStore from "../utils/dataStore";


class ProductsListContainer extends Component {
    constructor(props) {
        super(props);
        this._productsList = [];
        this.state = {
            products: '',
            message: ''
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

    set productsList(data) {
        let products = data;
        // let filterClickHandler = this.filterClickHandler;

        console.log("in get", products, "length", products.length);

        // Set productsList from response data
        
        this._productsList = products.map((product) => {
            return (<ProductListItem key={product._id} id={product._id} name={product.name} value={product.value} filterClickHandler={ (event)=>this.filterClickHandler(event) } deleteClickHandler = {(event)=>this.deleteClickHandler(event)} />) 
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
        event.preventDefault();
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

    async deleteProduct(url, accessToken, refresh_token, expired) {
        console.log('IN DELETE PRODUCT CALL');
        await API.deleteProduct(url, accessToken, refresh_token, expired)
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

    async deleteClickHandler(event) {
        try{
            event.preventDefault();
            let id = event.target.id;
            let { access_token, refresh_token, expiration } = await dataStore.getLocalStorage();
            refresh_token = 'norefresh';
            let authToken = "Bearer " + access_token;
            let url = `/products/product/delete/${id}`;

            // delete record
            await  this.deleteProduct(url, authToken, refresh_token, expiration);
        }
        catch (err) {
            console.log("ERROR:", err.response);
            // console.log("Caught Authentiation Error 2", err);
            console.log("User is logged out");
            this.setState({message: "User is logged out"});
        }      
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