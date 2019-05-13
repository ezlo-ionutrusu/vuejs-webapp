import WS from '@/API/websocket';

const redirectToLogin = Promise.resolve();

const connectToHub = async ({ serial }) => WS.send('register', { serial });

const redirectsAPI = {
  redirectToLogin,
  connectToHub,
};

export default redirectsAPI;
