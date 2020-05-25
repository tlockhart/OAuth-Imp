import React, { Component } from 'react';
// Handle Routes
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.fetchRole = this.fetchRole.bind(this);
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
            fetchRole={this.fetchRole} />

          <Switch>
            <Route exact path="/" component={HomeContainer} />
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
