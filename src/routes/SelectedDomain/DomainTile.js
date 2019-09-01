import React from "react";


function DomainTile({info, title}) {
    return <div className="selected-domain__tiles__item">
        <h2>{title}</h2>
        <small>{info}</small>
    </div>;
}

export default DomainTile;