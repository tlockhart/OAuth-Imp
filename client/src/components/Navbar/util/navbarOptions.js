import React from "react"; // interpret react
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, NavLink
} from "mdbreact";
// {/* <MDBNavLink name="Products" to="/products" >Products
//             </MDBNavLink> */}

export const navbarOptions = (props) => {
  return [
    {
      homeActiveTag: (
        <MDBNavItem active onClick={props.handlePageClick}>
          <NavLink name="Home" to={"/"}>Home</NavLink>
        </MDBNavItem>
      ),
      homeInactiveTag: (
        <MDBNavItem onClick={props.handlePageClick}>
          <NavLink name="Home" to="/">Home</NavLink>
        </MDBNavItem>
      ),
      productsActiveTag: (
        <MDBNavItem active onClick={props.handlePageClick}>
          <NavLink name="Products" to="/products" >Products
            </NavLink>
        </MDBNavItem>
      ),
      productsInactiveTag: (
        <MDBNavItem onClick={props.handlePageClick}>
          <NavLink name="Products" to="/products">Products
            </NavLink>
        </MDBNavItem>
      ),
      insertActiveTag: (
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
                    props.handlePageClick}
                >Insert</MDBDropdownItem>
              </NavLink>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>
      ),
      insertInactiveTag: (
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
                  onClick={props.handlePageClick}
                >
                  Insert
                    </MDBDropdownItem>
              </NavLink>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>
      ),
      registrationActiveTag: (
        <NavLink to="/user/registration">
          <MDBDropdownItem
            active
            name="Registration"
            onClick={props.handlePageClick}
          >Register</MDBDropdownItem>
        </NavLink>
      ),
      registrationInactiveTag: (
        <NavLink to="/user/registration">
          <MDBDropdownItem
            name="Registration"
            onClick={props.handlePageClick}
          >Register</MDBDropdownItem>
        </NavLink>
      ),
      loginActiveTag: (
        <NavLink to="/user/login">
          <MDBDropdownItem
            active
            name="Login"
            onClick={props.handlePageClick}
          >Login</MDBDropdownItem>
        </NavLink>
      ),
      loginInactiveTag: (
        <NavLink to="/user/login">
          <MDBDropdownItem
            name="Login"
            onClick={props.handlePageClick}
          >Login</MDBDropdownItem>
        </NavLink>
      ),
      logoutActiveTag: (
        <NavLink to="#">
          <MDBDropdownItem
            active
            name="Logout"
            onClick={props.handlePageClick}>Logout</MDBDropdownItem>
        </NavLink>
      ),
      logoutInactiveTag: (
        <NavLink to="#">
          <MDBDropdownItem
            name="Logout"
            onClick={props.handlePageClick}>Logout</MDBDropdownItem>
        </NavLink>
      )
    }
  ];
}
