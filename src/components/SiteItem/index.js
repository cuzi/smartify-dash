import React from 'react';
import Icon from '../Icon';
import ItemUrl from './ItemUrl';
import './style.css';
import useSites from "../../hooks/sites";

function SiteItem ({icon, urls, name, id}) {
    const {setSelectedSite} = useSites();

    return <div className="site-item" key={`site-${id}`}>
        <Icon icon={icon} text={name} />
        <h3>{name}</h3>
        {urls.slice(0, 5).map(ItemUrl)}
        <span onClick={() => setSelectedSite(id)} className="site-item__view-more">View more »</span>
    </div>
}

export default SiteItem;