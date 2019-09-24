const moment = require ('moment');

exports.set = (name, value) => {
    localStorage.setItem(name, value);
};

exports.get = (name) => {
    let dataStore_value = localStorage.getItem(name);
    let returnValue = dataStore_value? dataStore_value: '';
    return returnValue;
};

exports.hasTimeExpired = ( () => {
    let currentTime = moment();
    let dataStore_expiration = this.get('expiration');

    let expirationTime = dataStore_expiration?dataStore_expiration:currentTime;

    let sessionStartTime = moment(expirationTime);
    let timeDiff = sessionStartTime.diff(currentTime, 'minutes');

    console.log('currentTime:', currentTime, 'sessionStart:', sessionStartTime, 'timeDiff:', timeDiff);

    let returnValue = timeDiff <= 10? true: false;
    return returnValue;
});