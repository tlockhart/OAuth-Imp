const moment = require ('moment');

exports.set = (name, value) => {
    localStorage.setItem(name, value);
};

exports.get = (name) => {
    let dataStore_value = localStorage.getItem(name);
    console.log(name, ':', dataStore_value);
    let returnValue = dataStore_value? dataStore_value: '';
    return returnValue;
};

exports.hasTimeExpired = ( () => {
    let currentTime = moment();
    let data = JSON.parse(this.get('data'));
    let { expiration } = data;
    console.log("expiration", expiration);
    let dataStore_expiration = expiration;

    let expirationTime = dataStore_expiration?dataStore_expiration:currentTime;
    let sessionExpirationTime = moment(expirationTime);

    let sessionExpirationHour = moment(sessionExpirationTime).format('HH');
    let currentTimeHour = moment(currentTime).format('HH');
    console.log("sessionExpirationHour: ", sessionExpirationHour, sessionExpirationHour == '23', 'currentTimeHour', currentTimeHour);
    let timeDiff = sessionExpirationTime.diff(currentTime, 'minutes');
    console.log("currentTime.isAfter(sessionExpirationTime):", currentTime.isAfter(sessionExpirationTime));
    console.log("sessionExpirationTime.isAfter(currentTime):", sessionExpirationTime.isAfter(currentTime));

    // When expiration time is 23:26 (11), but the currenttime is 23:26, moment thinks its a new day,
    // so substract 1440 mins from the timeDiff, to Normalize it
    if(sessionExpirationTime.isAfter(currentTime) && sessionExpirationHour == '23' && currentTimeHour != '23') {
        timeDiff = timeDiff - 1440;
    }
    else if(sessionExpirationTime.isAfter(currentTime) && sessionExpirationHour == '23' && currentTimeHour == '23') {
        timeDiff = timeDiff - 1440;
    }
    // regular time,  when currenttime passing sessionExpirationTime, take the normal difference
    // If access_token is expired, user will have to relogin.
    else if (currentTime.isAfter(sessionExpirationTime)) {
        console.log("Session Expired: currentTime has passed sessionExpirationTime");
        timeDiff = timeDiff;
    }

    console.log('currentTime:', currentTime, 'sessionExpiration:', sessionExpirationTime, 'timeDiff:', timeDiff);

    let returnValue = timeDiff <= 10? true: false;
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

    this.set('data', JSON.stringify(data));

    return data;
});

exports.getLocalStorage = (() => {
    let data = JSON.parse(this.get('data'));
    let { access_token, refresh_token, expiration, email } = data;
    // console.log("ACCESS TOKEN From Data:", data );
    console.log("access_token", data.access_token);

    let returnData = {
        access_token,
        refresh_token,
        expiration,
        email
    };

    return returnData;
});

exports.resetLocalStorage = () => {
    let access_token = '';
    let refresh_token = '';
    let expiration = '';
    let email = '';

    let returnData = {
        access_token,
        refresh_token,
        expiration,
        email
    };

    this.set('data', returnData);
};