import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, NavLink
} from "mdbreact";
// import { BrowserRouter as Router } from 'react-router-dom';
import * as auth from '../../utils/authenticationStore';
import Can from "../Can";
import { Timestamp } from "mongodb";


class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      role: this.props.role,
      reload: this.props.reload,
      navItems:
      {
        homeActiveTag: (
          <MDBNavItem active onClick={this.props.handlePageClick}>
            {/* <MDBNavLink name="Home" to={"/"}>Home</MDBNavLink> */}
            <NavLink name="Home" to={"/"}>Home</NavLink>
          </MDBNavItem>
        ),
        homeInactiveTag: (
          <MDBNavItem onClick={this.props.handlePageClick}>
            {/* <MDBNavLink name="Home" to="/">Home</MDBNavLink> */}
            <NavLink name="Home" to="/">Home</NavLink>
          </MDBNavItem>
        ),
        productsActiveTag: (
          <MDBNavItem active onClick={this.props.handlePageClick}>
            {/* <MDBNavLink name="Products" to="/products" >Products
            </MDBNavLink> */}
            <NavLink name="Products" to="/products" >Products
            </NavLink>
          </MDBNavItem>
        ),
        productsInactiveTag: (
          <MDBNavItem onClick={this.props.handlePageClick}>
            {/* <MDBNavLink name="Products" to="/products">Products
            </MDBNavLink> */}
            <NavLink name="Products" to="/products">Products
            </NavLink>
          </MDBNavItem>
        ),
        insertActiveTag: (
          // <MDBNavbarNav left>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline">Admin</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <NavLink
                  to="/product/insert"

                >
                  <MDBDropdownItem active
                    name="Insert"
                    onClick={
                      this.props.handlePageClick}
                  >Insert</MDBDropdownItem>
                </NavLink>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
          // </MDBNavbarNav >
        ),
        insertInactiveTag: (
          // <MDBNavbarNav left>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline">Admin</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <NavLink
                  to="/product/insert"
                >
                  <MDBDropdownItem
                    name="Insert"
                    onClick={this.props.handlePageClick}
                  >
                    Insert
                    </MDBDropdownItem>
                </NavLink>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
          // </MDBNavbarNav>
        ),
        registrationActiveTag: (
          // <MDBNavLink to="/user/registration">
          <NavLink to="/user/registration">
            <MDBDropdownItem
              active
              name="Registration"
              onClick={this.props.handlePageClick}
            >Register</MDBDropdownItem>
            {/* </MDBNavLink> */}
          </NavLink>
        ),
        registrationInactiveTag: (
          // <MDBNavLink to="/user/registration">
          <NavLink to="/user/registration">
            <MDBDropdownItem
              name="Registration"
              onClick={this.props.handlePageClick}
            >Register</MDBDropdownItem>
            {/* </MDBNavLink> */}
          </NavLink>

        ),
        loginActiveTag: (
          <NavLink to="/user/login">
            <MDBDropdownItem
              active
              name="Login"
              onClick={this.props.handlePageClick}
            >Login</MDBDropdownItem>
          </NavLink>
        ),
        loginInactiveTag: (
          <NavLink to="/user/login">
            <MDBDropdownItem
              name="Login"
              onClick={this.props.handlePageClick}
            >Login</MDBDropdownItem>
          </NavLink>
        ),
        logoutActiveTag: (
          <NavLink to="#">
            <MDBDropdownItem
              active
              name="Logout"
              onClick={this.props.handlePageClick}>Logout</MDBDropdownItem>
          </NavLink>
        ),
        logoutInactiveTag: (
          <NavLink to="#">
            <MDBDropdownItem
              name="Logout"
              onClick={this.props.handlePageClick}>Logout</MDBDropdownItem>
          </NavLink>
        )
      }
    };
  }// constructor

  componentDidMount() {
    console.log("NAVBAR componentDidMount");
    console.log("NAVBAR DIDMOUNT STATE RELOAD:", this.state.reload);
    console.log("NAVBAR DIDMOUNT STATE Role:", this.state.role);
    console.log("Navbar: ComponentDIDMOUNT");

    // 05/25/2020: Set reload back to false in App.js
    this.props.fetchRole("Navbar",false, this.state.role);
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidUpdate() {
    /***********************
   * 05/25/2020
   * 1) Trigger refresh on login and logout
    /************************************** */
    // console.log("navbar componentDidUpdate")
    // console.log("NAVBAR currentpage", this.props.currentPage);
    // console.log("NAVBAR DIDUPDATE STATE RELOAD:", this.state.reload);
    // console.log("NAVBAR DIDUPDATE STATE Role:", this.state.role);
    // console.log("NAVBAR PROPS ROLE:", this.props.role);
    // console.log("NAVBAR PROPS RELOAD:", this.props.reload);

    if (this.props.currentPage === "Logout" ) {
      // When credentials are cleared force password reset, since no new page is displayed
      console.log("Navbar In LOGOUT")
      auth.resetLocalStorage();
      window.location.reload();
    }
    //05/25/2020: Trigger a navigation update when the props.role has been updated, but state.role has not
    /****************************************************************/
    if (this.props.role && this.props.reload && (!this.state.role || this.props.role !== this.state.role)) {
      console.log("Navbar: ComponentDIDUPDATE");
      //set new state
      this.setState(
        {
          reload: this.props.reload,
          role: this.props.role
        });
    }
    /****************************************************************/
  }

  render() {

    let isHomeActive = this.props.currentPage === "Home" || this.props.name === "Home" ? true : false;

    let isProductsActive = this.props.currentPage === "Products" || this.props.name === "Products" ? true : false;
    // console.log( "is Products active", isProductsActive);

    let isInsertActive = this.props.currentPage === "Insert" || this.props.name === "Insert" ? true : false;

    let isRegistrationActive = this.props.currentPage === "Registration" || this.props.name === "Registration" ? true : false;

    let isLoginActive = this.props.currentPage === "Login" || this.props.name === "Login" ? true : false;

    let isLogoutActive = this.props.currentPage === "Logout" || this.props.name === "Logout" ? true : false;

    // if (this.state.loading === true) {
    //   console.log('loading...');
    //   return <h2>Loading...</h2>;
    //   // return <UploadSpinner />
    // }
    // else {
      var userRole = this.state.role;
      console.log("NAVBAR CONTAINER: userRole =", userRole);
      return (
        // <Router>
        <MDBNavbar color="default-color dark" expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">Navbar</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <Can
            role={userRole}
            perform="dashboard-page:visit"
            yes={() => (
            <MDBNavbarNav left>

              {isHomeActive ? this.state.navItems.homeActiveTag : this.state.navItems.homeInactiveTag}

              {isProductsActive ? this.state.navItems.productsActiveTag : this.state.navItems.productsInactiveTag}

                {isInsertActive ?
                  this.state.navItems.insertActiveTag :
                  this.state.navItems.insertInactiveTag}
            
              {/* <React.Fragment> */}
            </MDBNavbarNav>
            )}
            no={() => (
              <MDBNavbarNav left>

              {isHomeActive ? this.state.navItems.homeActiveTag : this.state.navItems.homeInactiveTag}

              {isProductsActive ? this.state.navItems.productsActiveTag : this.state.navItems.productsInactiveTag}
              </MDBNavbarNav>)
              }/>
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
                        this.state.navItems.registrationActiveTag :
                        this.state.navItems.registrationInactiveTag
                    }
                    {
                      isLoginActive ?
                        this.state.navItems.loginActiveTag :
                        this.state.navItems.loginInactiveTag
                    }
                    {
                      isLogoutActive ?
                        this.state.navItems.logoutActiveTag :
                        this.state.navItems.logoutInactiveTag
                    }
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        // </Router>
      );
    // }// else
  } //render
}

export default NavbarPage;