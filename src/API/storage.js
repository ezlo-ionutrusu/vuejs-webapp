const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  if (match) return decodeURIComponent(match[2]);
  return null;
};

const setCookie = (name, value) => {
  document.cookie = `${name}=${encodeURIComponent(value)}`;
};

const getToken = () => getCookie('jwt_token');

const getHubSerial = () => getCookie('hub_serial'); // localStorage.getItem('hubSerial');

const setHubSerial = (hubSerial) => {
  // localStorage.setItem('hubSerial', hubSerial);
  setCookie('hub_serial', hubSerial);
};

export default {
  getToken,
  getHubSerial,
  setHubSerial,
};
