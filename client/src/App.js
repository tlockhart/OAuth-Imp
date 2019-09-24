import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// Handle Routes
import { BrowserRouter as Router, Route} from "react-router-dom";

// Import Components
import Navbar from './components/Navbar';
// import MainContent from './components/MainContent';
import Footer from './components/Footer';

// Import Pages
import HomeContainer from './pages/HomeContainer';
import ProductsListContainer from './pages/ProductsListContainer';
import ProductViewContainer from './pages/ProductViewContainer';
import ProductUpdateContainer from './pages/ProductUpdateContainer';
import RegistrationContainer from './pages/RegistrationContainer';
import LoginContainer from './pages/LoginContainer';

class App extends Component {
  render() {
    return (  
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/user/registration" component={RegistrationContainer} />
          <Route exact path="/user/login" component={LoginContainer} />
          <Route exact path="/products/product/update/:product_id" component={ProductUpdateContainer} />
          <Route exact path="/products/product/:product_id" component={ProductViewContainer} />
          <Route exact path="/products" component={ProductsListContainer} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
