import React, { Component } from "react";

// Import Components
import Home from "../components/Home";

class HomeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // refreshNav: this.props.location.refreshNav,
            // redirect: this.props.location.redirect,
            // reload: this.props.reload
        };
        // const refreshNav = this.props.location.refreshNav;
        // const redirect = this.props.location.redirect;
        // console.log(`refreshnav: ${this.props.location.refreshNav}, redirect: ${this.props.location.redirect}`);
    } // constructor

    componentDidMount() {
        // if (this.state.redirect) {
        //     console.log("IN INDEX AGAIN");
        //     this.setState({ refreshNav: false });
        // }//if
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