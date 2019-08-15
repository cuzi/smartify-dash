import Login from '../routes/login';
import Signup from '../routes/signup';
import UserSites from '../routes/userSites';

import {LoggedinLayout, RestrictedLayout} from '../components/layout';

const routes = {
  login: {Component: Login, Layout: RestrictedLayout},
  signup: {Component: Signup, Layout: RestrictedLayout},
  userSites: {Component: UserSites, Layout: LoggedinLayout},
};

export default routes;