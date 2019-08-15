import React from 'react';
import icon from "../../assets/icon128.png";
import useRouter from "../../router/hooks";
import Icon from '../Icon';
import './loggedinLayout.css'
import {httpLogout} from "../../http";

function LoggedinLayout(props) {
    const { user, setUser } = useRouter();

    return (user ? (<div className="logged-in-layout">
        <header className="logged-in-layout__header">
            <img src={icon} alt="smartify" /> Dashboard
            <span className="menu">
                <span className="menu__btn">
                    <Icon text={user.name} /> ▼
                </span>
                <ul className="menu__list">
                    <li onClick={() => {
                        httpLogout({cb: () => setUser(null)});
                    }}>✗ Logout</li>
                </ul>
            </span>
        </header>
        <div className="logged-in-layout__content">
            {props.children}
        </div>
    </div>) : <></>);
}
export default LoggedinLayout;