import React from 'react';
import logo from '../../assets/logo.png';
import './restrictedLayout.css';

function RestrictedLayout(props) {
    return <div className="restricted-layout">
        <header className="restricted-layout__header"><img src={logo} alt="smartify" /></header>
        <div className="restricted-layout__content">
            {props.children}
        </div>
    </div>
}
export default RestrictedLayout;