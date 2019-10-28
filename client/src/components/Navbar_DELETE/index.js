import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";
// import NavbarDDL from '../NavbarDDL';
// MDBCollapse, MDBNavItem, MDBNavLink, MDBDropdown,
// MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,
// MDBIcon} from 'mdbreact';

let Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className={window.location.pathname === "/" ? 'active nav-link' : 'nav-link'}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user/registration" className={window.location.pathname === "/user/registration" ? 'active nav-link' : 'nav-link'}>Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user/login" className={window.location.pathname === "/user/login" ? 'active nav-link' : 'nav-link'}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/products" className={window.location.pathname === "/products" ? 'active nav-link' : 'nav-link'}>Products</Link>
                    </li>
                    <li className="nav-item">
                    </li>
                    <li className="nav-item">
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                    </li>
                    <li className="nav-item">
                        <NavbarDDL/>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;