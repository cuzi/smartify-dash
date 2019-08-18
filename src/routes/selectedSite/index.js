import React, {useState, useEffect} from 'react';
import useSites from '../../hooks/sites';
import './style.css';
import Icon from "../../components/Icon";
import {getBarList} from "../../http";

function SelectedSite() {
    const {sites, selectedSite, setSelectedSite, removeSite, removeSiteUrl} = useSites();
    const [barLinks, setLinks] = useState(null);
    const currSite = sites.filter(({id}) => id === selectedSite)[0];

    useEffect(() => {
        if (currSite && setLinks) {
            getBarList({site: currSite.urls[0].url, cb: data => {
                setLinks(data.slice(0,5));
            }});
        }
    }, [setLinks]);

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
                {barLinks ? barLinks.length ?  <div className="toolbar">
                    {barLinks.map(({url, title}) => <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={url}
                        title={title}>
                        {title}
                        </a>)
                        .reduce((prev, curr) => [prev, ' | ', curr])}
                </div> :
                    <h4>SmartNav didn't set the right navigation for you, keep using the extension and it will update soon!</h4> : <h4>Loading...</h4>
                }
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