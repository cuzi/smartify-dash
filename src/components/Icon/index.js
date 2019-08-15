import React from 'react';
import './style.css';

function Icon ({icon, text = 'Smart'}) {
    return icon ? <img src={icon} alt={text} className="icon" /> : <span className="icon icon--fallback" title={text}>{text[0]}</span>
}

export default Icon;