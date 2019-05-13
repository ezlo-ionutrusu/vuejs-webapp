import dashboardAPI from './dashboardAPI';
import devicesAPI from './devicesAPI';
import itemsAPI from './itemsAPI';
import roomsAPI from './roomsAPI';
import scenesAPI from './scenesAPI';
import events from './events';

const provider = {
  dashboard: {
    ...dashboardAPI,
  },
  devices: {
    ...devicesAPI,
  },
  items: {
    ...itemsAPI,
  },
  rooms: {
    ...roomsAPI,
  },
  scenes: {
    ...scenesAPI,
  },
  events: {
    ...events,
  },
};

export default provider;
