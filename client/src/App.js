import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// Handle Routes
import { BrowserRouter as Router, Route} from "react-router-dom";

// Import Components
// import Navbar from './components/Navbar';
import Navbar from './components/Navbar2';
// import MainContent from './components/MainContent';
import Footer from './components/Footer';

// Import Pages
import HomeContainer from './pages/HomeContainer';
import ProductsListContainer from './pages/ProductsListContainer';
import ProductViewContainer from './pages/ProductViewContainer';
import ProductUpdateContainer from './pages/ProductUpdateContainer';
import ProductInsertContainer from './pages/ProductInsertContainer';
import RegistrationContainer from './pages/RegistrationContainer';
import LoginContainer from './pages/LoginContainer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: '',
  };
  // this.handlePageClick = this.handlePageClick.bind(this);
}

  handlePageClick = (event) => {
    // Will not allow page to refresh normally, causing the state properties to lag
    // event.preventDefault(); 
    console.log("event.target.name", event.target.name);

    this.setState({ currentPage: event.target.name });
    console.log("PageClicked: ", this.state.currentPage);
  };

  render() {
    return (  
      <Router>
        <div>
          <Navbar handlePageClick = {(event) => this.handlePageClick(event) } currentPage = {this.state.currentPage}/>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/user/registration" component={RegistrationContainer} />
          <Route exact path="/user/login" component={LoginContainer} />
          <Route exact path="/products/product/update/:product_id" component={ProductUpdateContainer} />
          <Route exact path="/products/product/insert" component={ProductInsertContainer} />
          {/* <Route exact path="/products/product/delete/:product_id" component={ProductUpdateContainer} /> */}
          <Route exact path="/products/product/:product_id" component={ProductViewContainer} />
          <Route exact path="/products" component={ProductsListContainer} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
