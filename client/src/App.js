import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// Handle Routes
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Router, Route, Switch } from "react-router-dom";

// Import Components
// import Navbar from './components/Navbar';
import Navbar from './components/Navbar';
// import MainContent from './components/MainContent';
import Footer from './components/Footer';
import history from "./history";


// Import Pages
import HomeContainer from './pages/HomeContainer';
import ProductsListContainer from './pages/ProductsListContainer';
import ProductViewContainer from './pages/ProductViewContainer';
import ProductUpdateContainer from './pages/ProductUpdateContainer';
import ProductInsertContainer from './pages/ProductInsertContainer/';
import RegistrationContainer from './pages/RegistrationContainer';
import LoginContainer from './pages/LoginContainer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: '',
      name: '',
      refreshButtons: null,
      // toggle: false
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  async handlePageClick(event) {
    // No preventDefault Here:  It will not allow page to transition to insert form, with a dropdownitem
    // event.preventDefault();
    // event.persist();

    this.setState({
      currentPage: event.target.name,
      name: event.target.name
    });
    console.log("event.target.name:", event.target.name, " EventTarget:", event.target);

    //01/04/2020:
    console.log("PageClicked: ", this.state.currentPage);
    if (event.target.name === "Products") {
      // window.location.reload();
      console.log("PRODUCT VIEW Originally refreshButton:", this.state.refreshButtons);
      // let toggle = this.state.toggle;
      // console.log("TOGGLE1:", toggle);
      // toggle = !toggle;
      // console.log("TOGGLE2:", toggle);
      // this.setState({toggle: toggle});
      // console.log("PRODUCT VIEW toggle state:", this.state.toggle);
    }


  }

  render() {
    // let toggle = this.state.toggle.toString();
    return (
      <Router history={history}>
        <div>
          {/* Refresh={toggle} */}
          <Navbar
            handlePageClick={this.handlePageClick}
            navItems={this.state.navItems}
            currentPage={this.state.currentPage}
            name={this.state.name} />
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/user/registration" component={RegistrationContainer} />
            <Route exact path="/user/login" component={LoginContainer} />
            <Route exact path="/products/product/update/:product_id" component={ProductUpdateContainer} />
            <Route exact path="/product/insert" component={ProductInsertContainer} />
            <Route exact path="/products/product/:product_id" component={ProductViewContainer} />
            <Route exact path="/products" component={ProductsListContainer} />
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  } // render
}

export default App;
