import { useContext } from 'react';
import { SmartifyContext } from "../provider";
import { changeRoute as _changeRoute, setUser as _setUser } from "../actions/route";

const useRouter = () => {
    const [state, dispatch] = useContext(SmartifyContext);
    const {route: currentRoute, isReady, user} = state;

    function changeRoute(location) {
       dispatch(_changeRoute(location))
    }
    function setUser(userData) {
       dispatch(_setUser(userData))
    }

    return {
        changeRoute,
        user,
        setUser,
        isReady,
        currentRoute,
    }
};

export default useRouter;