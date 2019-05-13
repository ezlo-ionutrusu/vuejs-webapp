import accountAPI from './accountAPI';
import connectionAPI from './connectionAPI';
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
