import React, {useState} from 'react';
import './style.css';
import Icon from "../../components/Icon";
import useDomains from "../../hooks/domains";
import {groupBy} from "../../helpers/arrayHelper";
import SelectedUrl from "./SelectedUrl";
import DomainUrlSection from "./DomainUrlsSection";
import DomainTile from "./DomainTile";
import DomainHistorySection from "./DomainHistorySection";
import DomainChartSection from "./DomainChartSection";
import Tabs from "../../components/Tabs";

const expComputeCurrUrl = (currSite, selectedUrl) => {
    if (selectedUrl) {
        const arr = currSite.hits.filter(url => url.url === selectedUrl);

        return {
            icon: currSite.icon,
            name: arr[0].name,
            url: arr[0].url,
            hits: arr,
        }
    }
    return null;
};

function SelectedDomain() {
    const {domains, selectedDomain, setSelectedDomain} = useDomains();
    const [selectedUrl, setURL] = useState(null);
    const currSite = domains.filter(({id}) => id === selectedDomain)[0];
    const usersArr = groupBy(currSite.hits, 'userID');
    const urlsArr = groupBy(currSite.hits, 'url');
    const selectedUrlData = expComputeCurrUrl(currSite, selectedUrl);

    if (currSite) {
        return !selectedUrlData ? <div className="selected-domain">
                <h1 className="selected-domain__header">
                    <a href="#" onClick={() => setSelectedDomain(-1)}>⬅ Back</a>
                    <Icon icon={currSite.icon} text={currSite.name}/> {currSite ? currSite.name : null}
                </h1>
                <Tabs childrenObject={{
                    dashboard: <>
                    <div className="selected-domain__tiles">
                        <DomainTile title={currSite.hits.length} info="Total page views"/>
                        <DomainTile title={usersArr.length} info="Unique users"/>
                        <DomainTile title={urlsArr.length} info="Visited pages"/>
                        <DomainTile title={usersArr.filter(({count}) => count > 4).length} info="Returning users"/>
                    </div>
                    <DomainChartSection currSite={currSite} urlsArr={urlsArr} />
                </>,
                trafic:  <>
                <DomainHistorySection currSite={currSite} />
                <DomainUrlSection data={urlsArr} selectRow={setURL}/>
            </>,
                    code: <div className="selected-domain__code">
                        <h2>Just Copy ...</h2>

                        Here's your unique Code snippet. Click this code and copy it right to your clipboard.
                        <br/>
                        <pre>
                            {`(function(d, script) {
    script = d.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function(){
        smartify.init('${selectedDomain}');
    };
    script.src = 'https://the-internet.ninja/smartifyJs/smartify.js';
    d.getElementsByTagName('head')[0].appendChild(script);
}(document));`}
                        </pre>
                        Then just paste it in a script Tag in any page that you want to use Smartify SmartNav
                    </div>
                }}/>

            </div> :
            <SelectedUrl {...selectedUrlData} backFn={() => setURL(null)}/>
    }
    return <div>loading...</div>
}

export default SelectedDomain;