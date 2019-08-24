import {
    CHANGE_ROUTE,
    SELECT_SITE,
    SET_USER,
    SET_SITES,
    REMOVE_SITE_URL,
    REMOVE_SITE,
    SELECT_DOMAIN, SET_DOMAINS
} from "../actions/route";


const initialState = {
    isReady: true,
    user: null,
    route: 'login',
    selectedSite: -1,
    selectedDomain: -1,
    domains: null,
    sites: null,
};

const smartifyReducer  = (state, action) => {
    const {sites} = state;

    switch (action.type) {
        case CHANGE_ROUTE:
            return {...state, route: action.payload || state.route };

        case SELECT_DOMAIN:
            return {...state, selectedDomain: action.payload || state.selectedDomain };

        case SET_DOMAINS:
            return {...state, domains: action.payload || state.domains };

        case SELECT_SITE:
            return {...state, selectedSite: action.payload || state.selectedSite };

        case SET_SITES:
            return {...state, sites: action.payload || state.sites };

        case SET_USER:
            return {...state, user: action.payload };

        case REMOVE_SITE_URL:
            const {url, site} = action.payload ;
            return {...state, sites: sites.map((_site) => _site.id === site ? {..._site, urls: _site.urls
                        .filter(({id}) => id !== url)} : _site) };

        case REMOVE_SITE:
            const {site: _site} = action.payload ;
            return {...state, sites: sites.filter(({id}) => id !== _site ) };

        default:
            return state;
    }

};

export {initialState, smartifyReducer};