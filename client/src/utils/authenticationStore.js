const moment = require('moment');

/**********************
 * Contains methods for storing credentials in localStorage and packaging for setting as state variables
 */
exports.set = (name, value) => {
    localStorage.setItem(name, value);
};

exports.get = (name) => {
    let authenticationStore_value = localStorage.getItem(name);
    console.log(name, ':', authenticationStore_value);
    let returnValue = authenticationStore_value ? authenticationStore_value : '';
    return returnValue;
};

exports.hasTimeExpired = (() => {
    let data = localStorage.getItem('data');
    // set hasTimeExpired to true to get the refreshToken method to execute.  Request will fail with no tokens and return.  Otherwise
    let returnValue = false;

    if (data !== null && typeof data !== 'undefined') {
        // let currentTime = moment();
        let currentTime = moment.utc();
        let data = JSON.parse(this.get('data'));
        let { expiration } = data;
        console.log("expiration", expiration);
        let authenticationStore_expiration = expiration;

        // If expiration has been set in locaStorage, use it, else use current time
        let expirationTime = authenticationStore_expiration ? authenticationStore_expiration : currentTime;
        // let sessionExpirationTime = moment(expirationTime);
        // let sessionExpirationTime = moment.utc(expirationTime);
        let sessionExpirationTime = expirationTime


        // let sessionExpirationHour = moment(sessionExpirationTime).format('HH');
        // let sessionExpirationHour = moment.utc(sessionExpirationTime).format('HH');
        // let sessionExpirationHour = moment.utc(sessionExpirationTime)
        let sessionExpirationHour = moment(sessionExpirationTime).format('HH');

        // let currentTimeHour = moment(currentTime).format('HH');
        // let currentTimeHour = moment.utc(currentTime).format('HH');
        // let currentTimeHour = moment.utc(currentTime);
        let currentTimeHour = moment(currentTime).format('HH');
        // let currentMomentTIme = moment(currentTime;

        console.log("sessionExpirationHour: ", sessionExpirationHour, sessionExpirationHour === '23', 'currentTimeHour', currentTimeHour);
        let timeDiff = moment(sessionExpirationTime).diff(moment(currentTime), 'minutes');

        console.log("currentTime.isAfter(sessionExpirationTime):", currentTime.isAfter(sessionExpirationTime));
        console.log("sessionExpirationTime.isAfter(currentTime):", moment(sessionExpirationTime).isAfter(moment(currentTime)));

        // Handles current time 7pm (23), expiration 8pm (00)
        if (moment(sessionExpirationTime).isAfter(moment(currentTime)) && currentTimeHour === '23') {
            timeDiff = timeDiff - 1440;
        }
        // When expiration time is 23:26 (11), but the currenttime is 23:26, moment thinks its a new day,
        // so substract 1440 mins from the timeDiff, to Normalize it
        // if (moment(sessionExpirationTime).isAfter(moment(currentTime)) && sessionExpirationHour === '23') {
        //     timeDiff = timeDiff - 1440;
        // }

        // regular time,  when currenttime passing sessionExpirationTime, take the normal difference
        // If access_token is expired, user will have to relogin.
        // else if (currentTime.isAfter(sessionExpirationTime)) {
        if (moment(currentTime).isAfter(moment(sessionExpirationTime))) {
            console.log("Session Expired: currentTime has passed sessionExpirationTime");
            // timeDiff = timeDiff;
        }

        console.log('currentTime:', currentTime, 'sessionExpiration:', sessionExpirationTime);
        console.log('TIMEDIFF:', timeDiff);

        returnValue = timeDiff <= 10 ? true : false;
        // return returnValue;
    } // if
    return returnValue;
});

exports.setLocalStorage = ((access_token, refresh_token, expiration, email, message) => {

    let data = {
        access_token,
        refresh_token,
        expiration,
        email,
        message
    };
    console.log("created data", data.message);
    this.set('data', JSON.stringify(data));
    console.log("set LocalStorage data", data.message);
    return data;
});

exports.getLocalStorage = (() => {
    let returnData;

    let data = localStorage.getItem('data');

    if (data !== null && typeof data !== 'undefined') {
        let data = JSON.parse(this.get('data'));
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
        }
    }
    return returnData;
});

exports.resetLocalStorage = () => {
    console.log("LOCAL STORAGE CLEARED");
    localStorage.clear();
};