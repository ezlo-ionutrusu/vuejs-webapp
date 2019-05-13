import WS from '@/API/websocket';
import envConfig from './envConfig';

const registerHub = async (pkDevice, account) => {
  const { identity, identiySign } = account;
  await WS.send('loginUserMios', {
    MMSAuth: identity,
    MMSAuthSig: identiySign,
    PK_Device: pkDevice,
  });
};

const connect = async () => {
  const params = {
    url: envConfig.url,
    reconnectTimeout: envConfig.reconnectTimeout,
    reconnectCount: envConfig.reconnectCount,
  };

  const r = await WS.start(params);
  return r;
};

const connectionAPI = {
  connect,
  registerHub,
};

export default connectionAPI;
