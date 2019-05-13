import ServerError from '@/API/ServerError';
import envConfig from '@/API/authProvider/envConfig';
import { callApi, callAuthorized } from './authAPI';

const redirectToLogin = async () => {
  const query = { route: envConfig.routes.login };
  const response = await callApi(
    'redirect',
    null,
    {
      method: 'GET',
      redirect: 'follow',
      credentials: 'same-origin',
    },
    null,
    query,
  );
  const { status } = response;
  if (status !== 200) {
    throw new ServerError('ezlo.error.message.redirect', status);
  }
  setTimeout(() => {
    window.location.href = response.url;
  }, 400);
};

const connectToHub = async ({ serial, type }) => {
  const query = {
    device_type: type,
    hub_serial: serial,
  };

  const response = await callAuthorized(
    'connect',
    null,
    {
      method: 'GET',
      redirect: 'follow',
      credentials: 'same-origin',
    },
    null,
    query,
  );

  const { status } = response;
  if (status !== 200) {
    throw new ServerError('ezlo.error.message.connect.hub', status);
  }
  setTimeout(() => {
    window.location.href = response.url;
  }, 400);
};

const redirectsAPI = {
  redirectToLogin,
  connectToHub,
};

export default redirectsAPI;
