import React, {useState, useEffect} from 'react';
import useSites from '../../hooks/sites';
import SiteItem from "../../components/SiteItem";
import SelectedSite from "../selectedSite";
import './style.css';
import {httpGetSites} from "../../http";

function UserSites() {
    const {sites, selectedSite, setSites, setSelectedSite} = useSites();
    const [search, setSearch] = useState('');
    const [filteredSites, setFilteredSites] = useState([]);

    useEffect(() => {
        setFilteredSites(search.length ? sites.filter(({name}) => !!~name.indexOf(search)) : sites);
    }, [search, sites]);

    useEffect(() => {
        httpGetSites({cb: function(data) {
            setSites(data.map(({webDomain: domain, favicon: icon, webTitle: name, urls, id}, i) => ({
                domain, icon, name,
                id: id || `customSiteId-${i}`,
                urls: urls.map(({urlTitle: name, lastVisitTime: visitTime, url, id}, j) => ({name, visitTime, url, id: id || `url${j}-${i}`}))
            })));
        }});
    }, []);

    if (sites) {

        return (~selectedSite ? <SelectedSite /> : <div className="user-sites">
            <h1>Welcome home! <input placeholder="Search" value={search} onChange={({target}) => setSearch(target.value)} required/></h1>
            <div className="user-sites__list">
            {(filteredSites || sites).length ? (filteredSites || sites).map(site => SiteItem({viewMoreAction: setSelectedSite, ...site})) : search.length ? 'No sites found' : 'You have no sites found, if you don\'t have the extension download it'}
            </div>
        </div> )}
    return <>Loading...</>;

}

export default UserSites;