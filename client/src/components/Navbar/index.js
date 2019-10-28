import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
// import { BrowserRouter as Router } from 'react-router-dom';

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  // activeLink = (value) => {
  //   // this.props.currentPage = value;
  //   // console.log("activeLink clicked:", value);
  //   return (<MDBNavItem active>
  //     <MDBNavLink to="/" name ="Home" onClick={(event) => this.props.handlePageClick(event)}>Home</MDBNavLink>
  //   </MDBNavItem>);
  // }
  // inactiveLink = (value) => {
  // this.props.currentPage = value;
  // console.log("inactiveLink clicked:", value);
  // return (<MDBNavItem >
  //   <MDBNavLink to="/products" name="Products" onClick={(event) => this.props.handlePageClick(event)}>Products</MDBNavLink>
  // </MDBNavItem>)
  // }

  render() {

    let isHomeActive = this.props.currentPage === '' || this.props.currentPage === "Home" ? true : false;
    // console.log( "is home active", isHomeActive);

    let homeActiveTag = (<MDBNavItem active name="Home" onClick={(event) => this.props.handlePageClick(event)}><MDBNavLink to={"/"} >Home</MDBNavLink></MDBNavItem>);

    let homeInactiveTag = <MDBNavItem>
      <MDBNavLink to="/" name="Home" onClick={(event) => this.props.handlePageClick(event)}>Home</MDBNavLink>
    </MDBNavItem>


    let isProductsActive = this.props.currentPage === "Products" ? true : false;
    // console.log( "is Products active", isProductsActive);

    let productsActiveTag = (<MDBNavItem active name="Products" onClick={(event) => this.props.handlePageClick(event)}><MDBNavLink to="/products" >Products</MDBNavLink></MDBNavItem>);

    let productsInactiveTag = (<MDBNavItem>
      <MDBNavLink to="/products" name="Products" onClick={(event) => this.props.handlePageClick(event)}>Products</MDBNavLink>
    </MDBNavItem>);

    return (
      // <Router>
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>

            {/* {this.props.currentPage === "Home" ? activeLink("Home") : inactiveLink("Home")} */}

            {isHomeActive ? homeActiveTag : homeInactiveTag}


            {isProductsActive ? productsActiveTag : productsInactiveTag}

            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBNavLink to="/user/registration">
                    <MDBDropdownItem>Register</MDBDropdownItem>
                  </MDBNavLink>
                  <MDBNavLink to="/user/login">
                    <MDBDropdownItem>Login</MDBDropdownItem>
                  </MDBNavLink>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
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
                  <MDBNavLink to="/user/registration">
                    <MDBDropdownItem>Register</MDBDropdownItem>
                  </MDBNavLink>
                  <MDBNavLink to="/user/login">
                    <MDBDropdownItem>Login</MDBDropdownItem>
                  </MDBNavLink>
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