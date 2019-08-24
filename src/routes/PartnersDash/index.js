import React, {useState, useEffect, useCallback}  from  'react';
import useDomains from "../../hooks/domains";
import {httpGetDomains, httpAddDomain} from "../../http";
import SelectedSite from "../selectedSite";
import SiteItem from "../../components/SiteItem";
import AddDomainModal from './addDomainModal';
import './style.css';

function PartnersDash() {
    const {domains, selectedDomain, setDomains} = useDomains();
    const [search, setSearch] = useState('');
    const [isAddModalOpen, setAddModalMode] = useState(false);
    const [filteredDomains, setFilteredSites] = useState([]);
    const openAddModal = useCallback(
        () => {
            setAddModalMode(true);
        },
        [setAddModalMode],
    );
    const addDomain = useCallback(
        (domain) => {
            httpAddDomain({domain, cb: console.log});
        },
        [],
    );


    useEffect(() => {
        setFilteredSites(search.length ? domains.filter(({name}) => !!~name.indexOf(search)) : domains);
    }, [search, domains]);

    useEffect(() => {
        // FIXME: response transformation is wrong!
        httpGetDomains({cb: function(data) {
                setDomains(data.map(({webDomain: domain, favicon: icon, webTitle: name, urls, id}, i) => ({
                    domain, icon, name,
                    id: id || `customDomainId-${i}`,
                    urls: urls.map(({urlTitle: name, lastVisitTime: visitTime, url, id}, j) => ({name, visitTime, url, id: id || `domainUrl${j}-${i}`}))
                })));
            }});
    }, []);

    if (domains) {
        return (~selectedDomain ? <SelectedSite /> : <div className="partners-dash">
            <AddDomainModal isOpen={isAddModalOpen} closeFn={() => setAddModalMode(false)} addDomainFn={addDomain} />
            <h1>Welcome home! <input placeholder="Search" value={search} onChange={({target}) => setSearch(target.value)} required/></h1>
            <div className="partners-dash__list">
                {domains.length ? <h2 onClick={openAddModal}>Add domain</h2> : null}
                {(filteredDomains || domains).length ? (filteredDomains || domains).map(SiteItem) : search.length ?
                    'No domains found' :
                    <div>You have no domains, please add your first domain <button onClick={openAddModal}>Add domain</button></div>}
            </div>
        </div> )}
    return <>Loading...</>;
}

export default PartnersDash;