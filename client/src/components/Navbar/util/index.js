import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, NavLink
} from "mdbreact";
// import { BrowserRouter as Router } from 'react-router-dom';
import * as auth from '../../utils/authenticationStore';
import Can from "../Can";
import { Timestamp } from "mongodb";
import history from "../../history";
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {navbars} from './util/navbarOptions';

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshNav: this.props.refreshNav,
      isOpen: false,
      role: this.props.role,
      reload: this.props.reload,
      redirect: false,
      loggedOut: false,
      navbar: navbars
    };
  }// constructor

  componentDidMount() {
    console.log("NAVBAR: DIDMOUNT componentDidMount");
    console.log("NAVBAR: DIDMOUNT state.RELOAD:", this.state.reload);
    console.log("NAVBAR: DIDMOUNT state.Role:", this.state.role);
    console.log("NAVBAR: DIDMOUNT props.Role:", this.props.role);
    console.log("NAVBAR: DIDMOUNT state.loggedOut:", this.state.loggedOut);
    console.log("Navbar: DIDMOUNT ComponentDIDMOUNT");

    // 05/25/2020: Set reload back to false in  and set role in App.js
    this.props.fetchRole("Navbar", false, this.state.role);
  }//componentdidMount

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidUpdate() {
    /***********************
   * 05/25/2020
   * 1) Trigger refresh on login and logout
    /************************************** */

    if (this.props.currentPage === "Logout") {
      // When credentials are cleared force password reset, since no new page is displayed
      console.log("Navbar In LOGOUT1")

      //Clear Credentails on Logout
      auth.resetLocalStorage();
      //Reset props.role to visitor
      // this.props.fetchRole("Navbar", false, 'visitor');

      //Redirect to home
      // console.log("NavBar: DidUpdate, props.IsOpen:", this.props.isOpen);
      // console.log("NavBar: DidUpdate,  props.role:", this.props.role);
      // console.log("NavBar: DidUpdate,  props.reload:", this.props.reload);
      // console.log("NavBar: DidUpdate,  state.loggedOut:", this.state.loggedOut);
      // console.log("NavBar: DidUpdate,  state.Role:", this.state.role);
      // Part1: User just hit logout button, change the state to reload the page,  If Props set to admin, or user, then change to state to visitor to make them mismatch
      // if (!this.state.loggedOut && this.state.role === this.props.role) {
      //   console.log("Navbar IN LOGOUT2")
      //   this.setState(
      //     {
      //       loggedOut: true,
      //       role: "visitor",
      //       redirect: "true"
      //     }
      //   );
        /**************TEMP 0528/2020*****************/        
        // console.log("PROPS", this.props);
        // // REDIRECT TO HOME 
        // // set Redirect to true and refreshNav to true
        // this.props.redirectHome();
        /***********************************/
      // }
    }
    //Part2: Intercept mismatch role and prompt to Trigger a navigation update when the props.role has been updated, but state.role has not
    /****************************************************************/
    if (this.props.role && this.props.reload && (!this.state.role || this.props.role != this.state.role)) {
      console.log("Part2: No State role:", this.state.role, `props.role: ${this.state.role}`);
      //set new state
      this.setState(
        {
          reload: false,
          //Stop this condition, but can set role to admin
          role: this.props.role
        });
    }

    // /****************************************************************/
  }//componentDidUpdate

  render() {

    let isHomeActive = this.props.currentPage === "Home" || this.props.name === "Home" ? true : false;

    let isProductsActive = this.props.currentPage === "Products" || this.props.name === "Products" ? true : false;
    // console.log( "is Products active", isProductsActive);

    let isInsertActive = this.props.currentPage === "Insert" || this.props.name === "Insert" ? true : false;

    let isRegistrationActive = this.props.currentPage === "Registration" || this.props.name === "Registration" ? true : false;

    let isLoginActive = this.props.currentPage === "Login" || this.props.name === "Login" ? true : false;

    let isLogoutActive = this.props.currentPage === "Logout" || this.props.name === "Logout" ? true : false;

    
    // if there is not role set the role to visitor to display nav bar
    // if (!this.state.role  && !this.state.redirect) {
    //   this.setState(
    //     {
    //       role: "visitor",
    //     })
    //   console.log("No STATE ROLE", this.state.role);
 
    // }
    var userRole = this.state.role;
    console.log("NAVBAR CONTAINER: userRole =", userRole);

    /***TEMP 5/28/2020 *************/
    // else if(this.state.redirect) {
    //   console.log(`WHY AM I RELOADING THE FIRST TIME role: ${this.state.role}, redirect: ${this.state.redirect}`);
    //   return <Redirect 
    //   to='/' 
    //   refreshNav={true}/>
    // }
    /*************************** */
    return (
      <MDBNavbar color="default-color dark" expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>

            <Can
              role={userRole}
              perform="home-page:visit"
              yes={() => (
                <>
                  {isHomeActive ? this.state.navbar.homeActiveTag : this.state.navbar.homeInactiveTag}
                </>)}
              no={
                () => (<React.Fragment></React.Fragment>)
              }
            />

            <Can
              role={userRole}
              perform="products:view"
              yes={() => (
                <>
                  {isProductsActive ? this.state.navbar.productsActiveTag : this.state.navbar.productsInactiveTag}
                </>)}
              no={
                () => (<></>)
              }
            />
            <Can
              role={userRole}
              perform="products:insert"
              yes={() => (
                <>
                  {isInsertActive ?
                    this.state.navbar.insertActiveTag :
                    this.state.navbar.insertInactiveTag}
                </>
              )}
              no={() => (
                <></>
              )
              } />
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="twitter" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="google-plus-g" />
              </MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right>
                  {
                    isRegistrationActive ?
                      this.state.navbar.registrationActiveTag :
                      this.state.navbar.registrationInactiveTag
                  }
                  {
                    isLoginActive ?
                      this.state.navbar.loginActiveTag :
                      this.state.navbar.loginInactiveTag
                  }
                  {
                    isLogoutActive ?
                      this.state.navbar.logoutActiveTag :
                      this.state.navbar.logoutInactiveTag
                  }
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  } //render
}

export default NavbarPage;