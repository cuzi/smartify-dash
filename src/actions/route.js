const CHANGE_ROUTE = '@@SMARTIFY/CHANGE_ROUTE';
const SELECT_SITE = '@@SMARTIFY/SELECT_SITE';
const SET_SITES = '@@SMARTIFY/SET_SITES';
const SELECT_DOMAIN = '@@SMARTIFY/SELECT_DOMAIN';
const SET_DOMAINS = '@@SMARTIFY/SET_DOMAINS';
const SET_USER = '@@SMARTIFY/SET_USER';
const REMOVE_SITE_URL = '@@SMARTIFY/REMOVE_SITE_URL';
const REMOVE_SITE = '@@SMARTIFY/REMOVE_SITE';

const changeRoute = location => ({
    type: CHANGE_ROUTE,
    payload: location,
});
const setUser = user => ({
    type: SET_USER,
    payload: user ? {name: 'Anonymous', ...user} : null,
});

const selectDomainAction = site => ({
    type: SELECT_DOMAIN,
    payload: site,
});
const setDomainsAction = sites => ({
    type: SET_DOMAINS,
    payload: sites,
});
const selectSite = site => ({
    type: SELECT_SITE,
    payload: site,
});
const setSitesAction = sites => ({
    type: SET_SITES,
    payload: sites,
});
const removeSiteUrl = data => ({
    type: REMOVE_SITE_URL,
    payload: data,
});
const removeSite = data => ({
    type: REMOVE_SITE,
    payload: data,
});




export {
    changeRoute, selectSite, setUser, setSitesAction, removeSiteUrl,
    removeSite, setDomainsAction, selectDomainAction,
    CHANGE_ROUTE, SELECT_SITE, SET_USER, SET_SITES, REMOVE_SITE_URL,
    REMOVE_SITE, SET_DOMAINS, SELECT_DOMAIN,
}