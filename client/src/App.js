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
import Navbar from './components/Navbar/index';
import history from "./history";
// Import Pages
import HomeContainer from './pages/HomeContainer';
import LoginContainer from './pages/LoginContainer';
import ProductInsertContainer from './pages/ProductInsertContainer/';
import ProductsListContainer from './pages/ProductsListContainer';
import ProductUpdateContainer from './pages/ProductUpdateContainer';
import ProductViewContainer from './pages/ProductViewContainer';
import RegistrationContainer from './pages/RegistrationContainer';
import * as auth from './utils/authenticationStore';
import UploadSpinner from './components/UploadSpinner';


class App extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: '',
      name: '',
      role: '',
      loading: false,
      redirect: false,
      loggedOut: false
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.redirectHome = this.redirectHome.bind(this);
    this.getRole = this.getRole.bind(this);
    this.setRole = this.setRole.bind(this);
  }//constructor

  componentDidMount(){
    this.getRole();
  }
  setRole(role) {
    this.setState({
      role: role,
      loggedOut: true
    });
  }
  // Taken from productionListContainer
  async getRole() {
    const localStateObj = auth.getLocalStorage();
    console.log("APPJS. LOCALSTATEOBJ:", localStateObj);
    // this.setState(localStateObj);
    console.log("EMAIL:", localStateObj.email);
    const email = localStateObj.email;
    console.log("Navbar Mount3 Email:", email);

    /* Set user role on state, by using call back
    function instead of async await */
    this.setState({ loading: true });

    auth.setUserRole(email)
      .then((data) => {

        console.log("setUserRole:", data.role);
        this.setState({ role: data.role });
        this.setState({ loading: false });
        console.log("AFTER WILLMOUNT LOAD user:", this.state.role);
        /**************************/
        console.log("APPJS ROLE B4 Set:", this.state.role);
        this.setState({ role: data.role });
        console.log("APPJS STATE ROLE After Set:", this.state.role);
        return data.role;
      });


    /***************************/
  }
  redirectHome() {
    //IMPORTANT: Redirect to the selected organization's page.
    console.log("Called REDIRECT HOME redirect b4", this.state.redirect);
    this.setState({
      redirect: true,
      role: 'visitor',
      loggedOut: true
    });
    console.log("Called REDIRECT HOME redirect after", this.state.redirect);
    history.push({
      pathname: '/',
    });
  }

  async handlePageClick(event) {
    // IMPORTANT: No preventDefault Here:  It will not allow page to transition to insert form, with a dropdownitem
    // event.preventDefault();
    // event.persist();

    this.setState({
      currentPage: event.target.name,
      name: event.target.name
    });

    //01/04/2020:
    if (event.target.name === 'Logout') {
      this.redirectHome();
    }
    // console.log("HANDLEPAGECLICK: " + JSON.stringify(event.target.name));
    // console.log("event.target.name:", event.target.name, " EventTarget:", event.target);
    // const currentPage = this.state.currentPage;
    // if(event.target.name === 'Login'){
    //   console.log("currentpage:", "*"+currentPage+"*");
    // }
    // else if (event.target.name === "Products") {
      //  console.log("currentpage:", "*"+currentPage+"*");
      // }
      // else if (event.target.name === "") {
      //  console.log("currentpage:", "*"+currentPage+"*");
      // else
      //  console.log("currentpage:", "*"+currentPage+"*");
      // }
  }   

  componentDidUpdate() {
    console.log("APPJS JUST UPDATED!");
  }
  render() {
    if (this.state.loading === true) {
      // console.log('loading...');
      return (<UploadSpinner />);
    }
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
            redirectHome={this.redirectHome}
            getRole={this.getRole}
            setRole={this.setRole}
            loggedOut={this.state.loggedOut}
            redirect={this.state.redirect} />

          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                <HomeContainer {...props}
                />
              }
            />
            <Route exact path="/user/registration" component={RegistrationContainer} />
            <Route
              exact
              path="/user/login"
              render={(props) => <LoginContainer
                {...props}
                getRole={this.getRole}
              />}
            />
            <Route exact path="/products/product/update/:product_id" component={ProductUpdateContainer} />
            <Route exact path="/product/insert" component={ProductInsertContainer} />
            <Route exact path="/products/product/:product_id" component={ProductViewContainer} />
            <Route
              exact
              path="/products/"
              render={(props) => <ProductsListContainer {...props}
                role={this.state.role}
                loggedOut={this.state.loggedOut} />}
            />
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  } // render
}

export default App;
