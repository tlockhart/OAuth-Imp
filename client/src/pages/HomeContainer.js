import React, { Component } from "react";
// import "../style.css";
// import CarouselPage from "../components/Carousel";
// import {  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";

// Import Components
import Home from "../components/Home";

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        // this.onCLick = this.onCLick.bind(this);
    } // constructor

    onClick() {
        this.setState(
            {
                collapse: !this.state.collapse,
            }
        );
    } // onClick

    render() {
        return (
            <React.Fragment>
                <Home/>
            </React.Fragment>
        )
    }
} // class

export default HomeContainer;