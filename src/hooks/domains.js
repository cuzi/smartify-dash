import { useContext/*, useEffect */} from 'react';
import { SmartifyContext } from "../provider";
import { selectDomainAction, setDomainsAction } from "../actions/route";

const useDomains = () => {
    const [state, dispatch] = useContext(SmartifyContext);
    const {domains, selectedDomain} = state;

    function setSelectedDomain(value) {
        dispatch(selectDomainAction(value));
    }
    function setDomains(value) {
        dispatch(setDomainsAction(value));
    }

    return {
        setSelectedDomain,
        setDomains,
        domains,
        selectedDomain,
    }
};

export default useDomains;