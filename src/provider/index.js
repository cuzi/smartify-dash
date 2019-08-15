import React, { useReducer } from 'react';
import {initialState, smartifyReducer} from "../reducers/reducer";

const SmartifyContext = React.createContext([{}, () => {}]);

const SmartifyProvider = (props) => {
    const [state, dispatch] = useReducer(smartifyReducer, initialState);
    return (
        <SmartifyContext.Provider value={[state, dispatch]}>
            {props.children}
        </SmartifyContext.Provider>
    );
};

export { SmartifyContext, SmartifyProvider };