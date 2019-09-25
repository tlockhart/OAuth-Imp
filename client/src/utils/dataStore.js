const moment = require ('moment');

exports.set = (name, value) => {
    localStorage.setItem(name, value);
};

exports.get = (name) => {
    let dataStore_value = localStorage.getItem(name);
    console.log(name, ':', dataStore_value)
    let returnValue = dataStore_value? dataStore_value: '';
    return returnValue;
};

exports.hasTimeExpired = ( () => {
    let currentTime = moment();
    let dataStore_expiration = this.get('expiration');

    let expirationTime = dataStore_expiration?dataStore_expiration:currentTime;

    let sessionExpirationTime = moment(expirationTime);
    let sessionExpirationHour = moment(sessionExpirationTime).format('HH');
    console.log("sessionExpirationHour: ", sessionExpirationHour, sessionExpirationHour == '16');
    let timeDiff = sessionExpirationTime.diff(currentTime, 'minutes');
    

    // normalize timeDiff for 00:00 at midnight, so subtract difference by 24 hours(1440 mins)
    if (currentTime.isAfter(sessionExpirationTime)  && sessionExpirationHour == '00') {
        // sessionExpirationTime = sessionExpirationTime.subtract(1440, 'minutes');
        console.log("Session Expired: currentTime has passed sessionExpirationTime && Hour is 00");
        timeDiff = 1440 - timeDiff;
    }
    // regular time,  when currenttime passing sessionExpirationTime, take the normal difference
    // If access_token is expired, user will have to relogin.
    else if (currentTime.isAfter(sessionExpirationTime)) {
        console.log("Session Expired: currentTime has passed sessionExpirationTime")
        timeDiff = timeDiff;
    }

    console.log('currentTime:', currentTime, 'sessionExpiration:', sessionExpirationTime, 'timeDiff:', timeDiff);

    let returnValue = timeDiff <= 10? true: false;
    return returnValue;
});