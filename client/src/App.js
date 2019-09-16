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
import ProductContainer from './pages/ProductsContainer';
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
          <Route exact path="/products" component={ProductContainer} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
