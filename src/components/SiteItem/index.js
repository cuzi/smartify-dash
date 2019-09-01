import React, {useMemo} from 'react';
import Icon from '../Icon';
import ItemUrl from './ItemUrl';
import './style.css';
import useSites from "../../hooks/sites";
import {groupBy} from "../../helpers/arrayHelper";



const computeUrls = (urls) => {
    return groupBy(urls, 'url')
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
};

function SiteItem ({icon, urls, name, id, description, viewMoreAction}) {
    const content = description || computeUrls(urls).map(ItemUrl);

    return <div className="site-item" key={`site-${id}`}>
        <Icon icon={icon} text={name} />
        <h3>{name}</h3>
        {content}
        <span onClick={() => viewMoreAction(id)} className="site-item__view-more">View more »</span>
    </div>
}

export default SiteItem;