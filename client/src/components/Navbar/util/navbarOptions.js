// {/* <MDBNavLink name="Products" to="/products" >Products
//             </MDBNavLink> */}
            
    export const navbars= [
    {
        homeActiveTag: (
          <><MDBNavItem active onClick={this.props.handlePageClick}>
            <NavLink name="Home" to={"/"}>Home</NavLink>
          </MDBNavItem></>
        ),
        homeInactiveTag: (
          `<MDBNavItem onClick={this.props.handlePageClick}>
            <NavLink name="Home" to="/">Home</NavLink>
          </MDBNavItem>`
        ),
        productsActiveTag: (
          `<MDBNavItem active onClick={this.props.handlePageClick}> 
            <NavLink name="Products" to="/products" >Products
            </NavLink>
          </MDBNavItem>`
        ),
        productsInactiveTag: (
          `<MDBNavItem onClick={this.props.handlePageClick}>
            <NavLink name="Products" to="/products">Products
            </NavLink>
          </MDBNavItem>`
        ),
        insertActiveTag: (
          `<MDBNavItem>
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
          </MDBNavItem>`
        ),
        insertInactiveTag: (
          `<MDBNavItem>
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
          </MDBNavItem>`
        ),
        registrationActiveTag: (
          `<NavLink to="/user/registration">
            <MDBDropdownItem
              active
              name="Registration"
              onClick={this.props.handlePageClick}
            >Register</MDBDropdownItem>
          </NavLink>`
        ),
        registrationInactiveTag: (
          `<NavLink to="/user/registration">
            <MDBDropdownItem
              name="Registration"
              onClick={this.props.handlePageClick}
            >Register</MDBDropdownItem>
          </NavLink>`
        ),
        loginActiveTag: (
          `<NavLink to="/user/login">
            <MDBDropdownItem
              active
              name="Login"
              onClick={this.props.handlePageClick}
            >Login</MDBDropdownItem>
          </NavLink>`
        ),
        loginInactiveTag: (
          `<NavLink to="/user/login">
            <MDBDropdownItem
              name="Login"
              onClick={this.props.handlePageClick}
            >Login</MDBDropdownItem>
          </NavLink>`
        ),
        logoutActiveTag: (
          `<NavLink to="#">
            <MDBDropdownItem
              active
              name="Logout"
              onClick={this.props.handlePageClick}>Logout</MDBDropdownItem>
          </NavLink>`
        ),
        logoutInactiveTag: (
          `<NavLink to="#">
            <MDBDropdownItem
              name="Logout"
              onClick={this.props.handlePageClick}>Logout</MDBDropdownItem>
          </NavLink>`
        )
      }
];
      