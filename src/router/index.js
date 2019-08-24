import React, {useEffect} from 'react';
import routes from './routes';
import {usePrevious} from '../hooks/helpersHooks';
import useRouter from './hooks';

function Router() {
    const { currentRoute, isReady, user, changeRoute } = useRouter();
    const preUser = usePrevious(user);

    useEffect(() => {
        if (!!preUser !== !!user) {
            changeRoute(user ? (!user.userType ? 'userSites' : 'partnersDash') : 'login');
        }
    }, [user, changeRoute]);

    if (isReady) {
        const {Component, Layout} = routes[currentRoute];

        return <Layout><Component/></Layout>
    }
    return <div>Loading...</div>;

}

export default Router;