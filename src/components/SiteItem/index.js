import React, {useMemo} from 'react';
import Icon from '../Icon';
import ItemUrl from './ItemUrl';
import './style.css';
import useSites from "../../hooks/sites";

const groupBy = (items, key) => {
    const groupedObj = items.reduce(
        (result, item) => ({
            ...result,
            [item[key]]: {
                ...(result[item[key]] || {}),
                ...item,
                count: (result[item[key]] ? result[item[key]].count : 0) + 1,
            },
        }),
        {},
    );
    return Object.keys(groupedObj).map(_key => groupedObj[_key]);
};

const computeUrls = (urls) => {
    return groupBy(urls, 'url')
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
};

function SiteItem ({icon, urls, name, id}) {
    const {setSelectedSite} = useSites();
    const groupedUrls = computeUrls(urls);

    return <div className="site-item" key={`site-${id}`}>
        <Icon icon={icon} text={name} />
        <h3>{name}</h3>
        {groupedUrls.map(ItemUrl)}
        <span onClick={() => setSelectedSite(id)} className="site-item__view-more">View more »</span>
    </div>
}

export default SiteItem;