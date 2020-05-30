import React, { Component } from 'react';
// Handle Routes
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Router, Route, Switch } from "react-router-dom";
// import { Router } from 'react-router';

// import logo from './logo.svg';
import './App.css';
// import MainContent from './components/MainContent';
import Footer from './components/Footer';
// Import Components
// import Navbar from './components/Navbar';
import Navbar from './components/Navbar';
import history from "./history";
// Import Pages
import HomeContainer from './pages/HomeContainer';
import LoginContainer from './pages/LoginContainer';
import ProductInsertContainer from './pages/ProductInsertContainer/';
import ProductsListContainer from './pages/ProductsListContainer';
import ProductUpdateContainer from './pages/ProductUpdateContainer';
import ProductViewContainer from './pages/ProductViewContainer';
import RegistrationContainer from './pages/RegistrationContainer';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';





class App extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: '',
      name: '',
      refreshButtons: null,
      role: '',
      reload: false,
      refreshPage: false
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.fetchRole = this.fetchRole.bind(this);
    this.redirectHome = this.redirectHome.bind(this);
  }

  redirectHome (){
    //IMPORTANT: Redirect to the selected organization's page.
    console.log("Called REDIRECT HOME", this.props);
    history.push({
      pathname: '/', 
      refreshNav: true,
      redirect: true
    });
    this.setState({refreshPage: true});
    console.log("refreshPage:", this.state.refreshPage);
  }

  fetchRole(myComponent, state, role) {
    this.setState({ reload: state });
    this.setState({ role: role });

    console.log("Passing fetchRole");
    console.log("RELOAD B4 Set:", `component: ${myComponent} reload: ${this.state.reload} role: ${this.state.role}`);
    if (this.state.reload === true) {

      console.log("App.js FetchRole executing, RELOAD:", this.state.reload);
    }
    console.log("RELOAD After Set:", this.state.reload);
  }

  async handlePageClick(event) {
    // No preventDefault Here:  It will not allow page to transition to insert form, with a dropdownitem
    // event.preventDefault();
    // event.persist();
    console.log("HANDLEPAGECLICK: " + JSON.stringify(event.target.name));
    this.setState({
      currentPage: event.target.name,
      name: event.target.name
    });
    console.log("event.target.name:", event.target.name, " EventTarget:", event.target);

    //01/04/2020:
    console.log("PageClicked: ", "*" + this.state.currentPage + "*");
  
    if (event.target.name === "Products") {
      console.log("PRODUCT VIEW Originally refreshButton:", this.state.refreshButtons);
    }
    else if (event.target.name === "") {
      console.log("Pushing from page:", "*" + this.state.currentPage + "*");
      
    }
    else
      console.log("On PAGE:", "*" + this.state.currentPage + "*");
  }

  componentDidUpdate() {
    console.log("APPJS JUST UPDATED!");
  }
  render() {
    return (
      <Router history={history}>
        {/* <Router> */}
        <div>
          {/* Refresh={toggle} */}
          <Navbar
            handlePageClick={this.handlePageClick}
            navItems={this.state.navItems}
            currentPage={this.state.currentPage}
            name={this.state.name}
            role={this.state.role}
            reload={this.state.reload}
            fetchRole={this.fetchRole}
            redirectHome={this.redirectHome}  />

          <Switch>
            {/* <Route exact path="/" component={HomeContainer} /> */}
            <Route 
              exact 
              path="/" 
              render={(props) => 
                <HomeContainer {...props}
                  fetchRole={this.fetchRole}
                />
              } 
            />
            <Route exact path="/user/registration" component={RegistrationContainer} />
            <Route exact path="/user/login" component={LoginContainer} />
            <Route exact path="/products/product/update/:product_id" component={ProductUpdateContainer} />
            <Route exact path="/product/insert" component={ProductInsertContainer} />
            <Route exact path="/products/product/:product_id" component={ProductViewContainer} />
            {/* <Route exact path="/products/" component={ProductsListContainer} /> */}
            <Route
              exact
              path="/products/"
              render={(props) => <ProductsListContainer {...props}
                fetchRole={this.fetchRole} />}
            />
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  } // render
}

export default App;
