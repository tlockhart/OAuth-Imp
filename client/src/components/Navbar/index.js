import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, NavLink
} from "mdbreact";
import * as auth from '../../utils/authenticationStore';
import Can from "../Can";


class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      role: this.props.role,
      redirect: this.props.redirect,
      loggedOut: false,
      refreshPage: this.props.refreshPage,

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
      console.log("Navbar In LOGOUT1, currentPage:", this.props.currentPage)

      console.log("NAVBAR: DIDMOUNT componentDidMount");
    console.log("NAVBAR: DIDMOUNT state.Role:", this.state.role);
    console.log("NAVBAR: DIDMOUNT props.Role:", this.props.role);
    console.log("NAVBAR: DIDMOUNT state.loggedOut:", this.state.loggedOut);
    console.log("Navbar: DIDMOUNT ComponentDIDMOUNT");

      /******************************************
       Authorization-Part1:
       ********************* 
       Clear Credentails on 
       Logout making state.role out of sync with 
       prop.role
       ******************************************/
      auth.resetLocalStorage();
      if((this.state.role!= 'visitor') && !this.loggedOut &&this.state.role === this.props.role ){
        console.log("LOGGUER OUT IN NAV")
        this.props.setRole('visitor');
      }
      /******************************************
       Authorization-Part2: 
       *******************
       Catch the out-of-sync props.role and 
       state.role, indicating a logout state
       ******************************************/
      else if((this.state.role != this.props.role) && (this.state.role!= 'visitor') ){
        this.setState({role: 'visitor'});
        this.props.redirectHome();
      }
    }    
  }//componentDidUpdate


  render() {

    let isHomeActive = this.props.currentPage === "Home" || this.props.name === "Home" ? true : false;

    let isProductsActive = this.props.currentPage === "Products" || this.props.name === "Products" ? true : false;

    let isInsertActive = this.props.currentPage === "Insert" || this.props.name === "Insert" ? true : false;

    let isRegistrationActive = this.props.currentPage === "Registration" || this.props.name === "Registration" ? true : false;

    let isLoginActive = this.props.currentPage === "Login" || this.props.name === "Login" ? true : false;

    let isLogoutActive = this.props.currentPage === "Logout" || this.props.name === "Logout" ? true : false;

    var userRole = this.state.role;
    console.log("NAVBAR CONTAINER: userRole =", userRole);

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
                  {isHomeActive ? this.state.navItems.homeActiveTag : this.state.navItems.homeInactiveTag}
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
                  {isProductsActive ? this.state.navItems.productsActiveTag : this.state.navItems.productsInactiveTag}
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
                    this.state.navItems.insertActiveTag :
                    this.state.navItems.insertInactiveTag}
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
    );
  } //render
}

export default NavbarPage;