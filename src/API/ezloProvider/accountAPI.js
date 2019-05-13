import WS from '@/API/websocket';

const getAccount = async () => {
  const response = await WS.send('getUser');
  return response.data.user;
};

const accountAPI = {
  getAccount,
};

export default accountAPI;
