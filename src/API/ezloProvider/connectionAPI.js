import md5 from 'md5';
import WS from '@/API/websocket';
import envConfig from './envConfig';

const login = (email, pass, locale, uiType) => WS.send('loginUser', {
  email,
  hash: md5(email + pass),
  locale,
  uiType,
});

const registerHub = async (serial) => {
  WS.abort();
  await WS.send('unregister');
  await WS.send('register', { serial });
};

const connect = async () => {
  const params = {
    url: envConfig.url,
    reconnectTimeout: envConfig.reconnectTimeout,
    reconnectCount: envConfig.reconnectCount,
  };

  const {
    account: {
      email, password, locale, uiType,
    },
  } = envConfig;

  const r = await WS.start(params);
  await login(email, password, locale, uiType);
  return r;
};

const connectionAPI = {
  connect,
  registerHub,
};

export default connectionAPI;
