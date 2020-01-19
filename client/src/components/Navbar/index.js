import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, NavLink
} from "mdbreact";
// import { BrowserRouter as Router } from 'react-router-dom';
import * as authenticationStore from '../../utils/authenticationStore';


class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      navItems:
      {
        homeActiveTag: (
          <MDBNavItem active onClick={this.props.handlePageClick}>
            <MDBNavLink name="Home" to={"/"}>Home</MDBNavLink>
          </MDBNavItem>
        ),
        homeInactiveTag: (
          <MDBNavItem onClick={this.props.handlePageClick}>
            <MDBNavLink name="Home" to="/">Home</MDBNavLink>
          </MDBNavItem>
        ),
        productsActiveTag: (
          <MDBNavItem active onClick={this.props.handlePageClick}>
            <MDBNavLink name="Products" to="/products" >Products
            </MDBNavLink>
          </MDBNavItem>
        ),
        productsInactiveTag: (
          <MDBNavItem onClick={this.props.handlePageClick}>
            <MDBNavLink name="Products" to="/products">Products
          </MDBNavLink>
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
          <MDBNavLink to="/user/registration">
            <MDBDropdownItem
              active
              name="Registration"
              onClick={this.props.handlePageClick}
            >Register</MDBDropdownItem>
          </MDBNavLink>
        ),
        registrationInactiveTag: (
          <MDBNavLink to="/user/registration">
            <MDBDropdownItem
              name="Registration"
              onClick={this.props.handlePageClick}
            >Register</MDBDropdownItem>
          </MDBNavLink>
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
          <MDBNavLink to="/user/login">
            <MDBDropdownItem
              name="Login"
              onClick={this.props.handlePageClick}
            >Login</MDBDropdownItem>
          </MDBNavLink>
        ),
        logoutActiveTag: (
          <MDBNavLink to="#">
            <MDBDropdownItem
              active
              name="Logout"
              onClick={this.props.handlePageClick}>Logout</MDBDropdownItem>
          </MDBNavLink>
        ),
        logoutInactiveTag: (
          <MDBNavLink to="#">
            <MDBDropdownItem
              name="Logout"
              onClick={this.props.handlePageClick}>Logout</MDBDropdownItem>
          </MDBNavLink>
        )
      }
    };
  }
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidUpdate() {
    /***********************
   * 01/08/19
   * 1) Convert NavBar to a Component
   * 2) Pass user to productList, which
   * should update the state (buttons)on ProductListItem
   * 3) TO TEST send a user = {role: "admin"} to ProductListItem in constructor and setState on user.
   *********************/

   // set the role
  // this.setState(authenticationStore.getLocalStorage());
  
  // let user = this.setUserState(this.state.email);
  
  // this.setState({user});
/************************************** */

    if (this.props.currentPage === "Logout") {
      // When credentials are cleared force password reset, since no new page is displayed
      authenticationStore.resetLocalStorage();
      // window.location.reload(false);
      window.location.reload();
    }
     
  }

  render() {

    let isHomeActive = this.props.currentPage === "Home" || this.props.name === "Home" ? true : false;

    let isProductsActive = this.props.currentPage === "Products" || this.props.name === "Products" ? true : false;
    // console.log( "is Products active", isProductsActive);

    let isInsertActive = this.props.currentPage === "Insert" || this.props.name === "Insert" ? true : false;

    let isRegistrationActive = this.props.currentPage === "Registration" || this.props.name === "Registration" ? true : false;

    let isLoginActive = this.props.currentPage === "Login" || this.props.name === "Login" ? true : false;

    let isLogoutActive = this.props.currentPage === "Logout" || this.props.name === "Logout" ? true : false;

    return (
      // <Router>
      <MDBNavbar color="default-color dark" expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>

            {isHomeActive ? this.state.navItems.homeActiveTag : this.state.navItems.homeInactiveTag}

            {isProductsActive ? this.state.navItems.productsActiveTag : this.state.navItems.productsInactiveTag}

            {isInsertActive ?
              this.state.navItems.insertActiveTag :
              this.state.navItems.insertInactiveTag}

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
  } //render
}

export default NavbarPage;