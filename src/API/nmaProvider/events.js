import WS from '@/API/websocket';

const events = {
  subscribe: (event, handler) => {
    WS.subscribe(event, handler);
  },
  unsubscribe: (event, handler) => {
    WS.unsubscribe(event, handler);
  },
};

export default events;
