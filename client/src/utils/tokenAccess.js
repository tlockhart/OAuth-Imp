exports.storeToken = (token) => {
    localStorage.setItem('access_token', token);
};

exports.retrieveToken = (token_type) => {
    return localStorage.getItem(token_type);
};
