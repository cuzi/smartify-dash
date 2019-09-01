import React from "react";


function DomainHistorySection({currSite}) {
    return <div className="selected-domain__history">
        <h2>Latest visits</h2>
        <div className="history-list">
            <div className="history-list__row">
                <span>URL</span>
                <span>Date</span>
            </div>
            {currSite.hits.slice(0, 10).map(({url, name, visitTime, id}) => {
                return <div className="history-list__row" key={`${url}-${id}`}>
                    <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
                    <span>{visitTime}</span>
                </div>
            })}
        </div>
    </div>;
}


export default DomainHistorySection;