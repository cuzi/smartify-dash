import React from 'react';

function ItemUrl({name, url, id}) {
    return <a
        href={url}
        target="_blank"
        key={`mainUserSitesUrl${id}`}
        rel="noopener noreferrer"
    >
        {name}
    </a>
}

export default ItemUrl;