import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function login(loginRequest) {
    return request({
        url: 'api/manager/signin',
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: 'api/manager/signup',
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    console.log(username);
    return request({
        url: "api/manager/checkManagerCodeAvailability?managerCode=" + username,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: 'api/manager/me',
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: "/api/manager/get?managerCode=" + username,
        method: 'GET'
    });
}

export function getManagerDrugstores(username) {
    console.log('In server: ' + username);
    return request({
        url: "/api/drugstore/manager?managerCode=" + username,
        method: 'GET'
    });
}
