import React, {useState, useEffect, useCallback}  from  'react';
import useDomains from "../../hooks/domains";
import {httpGetDomains, httpAddDomain} from "../../http";
import SelectedDomain from "../SelectedDomain";
import SiteItem from "../../components/SiteItem";
import AddDomainModal from './addDomainModal';
import './style.css';

function PartnersDash() {
    const {domains, selectedDomain, setDomains, setSelectedDomain} = useDomains();
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
        setFilteredSites(search.length ? domains.filter(({name, description}) => !!~name.indexOf(search) || !!~description.indexOf(search)) : domains);
    }, [search, domains]);

    useEffect(() => {
        httpGetDomains({cb: function(data) {
                setDomains(data.map(({domainTitle: description, favicon: icon, domainURL: name, hits, domainID, status}, i) => ({
                    icon, name, status, description,
                    id: domainID || `customDomainId-${i}`,
                    hits: hits.map(({title: name, lastVisitTime: visitTime, url, id, userID}, j) => ({userID, name, visitTime, url, id: id || `domainUrl${j}-${i}`}))
                })));
            }});
    }, []);

    if (domains) {
        return (~selectedDomain ? <SelectedDomain /> : <div className="partners-dash">
            <AddDomainModal isOpen={isAddModalOpen} closeFn={() => setAddModalMode(false)} addDomainFn={addDomain} />
            <h1>Welcome home! <input placeholder="Search" value={search} onChange={({target}) => setSearch(target.value)} required/></h1>
            {domains.length ? <button onClick={openAddModal}>Add domain</button> : null}
            <div className="partners-dash__list">
                {(filteredDomains || domains).length ? (filteredDomains || domains).map(site => SiteItem({ ...site, viewMoreAction: setSelectedDomain})) : search.length ?
                    'No domains found' :
                    <div>You have no domains, please add your first domain <button onClick={openAddModal}>Add domain</button></div>}
            </div>
        </div> )}
    return <>Loading...</>;
}

export default PartnersDash;