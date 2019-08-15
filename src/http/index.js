const apiUrl = 'https://the-internet.ninja/smartify';


const _fetcher = ({url = '', method = 'GET', body, isJson = true}, cb, errorFn) => {
    fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null,
    }).then(cb ? isJson ? (_ => _.json().then(res => {
        if (res.statusCode  && res.statusCode > 300) {
            errorFn && errorFn(res.statusCode);
        }
        else {
            cb(res);
        }
    })) : cb : undefined)
};

export const httpSignup = ({name, password, isComp, cb, errorFn}) => {
    _fetcher({url: `${apiUrl}/signUp`, method: 'POST', body: {
            "userName": name,
            "userPass": password,
            "userType": isComp ? 1 : 0
        }}, cb, errorFn);
};

export const httpLogin = ({name, password, cb, errorFn}) => {
    _fetcher({url: `${apiUrl}/login`, method: 'POST', body: {
            "userName": name,
            "userPass": password,
        }}, cb, errorFn);
};

export const httpLogout = ({cb, errorFn}) => {
    _fetcher({url: `${apiUrl}/logout`, method: 'POST'}, cb, errorFn);
};

export const httpAuth = ({ cb, errorFn}) => {
    _fetcher({url: `${apiUrl}/auth`}, cb, errorFn);
};

export const httpGetSites = ({cb, errorFn}) => {
    _fetcher({url: `${apiUrl}/sites` }, cb, errorFn);
};

export const httpRemove = ({site, url, deleteAll, cb, errorFn}) => {
    _fetcher({
        url: `${apiUrl}/removeSite`,
        method: 'POST',
        body: {
            "id": site,
            url,
            ...deleteAll ? {"recursive": true} : {}
        }

    }, cb, errorFn);
};
