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
            // order: [],
            refreshNav: this.props.location.refreshNav,
            redirect: this.props.location.redirect
        };
        // const refreshNav = this.props.location.refreshNav;
        // const redirect = this.props.location.redirect;
        console.log(`refreshnav: ${this.props.location.refreshNav}, redirect: ${this.props.location.redirect}`);
        // this.onCLick = this.onCLick.bind(this);
    } // constructor

    componentDidMount() {
        if(this.state.reload === false && this.state.refreshNav){
            // if(this.refreshNav && this.reload){
                console.log("IN INDEX AGAIN");
        //     console.log("Back AT HOME! currentPage: ", this.props.currentPage,"state role:;", this.state.role);
        //     console.log("NAVBAR: DIDMOUNT state.RELOAD:", this.state.reload);
        //   console.log("NAVBAR: DIDMOUNT state.Role:", this.state.role);
        //   console.log("NAVBAR: DIDMOUNT state.loggedOut:", this.state.loggedOut);
            // window.location.reload();
            // 05/25/2020: Set reload back to false in App.js
          this.props.fetchRole("Navbar", false, this.state.role);
          this.setState({refreshNav: false});
            // }//if
        }//if
    }
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
                <Home />
            </React.Fragment>
        )
    }
} // class

export default HomeContainer;