import React from 'react';
import useSites from '../../hooks/sites';
import './style.css';
import Icon from "../../components/Icon";

function SelectedSite() {
    const {sites, selectedSite, setSelectedSite, removeSite, removeSiteUrl} = useSites();
    const currSite = sites.filter(({id}) => id === selectedSite)[0];
    if (currSite) {

        return <div className="selected-site">
            <h1 className="selected-site__header">
                <a href="#" onClick={() => setSelectedSite(-1)}>⬅ Back</a>
                <Icon icon={currSite.icon} text={currSite.name}/> {currSite ? currSite.name : null}
                <span className="selected-site__header__remove" onClick={() => {
                    setSelectedSite(-1);
                    removeSite({site: selectedSite});
                }}>Remove all data</span>
            </h1>
            <div className="selected-site__toolbar">
                <h2>SmartNav preview</h2>
                <div className="toolbar">
                    tesfd | sdfdsf | sdfsdf
                </div>
            </div>
            <div className="selected-site__history">
                <h2>History</h2>
                <div className="history-list">
                    <div className="history-list__row">
                        <span>URL</span>
                        <span>Date</span>
                        <span>#</span>
                    </div>
                    {currSite.urls.map(({url, name, visitTime, id}) => {
                        return <div className="history-list__row" key={`${name}-${visitTime}`}>
                            <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
                            <span>{visitTime}</span>
                            <span onClick={() => removeSiteUrl({site: selectedSite, url: id})}>×</span>
                        </div>
                    })}
                </div>
            </div>

        </div>
    }
    return <div>loading...</div>
}

export default SelectedSite;