import API from '../utils/API';
export let setUserRole = async (email) => {
    // set state variables:
    // let stateVariables = await getLocalStorage();

    // this.setState(stateVariables);
    // let user;
    let baseURL = `/user/information/${email}`;
    console.log("Email=*" + email + "*");

    // 01/03/2020: Get User role
    let userRoleObj = await API.getUserInfo(baseURL, email)
        .then(res => {
            console.log("BASE URL=", baseURL);
            console.log("USER RES=", res);
            // set user

            let userRole = {
                role: res.data.role,
            };
            console.log("PLC2USERROLE:", userRole);
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