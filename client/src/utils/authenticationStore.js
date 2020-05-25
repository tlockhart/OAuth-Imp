import API from '../utils/API';
// const moment = require('moment');
import moment, {Moment} from 'moment';
// Import Server-Side Utilities:


/**********************
 * Contains methods for storing credentials in localStorage and packaging for setting as state variables
 */
let set = (name, value) => {
    localStorage.setItem(name, value);
};

let get = (name) => {
    let authenticationStore_value = localStorage.getItem(name);
    console.log(name, ':', authenticationStore_value);
    let returnValue = authenticationStore_value ? authenticationStore_value : '';
    return returnValue;
};

let hasTimeExpired = (() => {
    let data = localStorage.getItem('data');
    // set hasTimeExpired to true to get the refreshToken method to execute.  Request will fail with no tokens and return.  Otherwise
    let returnValue = false;

    if (data !== null && typeof data !== 'undefined') {
        let currentTime = moment.utc(moment()).local().format("L LT");
        let data = JSON.parse(get('data'));
        //5/17/2020
        /***********************************/
        let { expiration } = data;
        let sessionExpirationTime  = moment.utc(moment(expiration)).local().format("MM/DD/YYYY LT");


        /************************************/
        console.log("currentTime.isAfter(sessionExpirationTime):", moment(currentTime).isAfter(sessionExpirationTime));

        console.log("sessionExpirationTime.isAfter(currentTime):", moment(sessionExpirationTime).isAfter(moment(currentTime)));


        console.log('currentTime:', currentTime, 'sessionExpiration:', sessionExpirationTime);

        // Get TIme difference in minutes
        let timeDiff = moment(sessionExpirationTime).diff(moment(currentTime), 'minutes');

        console.log('TIMEDIFF:', timeDiff);

        returnValue = timeDiff <= 10 ? true : false;
        // return returnValue;
        // return false;
    } // if
    return returnValue;
});

let setLocalStorage = ((access_token, refresh_token, expiration, email, message) => {

    let data = {
        access_token,
        refresh_token,
        expiration,
        email,
        message
    };
    console.log("created data", data.message);
    set('data', JSON.stringify(data));
    console.log("set LocalStorage data", data.message);
    return data;
});

let getLocalStorage = (() => {
    let returnData;

    let data = localStorage.getItem('data');

    if (data !== null && typeof data !== 'undefined') {
        let data = JSON.parse(get('data'));
        let { access_token, refresh_token, expiration, email } = data;
        // console.log("ACCESS TOKEN From Data:", data );
        console.log("access_token", data.access_token);

        returnData = {
            access_token,
            refresh_token,
            expiration,
            email
        };
    }
    else {
        returnData = {
            access_token: '',
            refresh_token: '',
            expiration: '',
            email: ''
        };
    }
    console.log("AuthenticationStore return Data:", returnData);
    return returnData;
});

let resetLocalStorage = () => {
    console.log("LOCAL STORAGE CLEARED");
    localStorage.clear();
};

let setUserState = async (email) => {
    // set state variables:
    // let stateVariables = await getLocalStorage();

    // this.setState(stateVariables);
    // let user;
    let baseURL = `/user/information/${email}`;
    console.log("authenticationStore.setUserState: Email=*" + email + "*");

    // 01/03/2020: Get User role
    let userRoleObj = await API.getUserInfo(baseURL, email)
        .then(res => {
            console.log("BASE URL=", baseURL);
            console.log("USER RES=", res);
            // set user

            let userObject = {
                role: res.data.role,
                // data: products
            };
            console.log("PLC2USEROBJECT:", userObject);
            return userObject

        })
        .catch(err => {
            console.log("ERROR: Setting ROLE to VISITOR:", err);
            let userObject = {
                role: "visitor",
                // data: products
            };
            return userObject
            // this.setState({ user: userObject });
        });
        return userRoleObj;
}

// get user role from backend
let setUserRole = async (email) => {
    // set state variables:
    // let stateVariables = await getLocalStorage();

    // this.setState(stateVariables);
    // let user;
    let baseURL = `/user/information/${email}`;
    // console.log("authenticationStore.setUserRole: Email=*" + email + "*");

    // 01/03/2020: Get User role
    let userRoleObj = await API.getUserInfo(baseURL, email)
        .then(res => {
            // console.log("BASE URL=", baseURL);
            // console.log("USER RES=", res);
            // set user

            let userRole = {
                role: res.data.role,
            };
            // console.log("PLC2USERROLE:", userRole);
            return userRole;
        })
        .catch(err => {
            console.log("ERROR: Setting ROLE to VISITOR:", err);
            let userRole = {
                role: "visitor",
            };
            return userRole;
        });
        return userRoleObj;
}

// import * as auth from './authenticationStore';

export {set, get, hasTimeExpired, setLocalStorage, getLocalStorage, resetLocalStorage, setUserState, setUserRole};