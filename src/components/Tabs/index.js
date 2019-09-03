import React, {useState} from 'react';
import './style.css';

function Tabs({childrenObject, initialSelected}) {
    const keys = Object.keys(childrenObject);
    const [selectedTab, setTab] = useState(initialSelected || keys[0]);

    return <div className="tabs">
        <ul className="tabs__header">
            {keys.map(key => <li
                className={`tabs__header__item ${selectedTab === key ? 'tabs__header__item--active' : ''}`}
                key={`tabsHeader-${key}`}
                onClick={() => setTab(key)}>
                {key}
            </li>)}
        </ul>
        {childrenObject[selectedTab]}
    </div>

}

export default Tabs