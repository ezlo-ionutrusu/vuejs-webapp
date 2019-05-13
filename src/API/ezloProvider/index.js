import connectionAPI from './connectionAPI';
import accountAPI from './accountAPI';
import hubsAPI from './hubsAPI';
import redirectsAPI from './redirectsAPI';

const provider = {
  auth: {
    ...connectionAPI,
  },
  account: {
    ...accountAPI,
  },
  hubs: {
    ...hubsAPI,
  },
  redirects: {
    ...redirectsAPI,
  },
};

export default provider;
