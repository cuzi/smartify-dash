import { useContext/*, useEffect */} from 'react';
import { SmartifyContext } from "../provider";
import { selectSite, setSitesAction, removeSiteUrl as _removeSiteUrl , removeSite as _removeSite } from "../actions/route";
import {httpRemove} from "../http";

const removeSiteHttp = (url, site, deleteAll) => httpRemove({site, url, deleteAll});
const getSiteById = (sites, id) => sites.filter(s => s.id === id)[0];

const useSites = () => {
    const [state, dispatch] = useContext(SmartifyContext);
    const {sites, selectedSite} = state;

    function setSelectedSite(value) {
        dispatch(selectSite(value));
    }
    function removeSiteUrl(value) {
        dispatch(_removeSiteUrl(value));
        const {site, url} = value;
        const _url = getSiteById(sites, site).urls.filter(u => u.url === url)[0];
        removeSiteHttp({site: _url.url, url: _url.id})
    }
    function removeSite(value) {
        dispatch(_removeSite(value));
        const {site} = value;
        const url = getSiteById(sites, site).urls[0];
        removeSiteHttp({site: url.url, url: url.id, deleteAll: true})
    }
    function setSites(value) {
        dispatch(setSitesAction(value));
    }

    return {
        setSelectedSite,
        setSites,
        removeSiteUrl,
        removeSite,
        sites,
        selectedSite
    }
};

export default useSites;