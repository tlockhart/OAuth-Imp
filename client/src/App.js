import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Handle Routes
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import Components
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

// Import Pages
import HomeContainer from './pages/HomeContainer';
import ProductsContainer from './pages/ProductsContainer';
import ProductContainer from './pages/ProductContainer';
import ProductUpdateContainer from './pages/ProductUpdateContainer';
import SignupContainer from './pages/SignupContainer';
import LoginContainer from './pages/LoginContainer';

class App extends Component {
  render() {
    return (  
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/user/signup" component={SignupContainer} />
          <Route exact path="/user/login" component={LoginContainer} />
          <Route exact path="/products/product/update/:product_id" component={ProductUpdateContainer} />
          <Route exact path="/products/product/:product_id" component={ProductContainer} />
          <Route exact path="/products" component={ProductsContainer} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
