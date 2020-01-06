import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// Handle Routes
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import Components
// import Navbar from './components/Navbar';
import Navbar from './components/Navbar';
// import MainContent from './components/MainContent';
import Footer from './components/Footer';


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
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(event) {
    // No preventDefault Here:  It will not allow page to transition to insert form, with a dropdownitem
    // event.preventDefault();

    this.setState({
      currentPage: event.target.name,
      name: event.target.name
    });
    console.log("event.target.name:", event.target.name, " EventTarget:", event.target);

    //01/04/2020:
    console.log("PageClicked: ", this.state.currentPage);

    
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar
            handlePageClick={this.handlePageClick}
            navItems={this.state.navItems}
            currentPage={this.state.currentPage}
            name={this.state.name} />
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/user/registration" component={RegistrationContainer} />
          <Route exact path="/user/login" component={LoginContainer} />
          <Route exact path="/products/product/update/:product_id" component={ProductUpdateContainer} />
          {/* <Route exact path="/products/product/insert" component={ProductInsertContainer} /> */}
          <Route exact path="/product/insert" component={ProductInsertContainer} />
          {/* <Route exact path="/products/product/delete/:product_id" component={ProductUpdateContainer} /> */}
          <Route exact path="/products/product/:product_id" component={ProductViewContainer} />
          <Route exact path="/products" component={ProductsListContainer} />
          <Footer />
        </div>
      </Router>
    );
  } // render
}

export default App;
